/*
  Warnings:

  - You are about to drop the `Celebration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CharacterBackup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Landmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NFT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Run` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `World` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CharacterBackupToWorld` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Celebration" DROP CONSTRAINT "Celebration_worldId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_worldId_fkey";

-- DropForeignKey
ALTER TABLE "Landmark" DROP CONSTRAINT "Landmark_worldId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Run" DROP CONSTRAINT "Run_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterBackupToWorld" DROP CONSTRAINT "_CharacterBackupToWorld_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterBackupToWorld" DROP CONSTRAINT "_CharacterBackupToWorld_B_fkey";

-- DropTable
DROP TABLE "Celebration";

-- DropTable
DROP TABLE "Character";

-- DropTable
DROP TABLE "CharacterBackup";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Landmark";

-- DropTable
DROP TABLE "NFT";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Run";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "World";

-- DropTable
DROP TABLE "_CharacterBackupToWorld";

-- DropEnum
DROP TYPE "CharacterState";

-- CreateTable
CREATE TABLE "Writing" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "time" INTEGER,

    CONSTRAINT "Writing_pkey" PRIMARY KEY ("id")
);
