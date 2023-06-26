/*
  Warnings:

  - A unique constraint covering the columns `[genesisCharacterId]` on the table `CharacterBackup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CharacterBackup" DROP CONSTRAINT "CharacterBackup_worldId_fkey";

-- AlterTable
ALTER TABLE "CharacterBackup" ADD COLUMN     "genesisCharacterId" TEXT;

-- CreateTable
CREATE TABLE "_CharacterBackupToWorld" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterBackupToWorld_AB_unique" ON "_CharacterBackupToWorld"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterBackupToWorld_B_index" ON "_CharacterBackupToWorld"("B");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterBackup_genesisCharacterId_key" ON "CharacterBackup"("genesisCharacterId");

-- AddForeignKey
ALTER TABLE "_CharacterBackupToWorld" ADD CONSTRAINT "_CharacterBackupToWorld_A_fkey" FOREIGN KEY ("A") REFERENCES "CharacterBackup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterBackupToWorld" ADD CONSTRAINT "_CharacterBackupToWorld_B_fkey" FOREIGN KEY ("B") REFERENCES "World"("id") ON DELETE CASCADE ON UPDATE CASCADE;
