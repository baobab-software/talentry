import { getUserRole, jwtUtil, responseUtil } from '@/utils';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IDecodedJwtToken, JwtType } from '@/interfaces';
import { UserRole } from '@/generated/prisma';

/**
 * Authorization middleware for handling role-based access control and password operations
 * Implements the Singleton pattern to ensure only one instance exists
 */
class AuthorizationMiddleware {
  private static instance: AuthorizationMiddleware;

  private constructor() {
    // Singleton pattern enforcement
  }

  /**
   * Gets the singleton instance of AuthorizationMiddleware
   * @returns {AuthorizationMiddleware} The singleton instance
   */
  public static getInstance = (): AuthorizationMiddleware => {
    if (!AuthorizationMiddleware.instance) {
      AuthorizationMiddleware.instance = new AuthorizationMiddleware();
    }
    return AuthorizationMiddleware.instance;
  };

  /**
   * Handles password-related operations (setup or reset)
   * @private
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   * @returns {Promise<void>}
   */
  private handlePasswordOperation = async (
    req: Request,
    res: Response,
    next: NextFunction,
    tokenType: JwtType
  ): Promise<void> => {
    try {
      const role = UserRole.SEEKER //getUserRole(req);
      const { token } = req.body;

      const verified = await jwtUtil.verify({
        role,
        token,
        type: tokenType,
      });

      req.app.locals.userId = verified.id;
      next();
    } catch (error) {
      responseUtil.sendError(res, {
        message: 'Authorization failed',
        statusCode: StatusCodes.UNAUTHORIZED,
        code: 'AUTHORIZATION_FAILED',
      });
    }
  };

  /**
   * Middleware factory function for role-based authorization
   * @param {string[]} allowedRoles - Array of role names permitted to access the route
   * @returns {Function} Express middleware function that validates access tokens and user roles
   * @example
   * // Usage in route definition
   * router.get('/admin',
   *   authorizationMiddleware.isAuthorized(['admin', 'super_admin']),
   *   adminController.getDashboard
   * );
   */
  public isAuthorized =
    (allowedRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const accessToken = req.cookies['access_token'];
        console.debug('Access token from cookies:', { accessToken });
        
        if (!accessToken) {
          return responseUtil.sendError(res, {
            message: 'Access token is missing',
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }

        const decodedToken: IDecodedJwtToken = jwtUtil.decode(
          accessToken,
        ) as IDecodedJwtToken;

        console.debug('Decoded token:', { decodedToken });
        if (!decodedToken) {
          return responseUtil.sendError(res, {
            message: 'Invalid access token',
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }

        const verifiedToken = await jwtUtil.verify({
          role: decodedToken.role,
          token: accessToken,
          type: decodedToken.type,
        });

        if (!verifiedToken) {
          return responseUtil.sendError(res, {
            message: 'Access token verification failed',
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }

        if (!allowedRoles.includes(decodedToken.role)) {
          return responseUtil.sendError(res, {
            message: 'Access denied: insufficient permissions',
            statusCode: StatusCodes.FORBIDDEN,
          });
        }

        req.app.locals.userId = verifiedToken.id;

        next();
      } catch (error) {
        next(error);
      }
    };


  /**
   * Middleware to authorize password reset operations
   * Validates password reset token and required fields
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   * @returns {Promise<void>}
   */
  public authorizePasswordReset = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    await this.handlePasswordOperation(req, res, next, JwtType.PASSWORD_RESET);
  };
}

/**
 * Singleton instance of AuthorizationMiddleware
 * @type {AuthorizationMiddleware}
 */
export const authorizationMiddleware: AuthorizationMiddleware =
  AuthorizationMiddleware.getInstance();
