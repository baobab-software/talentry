import { UserRole } from "@/generated/prisma";

enum JwtType {
  ACCOUNT_VERIFICATION = "ACCOUNT_VERIFICATION",
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
  PASSWORD_RESET = "PASSWORD_RESET",
}

interface IJwtToken {
  id: string;
  role: UserRole;
  type: JwtType;
}

interface IDecodedJwtToken {
  id: string;
  role: UserRole;
  type: JwtType;
}

export { JwtType, IJwtToken, IDecodedJwtToken };
