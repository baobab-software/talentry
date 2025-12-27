-- AlterTable
ALTER TABLE "invitation" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
