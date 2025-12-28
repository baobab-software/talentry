-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SEEKER', 'EMPLOYER');

-- CreateEnum
CREATE TYPE "AdminType" AS ENUM ('SUPER_ADMIN', 'COMPANY_ADMIN');

-- CreateEnum
CREATE TYPE "CompanyMemberRole" AS ENUM ('OWNER', 'ADMIN', 'MANAGER', 'MEMBER', 'VIEWER');

-- CreateEnum
CREATE TYPE "CompanyMemberStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "InvitationType" AS ENUM ('COMPANY_MEMBER', 'ADMIN_USER');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'CANCELLED', 'REVOKED');

-- CreateEnum
CREATE TYPE "JoinRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'SEEKER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "type" "AdminType" NOT NULL DEFAULT 'SUPER_ADMIN',
    "invitedById" TEXT,
    "invitedAt" TIMESTAMP(3),
    "permissions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seeker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seeker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_member" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "CompanyMemberRole" NOT NULL,
    "department" TEXT,
    "title" TEXT,
    "permissions" JSONB,
    "invitedById" TEXT,
    "invitedAt" TIMESTAMP(3),
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "CompanyMemberStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "type" "InvitationType" NOT NULL,
    "companyId" TEXT,
    "adminType" "AdminType",
    "adminCompanyId" TEXT,
    "inviterId" TEXT NOT NULL,
    "inviteeId" TEXT,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" TEXT,
    "permissions" JSONB,
    "department" TEXT,
    "title" TEXT,
    "token" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '7 days',
    "message" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "declinedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_join_request" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT,
    "status" "JoinRequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_join_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_member_audit" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "memberId" TEXT,
    "actorId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT,
    "oldData" JSONB,
    "newData" JSONB,
    "changes" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_member_audit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_role_idx" ON "user"("role");

-- CreateIndex
CREATE INDEX "user_createdAt_idx" ON "user"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_userId_key" ON "admin"("userId");

-- CreateIndex
CREATE INDEX "admin_type_idx" ON "admin"("type");

-- CreateIndex
CREATE INDEX "admin_invitedById_idx" ON "admin"("invitedById");

-- CreateIndex
CREATE UNIQUE INDEX "seeker_userId_key" ON "seeker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "company_userId_key" ON "company"("userId");

-- CreateIndex
CREATE INDEX "company_name_idx" ON "company"("name");

-- CreateIndex
CREATE INDEX "company_createdAt_idx" ON "company"("createdAt");

-- CreateIndex
CREATE INDEX "company_member_companyId_idx" ON "company_member"("companyId");

-- CreateIndex
CREATE INDEX "company_member_userId_idx" ON "company_member"("userId");

-- CreateIndex
CREATE INDEX "company_member_role_idx" ON "company_member"("role");

-- CreateIndex
CREATE INDEX "company_member_status_idx" ON "company_member"("status");

-- CreateIndex
CREATE INDEX "company_member_createdAt_idx" ON "company_member"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "company_member_companyId_userId_key" ON "company_member"("companyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_token_key" ON "invitation"("token");

-- CreateIndex
CREATE INDEX "invitation_type_idx" ON "invitation"("type");

-- CreateIndex
CREATE INDEX "invitation_companyId_idx" ON "invitation"("companyId");

-- CreateIndex
CREATE INDEX "invitation_inviterId_idx" ON "invitation"("inviterId");

-- CreateIndex
CREATE INDEX "invitation_inviteeId_idx" ON "invitation"("inviteeId");

-- CreateIndex
CREATE INDEX "invitation_email_idx" ON "invitation"("email");

-- CreateIndex
CREATE INDEX "invitation_token_idx" ON "invitation"("token");

-- CreateIndex
CREATE INDEX "invitation_status_idx" ON "invitation"("status");

-- CreateIndex
CREATE INDEX "invitation_expiresAt_idx" ON "invitation"("expiresAt");

-- CreateIndex
CREATE INDEX "invitation_createdAt_idx" ON "invitation"("createdAt");

-- CreateIndex
CREATE INDEX "invitation_type_status_idx" ON "invitation"("type", "status");

-- CreateIndex
CREATE INDEX "invitation_email_status_idx" ON "invitation"("email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_companyId_email_type_key" ON "invitation"("companyId", "email", "type");

-- CreateIndex
CREATE UNIQUE INDEX "invitation_email_type_status_key" ON "invitation"("email", "type", "status");

-- CreateIndex
CREATE INDEX "company_join_request_companyId_idx" ON "company_join_request"("companyId");

-- CreateIndex
CREATE INDEX "company_join_request_userId_idx" ON "company_join_request"("userId");

-- CreateIndex
CREATE INDEX "company_join_request_status_idx" ON "company_join_request"("status");

-- CreateIndex
CREATE INDEX "company_join_request_createdAt_idx" ON "company_join_request"("createdAt");

-- CreateIndex
CREATE INDEX "company_join_request_reviewedById_idx" ON "company_join_request"("reviewedById");

-- CreateIndex
CREATE UNIQUE INDEX "company_join_request_companyId_userId_status_key" ON "company_join_request"("companyId", "userId", "status");

-- CreateIndex
CREATE INDEX "company_member_audit_companyId_idx" ON "company_member_audit"("companyId");

-- CreateIndex
CREATE INDEX "company_member_audit_actorId_idx" ON "company_member_audit"("actorId");

-- CreateIndex
CREATE INDEX "company_member_audit_memberId_idx" ON "company_member_audit"("memberId");

-- CreateIndex
CREATE INDEX "company_member_audit_actionType_idx" ON "company_member_audit"("actionType");

-- CreateIndex
CREATE INDEX "company_member_audit_targetType_idx" ON "company_member_audit"("targetType");

-- CreateIndex
CREATE INDEX "company_member_audit_createdAt_idx" ON "company_member_audit"("createdAt");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seeker" ADD CONSTRAINT "seeker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_member" ADD CONSTRAINT "company_member_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_member" ADD CONSTRAINT "company_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_member" ADD CONSTRAINT "company_member_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_join_request" ADD CONSTRAINT "company_join_request_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_join_request" ADD CONSTRAINT "company_join_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_join_request" ADD CONSTRAINT "company_join_request_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_member_audit" ADD CONSTRAINT "company_member_audit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_member_audit" ADD CONSTRAINT "company_member_audit_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
