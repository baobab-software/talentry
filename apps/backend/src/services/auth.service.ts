import { StatusCodes } from "http-status-codes";
import { BaseService } from "./base.service";
import { getLocationFromIp, jwtUtil, passwordUtil, cacheUtil } from "@/utils";
import {
  adminRepository,
  seekerRepository,
  companyRepository,
  userRepository,
} from "@/repositories";
import { ServiceError } from "@/errors";
import {
  AdminRegister,
  SeekerRegister,
  CompanyRegister,
} from "@talentry/validation";
import { authenticationQueue } from "@/queues";
import { AdminType, UserRole } from "@/generated/prisma";
import { JwtType } from "@/interfaces";
import { config } from "@/configs/config";
import { logger } from "@/libs";

const AuthenticationErrorMessages = {
  login: "Invalid username or password.",
  register:
    "If registration was successful, you will receive an activation email.",
  setupPassword: "An unexpected error occurred while setting up your password.",
  logout: "You have been logged out.",
  forgotPassword:
    "If the request is valid, you will receive an email with further instructions.",
  resetPassword: "Your password reset request has been processed.",
  requestActivation:
    "If the request is valid, an activation email will be sent.",
  confirmActivation: "Your account activation request has been processed.",
  userNotFound: "User not found.",
};

class AuthenticationService extends BaseService {
  private static instance: AuthenticationService;

  private createRoleSpecificUser = async (
    role: UserRole,
    userId: string,
    data: AdminRegister | SeekerRegister | CompanyRegister
  ): Promise<void> => {
    logger.info(
      `Creating role-specific user for role: ${role}, userId: ${userId}`
    );

    switch (role) {
      case UserRole.ADMIN: {
        const adminData = data as AdminRegister;
        await adminRepository.createAdmin({
          userId,
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          type: AdminType.SUPER_ADMIN,
          invitedById: null,
          invitedAt: null,
          permissions: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        logger.info(`Admin user created successfully for userId: ${userId}`);
        break;
      }
      case UserRole.SEEKER: {
        const seekerData = data as SeekerRegister;
        await seekerRepository.createSeeker({
          userId,
          firstName: seekerData.firstName,
          lastName: seekerData.lastName,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        logger.info(`Seeker user created successfully for userId: ${userId}`);
        break;
      }
      case UserRole.COMPANY: {
        const companyData = data as CompanyRegister;
        await companyRepository.createCompany({
          userId,
          name: companyData.companyName,
          description: companyData.companyDescription || null,
          website: companyData.companyWebsite || null,
          logo: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        logger.info(`Company user created successfully for userId: ${userId}`);
        break;
      }
      default:
        throw new ServiceError(StatusCodes.INTERNAL_SERVER_ERROR, {
          message: `Invalid role: ${role}`,
          trace: {
            method: this.createRoleSpecificUser.name,
            context: {
              error: `Failed to create role specific user with role: ${role}`,
            },
          },
        });
    }
  };

  /**
   * Generates a 6-digit OTP
   */
  private generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  /**
   * Registers a new user with a specific role.
   */
  public register = async (
    role: UserRole,
    data: AdminRegister | SeekerRegister | CompanyRegister
  ): Promise<{ message: string }> =>
    this.handleErrors(async () => {
      const { email, phone } = data;

      logger.info(`Starting registration for email: ${email}, role: ${role}`);

      // Check for existing user
      const existingUser = await userRepository.findOne({ email });

      if (existingUser) {
        logger.warn(`User already exists with email: ${email}`);
        throw new ServiceError(StatusCodes.CONFLICT, {
          message: "An account with this email already exists.",
          trace: {
            method: this.register.name,
            context: { email },
          },
        });
      }

      // Hash password
      logger.info(`Hashing password for email: ${email}`);
      const hashedPassword = await passwordUtil.hashSync(role, data.password);

      // Create user
      logger.info(`Creating user for email: ${email}`);
      const newUser = await userRepository.createUser({
        email,
        phone,
        role,
        password: hashedPassword,
        avatar: null,
        image: null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (!newUser) {
        logger.error(`Failed to create user for email: ${email}`);
        throw new ServiceError(StatusCodes.INTERNAL_SERVER_ERROR, {
          message: "Failed to create user account.",
          trace: {
            method: this.register.name,
            context: { email, error: "Failed to create user" },
          },
        });
      }

      logger.info(`User created successfully with id: ${newUser.id}`);

      // Create role-specific user
      await this.createRoleSpecificUser(role, newUser.id, data);

      // Generate OTP
      const otp = this.generateOtp();
      const OTP_EXPIRATION = 10 * 60; // 10 minutes
      const cacheKey = `account_verification_otp:${newUser.email}`;

      logger.info(
        `Storing OTP in cache for email: ${email}, cacheKey: ${cacheKey}`
      );
      await cacheUtil.set(cacheKey, otp, OTP_EXPIRATION);

      // Get app name from config
      const appName = config.notification.mailgen.product.name || "Talentry";

      // Queue verification email
      logger.info(`Queueing verification email for email: ${email}`);

      try {
        await authenticationQueue.add({
          email,
          subject: `Verify your ${appName} account`,
          template: {
            name: "account_verification_otp",
            content: {
              email,
              otp,
              expiration: "10 minutes",
              appName,
              role,
            },
          },
        });
        logger.info(
          `Verification email queued successfully for email: ${email}`
        );
      } catch (queueError) {
        logger.error(
          `Failed to queue verification email for email: ${email}`,
          queueError
        );
        // Don't throw here - user is created, just log the error
      }

      return {
        message: "Account created successfully. Please verify your email.",
      };
    }, this.register.name);

  /**
   * Verifies account OTP and activates user, returns tokens
   */
  public verifyAccountOtp = async (
    email: string,
    otp: string
  ): Promise<{ accessToken: string; refreshToken: string }> =>
    this.handleErrors(async () => {
      logger.info(`Verifying account OTP for email: ${email}`);

      const user = await userRepository.findOne({ email });

      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: AuthenticationErrorMessages.userNotFound,
          trace: {
            method: this.verifyAccountOtp.name,
            context: { email },
          },
        });
      }

      const cacheKey = `account_verification_otp:${email}`;
      const cachedOtp = await cacheUtil.get(cacheKey);

      logger.info(
        `Cached OTP found: ${!!cachedOtp}, matches: ${cachedOtp === otp}`
      );

      if (!cachedOtp || cachedOtp !== otp) {
        throw new ServiceError(StatusCodes.UNAUTHORIZED, {
          message: "Invalid or expired OTP.",
          trace: {
            method: this.verifyAccountOtp.name,
            context: { email },
          },
        });
      }

      await cacheUtil.delete(cacheKey);

      // Update user as verified
      await userRepository.updateUser(user.id, { emailVerified: true });

      logger.info(`Generating tokens for user: ${user.id}`);

      const [accessToken, refreshToken] = await Promise.all([
        jwtUtil.generate({
          id: user.id,
          role: user.role,
          type: JwtType.ACCESS,
        }),
        jwtUtil.generate({
          id: user.id,
          role: user.role,
          type: JwtType.REFRESH,
        }),
      ]);

      logger.info(`Account verified successfully for email: ${email}`);

      return { accessToken, refreshToken };
    }, this.verifyAccountOtp.name);

  /**
   * Logs in a user by validating credentials and generating tokens.
   */
  public login = async (
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> =>
    this.handleErrors(async () => {
      logger.info(`Login attempt for email: ${email}`);

      const INVALID_CREDENTIALS_MSG = AuthenticationErrorMessages.login;

      const user = await userRepository.findOne({ email });

      if (!user) {
        logger.warn(`Login failed - user not found: ${email}`);
        throw new ServiceError(StatusCodes.UNAUTHORIZED, {
          message: INVALID_CREDENTIALS_MSG,
          trace: {
            method: this.login.name,
            context: { email, error: "User not found" },
          },
        });
      }

      const isPasswordValid = await passwordUtil.compareSync(
        user.role,
        password,
        user.password
      );

      if (!isPasswordValid) {
        logger.warn(`Login failed - invalid password for: ${email}`);
        throw new ServiceError(StatusCodes.UNAUTHORIZED, {
          message: INVALID_CREDENTIALS_MSG,
          trace: {
            method: this.login.name,
            context: { email, error: "Invalid password" },
          },
        });
      }

      logger.info(`Generating tokens for user: ${user.id}`);

      const [accessToken, refreshToken] = await Promise.all([
        jwtUtil.generate({
          id: user.id,
          role: user.role,
          type: JwtType.ACCESS,
        }),
        jwtUtil.generate({
          id: user.id,
          role: user.role,
          type: JwtType.REFRESH,
        }),
      ]);

      logger.info(`Login successful for email: ${email}`);

      return { accessToken, refreshToken };
    }, this.login.name);

  /**
   * Logs out the user
   */
  public logout = async (userId: string): Promise<{ message: string }> =>
    this.handleErrors(async () => {
      const user = await userRepository.findOne({ id: userId });

      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: AuthenticationErrorMessages.userNotFound,
          trace: {
            method: this.logout.name,
            context: { userId },
          },
        });
      }

      return {
        message:
          "Logged out successfully. All active sessions have been terminated.",
      };
    }, this.logout.name);

  /**
   * Refreshes the user's access and refresh tokens.
   */
  public refreshToken = async (
    userId: string,
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> =>
    this.handleErrors(async () => {
      const user = await userRepository.findOne({ id: userId });

      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: AuthenticationErrorMessages.userNotFound,
          trace: {
            method: this.refreshToken.name,
            context: { userId },
          },
        });
      }

      await jwtUtil.verify({
        role: user.role,
        token: refreshToken,
        type: "refresh",
      });

      const [newAccessToken, newRefreshToken] = await Promise.all([
        jwtUtil.generate({
          id: user.id,
          role: user.role,
          type: JwtType.ACCESS,
        }),
        jwtUtil.generate({
          id: user.id,
          role: user.role,
          type: JwtType.REFRESH,
        }),
      ]);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    }, this.refreshToken.name);

  /**
   * Handles password reset request by sending an OTP to the user's email.
   */
  public forgotPassword = async (email: string): Promise<{ message: string }> =>
    this.handleErrors(async () => {
      const genericSuccessMessage =
        "If an account exists with this email, an OTP has been sent for password reset.";

      const user = await userRepository.findOne({ email });

      if (!user) {
        return { message: genericSuccessMessage };
      }

      const otp = this.generateOtp();
      const OTP_EXPIRATION = 10 * 60; // 10 minutes
      const OTP_EXPIRATION_TEXT = "10 minutes";

      const cacheKey = `password_reset_otp:${user.id}`;
      await cacheUtil.set(cacheKey, otp, OTP_EXPIRATION);

      const appName = config.notification.mailgen.product.name || "Talentry";

      await authenticationQueue.add({
        email: user.email,
        subject: "Password Reset OTP",
        template: {
          name: "password_reset_otp",
          content: {
            email: user.email,
            otp,
            expiration: OTP_EXPIRATION_TEXT,
            appName,
          },
        },
      });

      return { message: genericSuccessMessage };
    }, this.forgotPassword.name);

  /**
   * Verifies the OTP and generates a password reset token.
   */
  public verifyOtp = async (
    email: string,
    otp: string
  ): Promise<{ token: string; message: string }> =>
    this.handleErrors(async () => {
      const user = await userRepository.findOne({ email });

      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: AuthenticationErrorMessages.userNotFound,
          trace: {
            method: this.verifyOtp.name,
            context: { email },
          },
        });
      }

      const cacheKey = `password_reset_otp:${user.id}`;
      const cachedOtp = await cacheUtil.get(cacheKey);

      if (!cachedOtp || cachedOtp !== otp) {
        throw new ServiceError(StatusCodes.BAD_REQUEST, {
          message: "Invalid or expired OTP",
          trace: {
            method: this.verifyOtp.name,
            context: {
              email,
              userId: user.id,
              error: "OTP mismatch or not found",
            },
          },
        });
      }

      await cacheUtil.delete(cacheKey);

      const passwordResetToken = await jwtUtil.generate({
        id: user.id,
        role: user.role,
        type: JwtType.PASSWORD_RESET,
      });

      const TOKEN_EXPIRATION = 15 * 60; // 15 minutes
      const tokenCacheKey = `password_reset_token:${user.id}`;
      await cacheUtil.set(tokenCacheKey, passwordResetToken, TOKEN_EXPIRATION);

      return {
        token: passwordResetToken,
        message: "OTP verified successfully.",
      };
    }, this.verifyOtp.name);

  /**
   * Completes the password reset process.
   */
  public resetPassword = async (
    userId: string,
    password: string,
    device: { browser: string; os: string; ip: string; timestamp: string }
  ): Promise<{ message: string }> =>
    this.handleErrors(async () => {
      const user = await userRepository.findOne({ id: userId });

      if (!user) {
        throw new ServiceError(StatusCodes.NOT_FOUND, {
          message: AuthenticationErrorMessages.userNotFound,
          trace: {
            method: this.resetPassword.name,
            context: { userId },
          },
        });
      }

      const tokenCacheKey = `password_reset_token:${user.id}`;
      const cachedToken = await cacheUtil.get(tokenCacheKey);

      if (!cachedToken) {
        throw new ServiceError(StatusCodes.BAD_REQUEST, {
          message: "Invalid or expired password reset token",
          trace: {
            method: this.resetPassword.name,
            context: {
              userId,
              error: "Token not found in cache",
            },
          },
        });
      }

      const isSamePassword = await passwordUtil.compareSync(
        user.role,
        password,
        user.password
      );

      if (isSamePassword) {
        throw new ServiceError(StatusCodes.BAD_REQUEST, {
          message: "New password cannot be the same as your current password",
          trace: {
            method: this.resetPassword.name,
            context: {
              userId,
              error: "Password reuse detected",
            },
          },
        });
      }

      const hashedPassword = await passwordUtil.hashSync(user.role, password);
      await userRepository.updateUser(user.id, {
        password: hashedPassword,
      });

      await cacheUtil.delete(tokenCacheKey);

      const appName = config.notification.mailgen.product.name || "Talentry";

      await authenticationQueue.add({
        email: user.email,
        subject: "Your Password Was Changed",
        template: {
          name: "password_update",
          content: {
            email: user.email,
            appName,
            device: {
              browser: device.browser,
              os: device.os,
              location: getLocationFromIp(device.ip),
              timestamp: new Date().toISOString(),
              ip: device.ip,
            },
          },
        },
      });

      return {
        message:
          "Password has been reset successfully. Please log in with your new password.",
      };
    }, this.resetPassword.name);
}

export const authenticationService = AuthenticationService.getInstance();
