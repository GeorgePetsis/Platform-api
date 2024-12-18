-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('VIEWER', 'ADMIN', 'EDITOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'VIEWER';
