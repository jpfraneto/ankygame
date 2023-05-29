/*
  Warnings:

  - You are about to drop the column `badges` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `oauthProvider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timeZone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sadhana` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SadhanaDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SadhanaSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SadhanaUpdate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Social` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SadhanaParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_sadhanaDayId_fkey";

-- DropForeignKey
ALTER TABLE "Sadhana" DROP CONSTRAINT "Sadhana_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SadhanaDay" DROP CONSTRAINT "SadhanaDay_sadhanaId_fkey";

-- DropForeignKey
ALTER TABLE "SadhanaSession" DROP CONSTRAINT "SadhanaSession_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SadhanaSession" DROP CONSTRAINT "SadhanaSession_sadhanaDayId_fkey";

-- DropForeignKey
ALTER TABLE "SadhanaSession" DROP CONSTRAINT "SadhanaSession_sadhanaId_fkey";

-- DropForeignKey
ALTER TABLE "SadhanaUpdate" DROP CONSTRAINT "SadhanaUpdate_sadhanaId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_userId_fkey";

-- DropForeignKey
ALTER TABLE "_SadhanaParticipants" DROP CONSTRAINT "_SadhanaParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_SadhanaParticipants" DROP CONSTRAINT "_SadhanaParticipants_B_fkey";

-- DropIndex
DROP INDEX "User_providerAccountId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "badges",
DROP COLUMN "emailVerified",
DROP COLUMN "oauthProvider",
DROP COLUMN "providerAccountId",
DROP COLUMN "timeZone",
DROP COLUMN "whatsapp",
ADD COLUMN     "twitterUsername" TEXT,
ADD COLUMN     "walletAddress" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Sadhana";

-- DropTable
DROP TABLE "SadhanaDay";

-- DropTable
DROP TABLE "SadhanaSession";

-- DropTable
DROP TABLE "SadhanaUpdate";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Social";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "_SadhanaParticipants";
