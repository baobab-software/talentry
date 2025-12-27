import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import { config } from "@/configs/config";
import { JwtType } from "@/interfaces";
import { UserRole } from "@/generated/prisma";

interface GenerateParams {
  id: string;
  role: UserRole;
  type: JwtType;
}

interface VerifyParams {
  token: string;
  role: UserRole;
  type: JwtType | string;
}

class JwtUtil {
  private static instance: JwtUtil;

  private constructor() {}

  public static getInstance(): JwtUtil {
    if (!JwtUtil.instance) {
      JwtUtil.instance = new JwtUtil();
    }
    return JwtUtil.instance;
  }

  /**
   * Gets the JWT secret key based on role and token type
   */
  private getJwtKey(role: UserRole, type: JwtType | string): string {
    const jwtConfig = config.authentication.jwt;

    // Normalize the type to match JwtType enum
    const normalizedType = type.toString().toUpperCase() as keyof typeof JwtType;
    const jwtType = JwtType[normalizedType] || type;

    // Get role-specific config or fall back to default
    const roleKey = role.toLowerCase() as keyof typeof jwtConfig;
    const roleConfig = jwtConfig[roleKey];

    if (!roleConfig || typeof roleConfig !== "object") {
      // Fall back to a default secret if role-specific config doesn't exist
      const defaultSecret = process.env.JWT_SECRET;
      if (defaultSecret) {
        return defaultSecret;
      }
      throw new Error(`JWT configuration not found for role: ${role}`);
    }

    // Get the secret based on token type
    let secret: string | undefined;

    switch (jwtType) {
      case JwtType.ACCESS:
        secret = (roleConfig as { accessTokenSecret?: string }).accessTokenSecret;
        break;
      case JwtType.REFRESH:
        secret = (roleConfig as { refreshTokenSecret?: string }).refreshTokenSecret;
        break;
      case JwtType.PASSWORD_RESET:
        secret = (roleConfig as { passwordResetTokenSecret?: string }).passwordResetTokenSecret;
        break;
      default:
        // Try to get a generic secret
        secret = (roleConfig as { accessTokenSecret?: string }).accessTokenSecret;
    }

    if (!secret) {
      // Fall back to default JWT_SECRET
      const defaultSecret = process.env.JWT_SECRET;
      if (defaultSecret) {
        return defaultSecret;
      }
      throw new Error(`JWT secret key not found for role: ${role}, type: ${type}`);
    }

    return secret;
  }

  /**
   * Gets the token expiration based on role and token type
   */
  private getExpiration(role: UserRole, type: JwtType): string {
    const jwtConfig = config.authentication.jwt;
    const roleKey = role.toLowerCase() as keyof typeof jwtConfig;
    const roleConfig = jwtConfig[roleKey];

    if (!roleConfig || typeof roleConfig !== "object") {
      // Default expirations
      switch (type) {
        case JwtType.ACCESS:
          return "15m";
        case JwtType.REFRESH:
          return "7d";
        case JwtType.PASSWORD_RESET:
          return "15m";
        default:
          return "15m";
      }
    }

    switch (type) {
      case JwtType.ACCESS:
        return (roleConfig as { accessTokenExpiration?: string }).accessTokenExpiration || "15m";
      case JwtType.REFRESH:
        return (roleConfig as { refreshTokenExpiration?: string }).refreshTokenExpiration || "7d";
      case JwtType.PASSWORD_RESET:
        return (roleConfig as { passwordResetTokenExpiration?: string }).passwordResetTokenExpiration || "15m";
      default:
        return "15m";
    }
  }

  /**
   * Generates a JWT token
   */
  public async generate({ id, role, type }: GenerateParams): Promise<string> {
    const secret = this.getJwtKey(role, type);
    const expiresIn = this.getExpiration(role, type);

    const payload = {
      id,
      role,
      type,
    };

    const options: SignOptions = { expiresIn: expiresIn as SignOptions["expiresIn"] };

    return jwt.sign(payload, secret, options);
  }

  /**
   * Verifies a JWT token
   */
  public async verify({ token, role, type }: VerifyParams): Promise<JwtPayload> {
    const secret = this.getJwtKey(role, type);

    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired");
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      }
      throw error;
    }
  }

  /**
   * Decodes a JWT token without verification
   */
  public decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload | null;
    } catch {
      return null;
    }
  }
}

export const jwtUtil = JwtUtil.getInstance();
