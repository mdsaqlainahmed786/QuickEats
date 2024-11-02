/*
  Warnings:

  - You are about to drop the column `isPhoneVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPhoneVerified",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);
