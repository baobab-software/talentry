import { UserRole } from '@/generated/prisma';
import { Request } from 'express';

interface RoleDomainConfig {
  subdomain: string;
  role: UserRole;
}

const ROLE_CONFIGS: RoleDomainConfig[] = [
  { subdomain: 'admin', role: UserRole.ADMIN },
  { subdomain: 'www', role: UserRole.SEEKER },
  { subdomain: 'employer', role: UserRole.COMPANY },
];

export const getUserRole = (req: Request): UserRole | undefined => {
  const host = req.get('host')?.toLowerCase();
  if (!host) return undefined;

  const matchingConfig = ROLE_CONFIGS.find(
    config =>
      host === `${config.subdomain}.example.com` ||
      host.startsWith(`${config.subdomain}.`),
  );

  return matchingConfig?.role;
};
