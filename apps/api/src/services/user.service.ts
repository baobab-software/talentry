import { ServiceError } from '@api/errors';
import { IUserService } from '@api/interfaces';
import { redis } from '@api/libs';
import { IUser } from '@talentry/types/api';
import { userRepository } from '@api/repositories';
import { passwordUtil } from '@api/utils';
import { StatusCodes } from 'http-status-codes';
import { BaseService } from './base.service';
import { UsersUpdateInput } from '@api/generated/prisma/models';

/**
 * User service handling user-related operations like contact update,
 * password update, and account deletion.
 */
class UserService extends BaseService implements IUserService {
  private static instance: UserService;

  private constructor() {
    super();
  }

  /**
   * Returns the singleton instance of UserService.
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Updates the user's email or phone number.
   * Throws error if email or phone is already in use by another user.
   * @param id - User ID
   * @param data - Partial user object containing email and/or phone
   */
  public updateContact = async (
    id: string,
    data: Partial<IUser>,
  ): Promise<void> =>
    this.handleErrors(async () => {
      const user = await userRepository.read({ id });
      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: 'The requested user could not be found in the system.',
          trace: {
            method: this.updateContact.name,
            context: { userId: id },
          },
        });
      }

      const email = data.email?.toLowerCase().trim();
      const phone = data.phone?.trim();

      const [userWithSameEmail, userWithSamePhone] = await Promise.all([
        email ? userRepository.read({ email }) : null,
        phone ? userRepository.read({ phone }) : null,
      ]);

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ServiceError(StatusCodes.BAD_REQUEST, {
          message: 'The provided email address is already in use.',
          trace: {
            method: this.updateContact.name,
            context: { email },
          },
        });
      }

      if (userWithSamePhone && userWithSamePhone.id !== id) {
        throw new ServiceError(StatusCodes.BAD_REQUEST, {
          message: 'The provided phone number is already in use.',
          trace: {
            method: this.updateContact.name,
            context: { phone },
          },
        });
      }

      const payload: UsersUpdateInput = {};
      if (email) payload.email = email;
      if (phone) payload.phone = phone;

      await userRepository.update(id, payload);
    }, this.updateContact.name);

  /**
   * Updates a user's password after validating the current password.
   * @param id - User ID
   * @param passwords - Object containing current and new password
   */
  public updatePassword = async (
    id: string,
    passwords: { currentPassword: string; newPassword: string },
  ): Promise<void> =>
    this.handleErrors(async () => {
      const user = await userRepository.read({ id });
      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: 'The requested user could not be found in the system.',
          trace: {
            method: this.updatePassword.name,
            context: { userId: id },
          },
        });
      }

      const isCurrentValid = await passwordUtil.compareSync(
        user.role,
        passwords.currentPassword,
        user.password,
      );

      if (!isCurrentValid) {
        throw new ServiceError(StatusCodes.UNAUTHORIZED, {
          message: 'The current password is incorrect.',
          trace: {
            method: this.updatePassword.name,
            context: { userId: id },
          },
        });
      }

      const isSamePassword = await passwordUtil.compareSync(
        user.role,
        passwords.newPassword,
        user.password,
      );

      if (isSamePassword) {
        throw new ServiceError(StatusCodes.BAD_REQUEST, {
          message:
            'The new password cannot be the same as the current password.',
          trace: {
            method: this.updatePassword.name,
            context: { userId: id },
          },
        });
      }

      const hashedPassword = await passwordUtil.hashSync(
        user.role,
        passwords.newPassword,
      );

      await userRepository.update(id, { password: hashedPassword });
    }, this.updatePassword.name);

  /**
   * Deletes a user account and removes their refresh token from Redis.
   * @param id - User ID
   */
  public deleteAccount = async (id: string): Promise<{ message: string }> =>
    this.handleErrors(async () => {
      const result = await userRepository.delete(id);

      if (!result) {
        throw new ServiceError(StatusCodes.INTERNAL_SERVER_ERROR, {
          message: 'User account not found or could not be deleted.',
          trace: {
            method: this.deleteAccount.name,
            context: { userId: id },
          },
        });
      }

      await redis.del(`refresh_token:${id}`);

      return { message: 'User deleted successfully' };
    }, this.deleteAccount.name);
}

export const userService = UserService.getInstance();
