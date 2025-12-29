import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { userService } from "@/services";
import { responseUtil } from "@/utils";
import { UserFilter, UserRole } from "@talentry/types";
import { $Enums } from "@/generated/prisma";
import {
  validateUpdateAdmin,
  validateUpdateCompany,
  validateUpdateSeeker,
} from "@talentry/validation";
import { ServiceError } from "@/errors";

type ValidationResult = ReturnType<
  | typeof validateUpdateAdmin
  | typeof validateUpdateSeeker
  | typeof validateUpdateCompany
>;

class UserController {
  private static instance: UserController;

  private constructor() {}

  public static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  private formatValidationErrors(
    errors: { path: (string | number)[]; message: string }[]
  ): string {
    return errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
  }

  private getValidationSchema(role?: string) {
    if (!role) {
      throw new ServiceError(StatusCodes.BAD_REQUEST, {
        message: "Role is required for validation",
      });
    }

    const normalizedRole = role.toUpperCase();

    switch (normalizedRole) {
      case $Enums.UserRole.ADMIN:
        return validateUpdateAdmin;
      case $Enums.UserRole.SEEKER:
        return validateUpdateSeeker;
      case $Enums.UserRole.COMPANY:
        return validateUpdateCompany;
      default:
        throw new ServiceError(StatusCodes.BAD_REQUEST, {
          message: `Invalid role: ${role}`,
        });
    }
  }

  private checkSeekerAccess(
    currentUserId: string,
    currentUserRole: string,
    targetUserId: string,
    operation: "view" | "update" | "delete"
  ): void {
    if (
      currentUserRole === $Enums.UserRole.SEEKER &&
      currentUserId !== targetUserId
    ) {
      throw new ServiceError(StatusCodes.FORBIDDEN, {
        message: `Seekers can only ${operation} their own data`,
      });
    }
  }

  private checkSeekerUpdatePermission(
    currentUserId: string,
    currentUserRole: string,
    targetUserId: string,
    updateData: any
  ): void {
    this.checkSeekerAccess(
      currentUserId,
      currentUserRole,
      targetUserId,
      "update"
    );

    if (
      currentUserRole === $Enums.UserRole.SEEKER &&
      updateData.role &&
      updateData.role !== $Enums.UserRole.SEEKER
    ) {
      throw new ServiceError(StatusCodes.FORBIDDEN, {
        message: "Seekers cannot change their role",
      });
    }

    if (currentUserRole === $Enums.UserRole.SEEKER) {
      const restrictedFields = ["emailVerified", "createdAt", "updatedAt"];
      const attemptedRestricted = Object.keys(updateData).filter((field) =>
        restrictedFields.includes(field)
      );

      if (attemptedRestricted.length > 0) {
        throw new ServiceError(StatusCodes.FORBIDDEN, {
          message: `Seekers cannot modify restricted fields: ${attemptedRestricted.join(
            ", "
          )}`,
        });
      }
    }
  }

  public getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const currentUserId = req.app.locals.userId;
      const currentUserRole = req.app.locals.role;
      const targetUserId = req.params.id || req.app.locals.userId;

      if (!targetUserId) {
        return responseUtil.sendError(res, {
          message: "User ID is required",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      this.checkSeekerAccess(
        currentUserId,
        currentUserRole,
        targetUserId,
        "view"
      );

      const payload = await userService.getUser(targetUserId);

      if (!payload) {
        return responseUtil.sendError(res, {
          message: "User not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      responseUtil.sendSuccess(res, payload, String(StatusCodes.OK));
    } catch (error) {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      const message = error.message || "Internal server error";

      responseUtil.sendError(res, {
        message,
        statusCode,
      });
    }
  };

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const currentUserId = req.app.locals.userId;
      const currentUserRole = req.app.locals.user.role;
      console.log("Current User Role:", currentUserRole || req.app.locals);
      if (currentUserRole !== $Enums.UserRole.ADMIN) {
        if (currentUserRole === $Enums.UserRole.SEEKER) {
          req.params.id = currentUserId;
          return this.getUser(req, res);
        }

        return responseUtil.sendError(res, {
          message: "Only admins can list all users",
          statusCode: StatusCodes.FORBIDDEN,
        });
      }

      const filters = req.query as UserFilter;
      const payload = await userService.getUsers(filters);

      responseUtil.sendSuccess(res, payload, String(StatusCodes.OK));
    } catch (error) {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      const message = error.message || "Internal server error";

      responseUtil.sendError(res, {
        message,
        statusCode,
      });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const currentUserId = req.app.locals.userId;
      const currentUserRole = req.app.locals.role;
      const targetUserId = req.params.id || req.app.locals.userId;
      const updateData = req.body;

      if (!targetUserId) {
        return responseUtil.sendError(res, {
          message: "User ID is required",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      this.checkSeekerUpdatePermission(
        currentUserId,
        currentUserRole,
        targetUserId,
        updateData
      );

      const existingUser = await userService.getUser(targetUserId);
      if (!existingUser) {
        return responseUtil.sendError(res, {
          message: "User not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (updateData.role && updateData.role !== existingUser.role) {
        if (currentUserRole !== $Enums.UserRole.ADMIN) {
          return responseUtil.sendError(res, {
            message: "Only admins can change user roles",
            statusCode: StatusCodes.FORBIDDEN,
          });
        }
      }

      const validate = this.getValidationSchema(existingUser.role);
      const validationResult = validate(updateData) as ValidationResult;

      if (!validationResult.success) {
        return responseUtil.sendError(res, {
          message: this.formatValidationErrors(validationResult.error.errors),
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        });
      }

      const payload = await userService.updateUser(targetUserId, updateData);
      responseUtil.sendSuccess(res, payload, String(StatusCodes.OK));
    } catch (error) {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      const message = error.message || "Internal server error";

      responseUtil.sendError(res, {
        message,
        statusCode,
      });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const currentUserId = req.app.locals.userId;
      const currentUserRole = req.app.locals.role || req.app.locals.user.role;
      const targetUserId = req.params.id || currentUserId;
      console.debug(req.app.locals);
      if (!targetUserId) {
        return responseUtil.sendError(res, {
          message: "User ID is required",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      this.checkSeekerAccess(
        currentUserId,
        currentUserRole,
        targetUserId,
        "delete"
      );

      if (targetUserId === currentUserId) {
        console.warn(`User ${currentUserId} is deleting their own account`);
      }

      if (
        currentUserRole === $Enums.UserRole.SEEKER &&
        targetUserId !== currentUserId
      ) {
        return responseUtil.sendError(res, {
          message: "Seekers can only delete their own account",
          statusCode: StatusCodes.FORBIDDEN,
        });
      }

      if (
        currentUserRole !== $Enums.UserRole.ADMIN &&
        targetUserId !== currentUserId
      ) {
        return responseUtil.sendError(res, {
          message: "Only admins can delete other users",
          statusCode: StatusCodes.FORBIDDEN,
        });
      }

      const existingUser = await userService.getUser(targetUserId);
      if (!existingUser) {
        return responseUtil.sendError(res, {
          message: "User not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (
        existingUser.role === $Enums.UserRole.ADMIN &&
        targetUserId !== currentUserId
      ) {
        const adminUsers = await userService.getUsers({
          role: UserRole.ADMIN,
        });
        if (adminUsers.total <= 1) {
          return responseUtil.sendError(res, {
            message: "Cannot delete the last admin account",
            statusCode: StatusCodes.BAD_REQUEST,
          });
        }
      }

      const payload = await userService.deleteUser(targetUserId);
      responseUtil.sendSuccess(res, payload, String(StatusCodes.OK));
    } catch (error) {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      const message = error.message || "Internal server error";

      responseUtil.sendError(res, {
        message,
        statusCode,
      });
    }
  };
}

export const userController = UserController.getInstance();
