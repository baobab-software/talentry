import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { authenticationService } from "@/services";
import { responseUtil } from "@/utils";
import {
  validateLogin,
  validateForgotPassword,
  validateAdminRegister,
  validateSeekerRegister,
  validateCompanyRegister,
  AdminRegister,
  SeekerRegister,
  CompanyRegister,
} from "@talentry/validation";
import { UserRole } from "@/generated/prisma";

const SESSION_EXPIRED_MESSAGE = "Session has expired";

/**
 * Controller handling all authentication-related operations.
 * Implements singleton pattern to ensure a single instance throughout the application.
 */
export class AuthenticationController {
  private static instance: AuthenticationController;

  /**
   * Configuration for refresh token cookie.
   * Secure, HTTP-only cookie with 7-day expiration.
   */
  private readonly REFRESH_TOKEN_COOKIE = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/auth/refresh-token",
  };

  /**
   * Configuration for access token cookie.
   * Secure, HTTP-only cookie with 15-minute expiration.
   */
  private readonly ACCESS_TOKEN_COOKIE = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/",
  };

  private constructor() {
    //
  }

  /**
   * Singleton pattern for controller instantiation.
   * @returns {AuthenticationController} The singleton instance of AuthenticationController
   */
  public static getInstance(): AuthenticationController {
    if (!AuthenticationController.instance) {
      AuthenticationController.instance = new AuthenticationController();
    }
    return AuthenticationController.instance;
  }

  /**
   * Sets authentication cookies (refresh + access token) in the response.
   */
  private setAuthCookies(
    res: Response,
    refreshToken: string,
    accessToken: string
  ): void {
    res
      .cookie("refresh_token", refreshToken, this.REFRESH_TOKEN_COOKIE)
      .cookie("access_token", accessToken, this.ACCESS_TOKEN_COOKIE);
  }

  /**
   * Clears authentication cookies from the response.
   */
  private clearAuthCookies(res: Response): void {
    res.clearCookie("refresh_token", { path: this.REFRESH_TOKEN_COOKIE.path });
    res.clearCookie("access_token", { path: this.ACCESS_TOKEN_COOKIE.path });
  }

  /**
   * Formats Zod validation errors into a user-friendly message.
   */
  private formatValidationErrors(
    errors: { path: (string | number)[]; message: string }[]
  ): string {
    return errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
  }

  /**
   * Handles user registration based on role (admin, seeker, or company).
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const role = req.query.role as UserRole;
      const registerData = req.body;

      let validationResult:
        | ReturnType<typeof validateAdminRegister>
        | ReturnType<typeof validateSeekerRegister>
        | ReturnType<typeof validateCompanyRegister>;
      let userRole: UserRole;

      switch (role?.toUpperCase()) {
        case UserRole.ADMIN:
          validationResult = validateAdminRegister(registerData);
          userRole = UserRole.ADMIN;
          break;
        case UserRole.SEEKER:
          validationResult = validateSeekerRegister(registerData);
          userRole = UserRole.SEEKER;
          break;
        case UserRole.COMPANY:
          validationResult = validateCompanyRegister(registerData);
          userRole = UserRole.COMPANY;
          break;
        default:
          console.error("Invalid role specified:", role);
          return responseUtil.sendError(res, {
            message:
              "Invalid role specified. Must be ADMIN, SEEKER, or COMPANY.",
            statusCode: StatusCodes.BAD_REQUEST,
          });
      }

      if (!validationResult.success) {
        return responseUtil.sendError(res, {
          message: this.formatValidationErrors(validationResult.error.errors),
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        });
      }

      console.log("Validated registration data:", validationResult.data);

      const response = await authenticationService.register(
        userRole,
        validationResult.data as
          | AdminRegister
          | SeekerRegister
          | CompanyRegister
      );

      responseUtil.sendSuccess(res, response, String(StatusCodes.CREATED));
    } catch (error) {
      responseUtil.sendError(res, {
        message: error.message,
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };

  /**
   * Verifies a user's account using email and OTP.
   */
  public verifyAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return responseUtil.sendError(res, {
          message: "Email and OTP are required.",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      const emailValidation = validateForgotPassword({ email });
      if (!emailValidation.success) {
        return responseUtil.sendError(res, {
          message: this.formatValidationErrors(emailValidation.error.errors),
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        });
      }

      if (!/^\d{6}$/.test(otp)) {
        return responseUtil.sendError(res, {
          message: "OTP must be a 6-digit number.",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      const { accessToken, refreshToken } =
        await authenticationService.verifyAccountOtp(email, otp);
      console.log("Tokens:", { accessToken, refreshToken });
      this.setAuthCookies(res, refreshToken, accessToken);

      responseUtil.sendSuccess(
        res,
        { message: "Account verified successfully" },
        String(StatusCodes.OK)
      );
    } catch (error) {
      responseUtil.sendError(res, {
        message: error.message,
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };

  /**
   * Handles user login with email and password credentials.
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const validationResult = validateLogin(req.body);
      console.log("validationResult:", validationResult);

      if (!validationResult.success) {
        return responseUtil.sendError(res, {
          message: this.formatValidationErrors(validationResult.error.errors),
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        });
      }

      const { email, password } = validationResult.data;

      const { accessToken, refreshToken } = await authenticationService.login(
        email,
        password
      );
      console.log("Tokens:", { accessToken, refreshToken });
      this.setAuthCookies(res, refreshToken, accessToken);

      responseUtil.sendSuccess(
        res,
        { message: "Login successful" },
        String(StatusCodes.OK)
      );
    } catch (error) {
      this.clearAuthCookies(res);
      responseUtil.sendError(res, {
        message: error.message,
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };

  /**
   * Handles user logout by invalidating tokens and clearing cookies.
   */
  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.app.locals;

      await authenticationService.logout(userId);

      this.clearAuthCookies(res);
      responseUtil.sendSuccess(
        res,
        { message: "Logout successful" },
        String(StatusCodes.OK)
      );
    } catch (error) {
      this.clearAuthCookies(res);
      responseUtil.sendError(res, {
        message: error.message,
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };

  /**
   * Handles token refresh using a valid refresh token.
   */
  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refresh_token;
      const { userId } = req.app.locals;

      if (!refreshToken || !userId) {
        return responseUtil.sendError(res, {
          message: SESSION_EXPIRED_MESSAGE,
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await authenticationService.refreshToken(userId, refreshToken);

      this.setAuthCookies(res, newRefreshToken, accessToken);

      responseUtil.sendSuccess(
        res,
        { message: "Token refreshed successfully" },
        String(StatusCodes.OK)
      );
    } catch (error) {
      this.clearAuthCookies(res);
      responseUtil.sendError(res, {
        message:
          error.message || "An error occurred while refreshing the token",
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };

  /**
   * Handles forgot password request by sending OTP to user's email.
   */
  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const validationResult = validateForgotPassword(req.body);

      if (!validationResult.success) {
        return responseUtil.sendError(res, {
          message: this.formatValidationErrors(validationResult.error.errors),
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        });
      }

      const { email } = validationResult.data;

      const payload = await authenticationService.forgotPassword(email);
      responseUtil.sendSuccess(res, payload, String(StatusCodes.OK));
    } catch (error) {
      responseUtil.sendError(res, {
        message: error.message,
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };

  /**
   * Verifies OTP sent to user's email during password reset flow.
   */
  public verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return responseUtil.sendError(res, {
          message: "Email and OTP are required",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      const emailValidation = validateForgotPassword({ email });
      if (!emailValidation.success) {
        return responseUtil.sendError(res, {
          message: this.formatValidationErrors(emailValidation.error.errors),
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        });
      }

      if (!/^\d{6}$/.test(otp)) {
        return responseUtil.sendError(res, {
          message: "OTP must be a 6-digit number.",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      const payload = await authenticationService.verifyOtp(email, otp);
      responseUtil.sendSuccess(res, payload, String(StatusCodes.OK));
    } catch (error) {
      responseUtil.sendError(res, {
        message: error.message,
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };

  /**
   * Resets user password after successful OTP verification.
   */
  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, userAgent } = req.app.locals;
      const { newPassword, confirmPassword } = req.body;

      if (!newPassword || !confirmPassword) {
        return responseUtil.sendError(res, {
          message: "New password and confirm password are required",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      if (newPassword !== confirmPassword) {
        return responseUtil.sendError(res, {
          message: "Passwords do not match",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      // Basic password validation (can be enhanced with a dedicated schema)
      if (newPassword.length < 8) {
        return responseUtil.sendError(res, {
          message: "Password must be at least 8 characters long",
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        });
      }

      const ipHeader =
        req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.ip;

      const ip = Array.isArray(ipHeader)
        ? ipHeader[0].trim()
        : (ipHeader as string).split(",")[0].trim();

      const payload = await authenticationService.resetPassword(
        userId,
        confirmPassword,
        {
          browser: userAgent.browser,
          os: userAgent.os,
          ip: ip as string,
          timestamp: new Date().toISOString(),
        }
      );

      responseUtil.sendSuccess(res, payload, String(StatusCodes.OK));
    } catch (error) {
      responseUtil.sendError(res, {
        message:
          error.message || "An error occurred while resetting the password",
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };
}

export const authenticationController = AuthenticationController.getInstance();
