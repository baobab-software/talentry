import { RequestHandler, Router } from "express";
import { authenticationController } from "@/controllers";
import {
  authenticationMiddleware,
  authorizationMiddleware,
  userAgentParser,
  registerLimiter,
  loginLimiter,
  logoutLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
} from "@/middlewares";
import { verifyAccountLimiter } from "@/middlewares/rate-limiter.middleware";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints related to user authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthSuccessResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         csrfToken:
 *           type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, candidate, employer]
 *         userData:
 *           type: object
 *           description: Role-specific data for the user
 *           oneOf:
 *             - $ref: '#/components/schemas/IAdminRegister'
 *             - $ref: '#/components/schemas/ICandidateRegister'
 *             - $ref: '#/components/schemas/IEmployerRegister'
 *     PasswordRequest:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *     EmailRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *     IAdminRegister:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *     ICandidateRegister:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         title:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - title
 *     IEmployerRegister:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         industry:
 *           type: string
 *       required:
 *         - name
 *         - industry
 */

export class AuthenticationRoutes {
  constructor(private readonly router: Router = Router()) {}

  /**
   * Initializes the authentication routes
   * @returns {Router} The configured router with all authentication routes
   */
  public init(): Router {
    return (
      this.router
        /**
         * @swagger
         * /auth/register:
         *   post:
         *     summary: Register a new user (admin, candidate, or employer)
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/RegisterRequest'
         *     responses:
         *       200:
         *         description: User registered successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *       400:
         *         description: Bad Request
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *       422:
         *         description: Validation error
         */

        .post(
          "/register",
          registerLimiter as unknown as RequestHandler,
          authenticationController.register
        )

        /**
         * @swagger
         * /auth/verify-account:
         *   post:
         *     summary: Verify account with OTP
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               otp:
         *                 type: string
         *                 pattern: '^\\d{6}$'
         *     responses:
         *       200:
         *         description: Account verified successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *       400:
         *         description: Invalid or expired OTP
         */
        .post(
          "/verify-account",
          verifyAccountLimiter as unknown as RequestHandler,
          authenticationController.verifyAccount
        )

        /**
         * @swagger
         * /v1/auth/login:
         *   post:
         *     summary: Login with email and password
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: Successful login
         *       401:
         *         description: Unauthorized
         */

        .post(
          "/login",
          loginLimiter as unknown as RequestHandler,
          authenticationController.login
        )

        /**
         * @swagger
         * /auth/refresh-token:
         *   post:
         *     summary: Refresh access token using refresh token and CSRF token
         *     tags: [Auth]
         *     responses:
         *       200:
         *         description: Access token refreshed
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/AuthSuccessResponse'
         *       401:
         *         description: Session expired
         *       403:
         *         description: Invalid CSRF token
         */
        .post(
          "/refresh-token",
          loginLimiter as unknown as RequestHandler,
          authenticationController.refreshToken
        )

        /**
         * @swagger
         * /auth/logout:
         *   delete:
         *     summary: Log out the current user
         *     tags: [Auth]
         *     responses:
         *       200:
         *         description: Logout successful
         *       500:
         *         description: Internal server error
         */

        .delete(
          "/logout",
          logoutLimiter as unknown as RequestHandler,
          authenticationMiddleware.authenticateUser.bind(
            authenticationMiddleware
          ),
          authenticationController.logout
        )

        /**
         * @swagger
         * /auth/forgot-password:
         *   post:
         *     summary: Send a password reset OTP to user's email
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/EmailRequest'
         *     responses:
         *       200:
         *         description: Password reset OTP sent
         *       422:
         *         description: Invalid email format
         */
        .post(
          "/forgot-password",
          forgotPasswordLimiter as unknown as RequestHandler,
          authenticationController.forgotPassword
        )

        /**
         * @swagger
         * /auth/forgot-password/verify-otp:
         *   post:
         *     summary: Verify OTP and receive password reset token
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *               otp:
         *                 type: string
         *                 pattern: '^\d{6}$'
         *     responses:
         *       200:
         *         description: OTP verified, reset token returned
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 token:
         *                   type: string
         *                 message:
         *                   type: string
         *       400:
         *         description: Invalid or expired OTP
         *       422:
         *         description: Invalid email or OTP format
         */
        .post(
          "/forgot-password/verify-otp",
          resetPasswordLimiter as unknown as RequestHandler,
          authenticationController.verifyOtp
        )

        /**
         * @swagger
         * /auth/password-reset:
         *   patch:
         *     summary: Reset password using token
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/PasswordRequest'
         *     responses:
         *       200:
         *         description: Password reset successful
         *       422:
         *         description: Invalid password
         */
        .patch(
          "/reset-password",
          resetPasswordLimiter as unknown as RequestHandler,
          authorizationMiddleware.authorizePasswordReset,
          userAgentParser,
          authenticationController.resetPassword
        )
    );
  }
}
