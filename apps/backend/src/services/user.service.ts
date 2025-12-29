import { StatusCodes } from "http-status-codes";
import { BaseService } from "./base.service";
import { ServiceError } from "@/errors";
import { userRepository } from "@/repositories"; // Only import what you need
import { UserRole, UserFilter, UserWithRelations } from "@talentry/types";
import { cacheUtil } from "@/utils";
import { User } from "@/generated/prisma";

class UserService extends BaseService {
  private static instance: UserService;
  private readonly CACHE_TTL = 3600;

  private validateUserRole(role: string): void {
    if (!Object.values(UserRole).includes(role as UserRole)) {
      throw new ServiceError(StatusCodes.BAD_REQUEST, {
        message: `Invalid role: ${role}`,
        trace: {
          method: "validateUserRole",
          context: { role },
        },
      });
    }
  }

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private getCacheKey(userId: string): string {
    return `user:${userId}`;
  }

  public getUser = async (userId: string): Promise<UserWithRelations | null> =>
    this.handleErrors(async () => {
      const cacheKey = this.getCacheKey(userId);
      const cachedUser = await cacheUtil.get(cacheKey);

      if (cachedUser) {
        return cachedUser;
      }

      const user = await userRepository.findOne({ id: userId });

      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: "User not found.",
          trace: {
            method: this.getUser.name,
            context: { userId },
          },
        });
      }

      const userWithRelations = user as UserWithRelations;

      await cacheUtil.set(cacheKey, userWithRelations, this.CACHE_TTL);

      return { user: userWithRelations };
    }, this.getUser.name);

  public getUsers = async (
    filters: UserFilter
  ): Promise<{
    users: UserWithRelations[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }> =>
    this.handleErrors(async () => {
      const result = await userRepository.findUsers(filters);

      if (!result.users || result.total === 0) {
        return {
          users: [],
          total: 0,
          totalPages: 0,
          currentPage: 0,
          perPage: 0,
        };
      }

      const mappedUsers: UserWithRelations[] = result.users.map((user) => ({
        ...user,
        role: user.role as UserRole,
      }));

      const cachePromises = mappedUsers.map((user) =>
        cacheUtil.set(this.getCacheKey(user.id), user, this.CACHE_TTL)
      );
      await Promise.allSettled(cachePromises);

      return { ...result, users: mappedUsers };
    }, this.getUsers.name);

  public updateUser = async (
    userId: string,
    updateData: Partial<User>
  ): Promise<UserWithRelations> =>
    this.handleErrors(async () => {
      const user = await userRepository.findOne({ id: userId });

      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: "User not found.",
          trace: {
            method: this.updateUser.name,
            context: { userId },
          },
        });
      }

      if (updateData.role !== undefined) {
        throw new ServiceError(StatusCodes.FORBIDDEN, {
          message: "Updating user role is not allowed.",
          trace: {
            method: this.updateUser.name,
            context: { userId },
          },
        });
      }

      const updatedUser = await userRepository.updateUser(userId, updateData);

      const cacheKey = this.getCacheKey(userId);
      await cacheUtil.set(cacheKey, updatedUser, this.CACHE_TTL);

      return updatedUser as UserWithRelations;
    }, this.updateUser.name);

  public deleteUser = async (userId: string): Promise<{ message: string }> =>
    this.handleErrors(async () => {
      const user = await userRepository.findOne({ id: userId });

      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: "User not found.",
          trace: {
            method: this.deleteUser.name,
            context: { userId },
          },
        });
      }

      await userRepository.deleteUser(userId);

      const cacheKey = this.getCacheKey(userId);
      await cacheUtil.delete(cacheKey);

      return { message: "User deleted successfully." };
    }, this.deleteUser.name);
}

export const userService = UserService.getInstance();
