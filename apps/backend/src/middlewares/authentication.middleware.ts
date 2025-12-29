import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { responseUtil } from "@/utils";
import { jwtUtil } from "@/utils/jwt.util";
import { cacheUtil } from "@/utils";
import { UserRole } from "@/generated/prisma";
import { JwtType } from "@/interfaces";

class AuthenticationMiddleware {
  private static instance: AuthenticationMiddleware;

  private constructor() {}

  public static getInstance(): AuthenticationMiddleware {
    if (!AuthenticationMiddleware.instance) {
      AuthenticationMiddleware.instance = new AuthenticationMiddleware();
    }
    return AuthenticationMiddleware.instance;
  }

  /**
   * API KEY AUTHENTICATION
   * For trusted services/clients making API calls
   * NOT for user login
   */
  public authenticateApiKey = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return responseUtil.sendError(res, {
          message: "API key is required",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      if (!authHeader.startsWith("Bearer ")) {
        return responseUtil.sendError(res, {
          message: "Invalid API key format. Expected: Bearer <api-key>",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      const apiKey = authHeader.split(" ")[1];
      if (!apiKey) {
        return responseUtil.sendError(res, {
          message: "API key is missing",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      // Validate API key from cache/database
      const apiKeyData = await this.validateApiKey(apiKey);
      if (!apiKeyData) {
        return responseUtil.sendError(res, {
          message: "Invalid or expired API key",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      // Store API client info in request
      req.app.locals.apiClient = {
        apiKeyId: apiKeyData.id,
        clientId: apiKeyData.clientId,
        clientName: apiKeyData.clientName,
        permissions: apiKeyData.permissions || [],
        rateLimit: apiKeyData.rateLimit,
      };

      req.app.locals.authMethod = "api_key";
      req.app.locals.authType = "api_client";

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * USER SESSION AUTHENTICATION
   * For human users with browser sessions
   * Uses access_token and refresh_token cookies
   */
  public authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const accessToken = req.cookies?.access_token;
      const refreshToken = req.cookies?.refresh_token;

      if (!accessToken || !refreshToken) {
        return responseUtil.sendError(res, {
          message: "Authentication required. Please log in.",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      const decodedAccessToken = jwtUtil.decode(accessToken);
      if (!decodedAccessToken || !decodedAccessToken.role) {
        return responseUtil.sendError(res, {
          message: "Invalid session. Please log in again.",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      const userRole = decodedAccessToken.role as UserRole;

      let accessTokenPayload;
      try {
        accessTokenPayload = await jwtUtil.verify({
          token: accessToken,
          role: userRole,
          type: JwtType.ACCESS,
        });
      } catch (error) {
        // Access token expired or invalid, try to refresh
        return await this.handleTokenRefresh(
          req,
          res,
          next,
          refreshToken,
          userRole
        );
      }

      // Check if refresh token is valid
      const isRefreshTokenValid = await this.validateRefreshToken(
        refreshToken,
        accessTokenPayload.id,
        userRole
      );
      if (!isRefreshTokenValid) {
        return responseUtil.sendError(res, {
          message: "Session expired. Please log in again.",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      // Store user info in request
      req.app.locals.user = {
        id: accessTokenPayload.id,
        role: accessTokenPayload.role,
        email: accessTokenPayload.email,
      };

      req.app.locals.authMethod = "session";
      req.app.locals.authType = "user";
      req.app.locals.accessToken = accessToken;
      req.app.locals.refreshToken = refreshToken;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * COMBINED AUTHENTICATION
   * Tries API key first, then user session
   * Useful for endpoints that support both
   */
  public authenticateAny = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Try API key authentication first
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const apiKey = authHeader.split(" ")[1];
        const apiKeyData = await this.validateApiKey(apiKey);

        if (apiKeyData) {
          req.app.locals.apiClient = {
            apiKeyId: apiKeyData.id,
            clientId: apiKeyData.clientId,
            clientName: apiKeyData.clientName,
            permissions: apiKeyData.permissions || [],
            rateLimit: apiKeyData.rateLimit,
          };
          req.app.locals.authMethod = "api_key";
          req.app.locals.authType = "api_client";
          return next();
        }
      }

      // Fall back to user session auth
      await this.tryUserAuth(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Helper method to try user authentication
   */
  private tryUserAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.authenticateUser(req, res, next);
    } catch (error) {
      // If user auth fails, return error
      return responseUtil.sendError(res, {
        message:
          "Authentication required. Provide valid API key or user session.",
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
  };

  /**
   * Handle refresh token flow when access token is expired
   */
  private handleTokenRefresh = async (
    req: Request,
    res: Response,
    next: NextFunction,
    refreshToken: string,
    userRole: UserRole
  ): Promise<void> => {
    try {
      // Verify refresh token
      let refreshTokenPayload;
      try {
        refreshTokenPayload = await jwtUtil.verify({
          token: refreshToken,
          role: userRole,
          type: JwtType.REFRESH,
        });
      } catch (error) {
        return responseUtil.sendError(res, {
          message: "Session expired. Please log in again.",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      // Check if refresh token is valid in cache
      const isRefreshTokenValid = await this.validateRefreshToken(
        refreshToken,
        refreshTokenPayload.id,
        userRole
      );
      if (!isRefreshTokenValid) {
        return responseUtil.sendError(res, {
          message: "Session expired. Please log in again.",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      // Generate new access and refresh tokens
      const newAccessToken = await jwtUtil.generate({
        id: refreshTokenPayload.id,
        role: refreshTokenPayload.role,
        type: JwtType.ACCESS,
      });
      const newRefreshToken = await jwtUtil.generate({
        id: refreshTokenPayload.id,
        role: refreshTokenPayload.role,
        type: JwtType.REFRESH,
      });

      // Cache the new refresh token and remove the old one
      const REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60; // 7 days in seconds
      const oldRefreshTokenCacheKey = `refresh_token:${userRole}:${refreshTokenPayload.id}:${refreshToken}`;
      const newRefreshTokenCacheKey = `refresh_token:${userRole}:${refreshTokenPayload.id}:${newRefreshToken}`;
      await cacheUtil.set(
        newRefreshTokenCacheKey,
        true,
        REFRESH_TOKEN_EXPIRATION
      );
      await cacheUtil.delete(oldRefreshTokenCacheKey);

      // Set new tokens in cookies
      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
      res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Store user info in request
      req.app.locals.user = {
        id: refreshTokenPayload.id,
        role: refreshTokenPayload.role,
        email: refreshTokenPayload.email,
      };

      req.app.locals.authMethod = "session";
      req.app.locals.authType = "user";
      req.app.locals.accessToken = newAccessToken;
      req.app.locals.refreshToken = newRefreshToken;

      next();
    } catch (error) {
      return responseUtil.sendError(res, {
        message: "Session expired. Please log in again.",
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
  };

  /**
   * Validate API key from cache/database
   */
  private async validateApiKey(apiKey: string): Promise<any | null> {
    try {
      // Check if API key exists in cache
      const cacheKey = `api_key:${apiKey}`;
      const apiKeyData = await cacheUtil.get(cacheKey);

      if (!apiKeyData) {
        // Optionally check database if not in cache
        // const dbApiKey = await apiKeyRepository.findByKey(apiKey);
        // if (dbApiKey) {
        //   // Cache it for future requests
        //   await cacheUtil.set(cacheKey, dbApiKey, 3600);
        //   return dbApiKey;
        // }
        return null;
      }

      // Check if API key is active and not expired
      const now = Date.now();
      if (apiKeyData.isActive === false) {
        return null;
      }

      if (apiKeyData.expiresAt && apiKeyData.expiresAt < now) {
        // Auto-delete expired key from cache
        await cacheUtil.delete(cacheKey);
        return null;
      }

      return apiKeyData;
    } catch (error) {
      console.error("Error validating API key:", error);
      return null;
    }
  }

  /**
   * Validate refresh token exists in cache
   */
  private async validateRefreshToken(
    refreshToken: string,
    userId: string,
    role: UserRole
  ): Promise<boolean> {
    try {
      // Check if refresh token exists in cache
      const cacheKey = `refresh_token:${role}:${userId}:${refreshToken}`;
      const tokenExists = await cacheUtil.has(cacheKey);

      return tokenExists;
    } catch (error) {
      console.error("Error validating refresh token:", error);
      return false;
    }
  }

  /**
   * Get authentication method used in current request
   */
  public getAuthMethod(req: Request): "api_key" | "session" | null {
    return req.app.locals.authMethod || null;
  }

  /**
   * Get authentication type (api_client or user)
   */
  public getAuthType(req: Request): "api_client" | "user" | null {
    return req.app.locals.authType || null;
  }

  /**
   * Get authenticated user (if user session)
   */
  public getUser(
    req: Request
  ): { id: string; role: string; email?: string } | null {
    return req.app.locals.user || null;
  }

  /**
   * Get API client info (if API key)
   */
  public getApiClient(req: Request): any | null {
    return req.app.locals.apiClient || null;
  }

  /**
   * Check if request is from an API client
   */
  public isApiClient(req: Request): boolean {
    return req.app.locals.authType === "api_client";
  }

  /**
   * Check if request is from a user session
   */
  public isUser(req: Request): boolean {
    return req.app.locals.authType === "user";
  }
}

export const authenticationMiddleware = AuthenticationMiddleware.getInstance();
