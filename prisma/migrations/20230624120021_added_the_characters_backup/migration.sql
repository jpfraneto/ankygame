-- CreateEnum
CREATE TYPE "CharacterState" AS ENUM ('VOID', 'GERMINAL', 'EMBRYONIC', 'FETAL', 'BIRTHED', 'FAILED');

-- CreateTable
CREATE TABLE "CharacterBackup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "worldId" TEXT NOT NULL,
    "promptForMidjourney" TEXT,
    "characterName" TEXT,
    "nftNumber" INTEGER,
    "characterBackstory" TEXT,
    "imageId" TEXT,
    "upscaledImageUrls" TEXT[],
    "chosenImageUrl" TEXT,
    "readyToMint" BOOLEAN NOT NULL DEFAULT false,
    "completionResponse" TEXT,
    "tweeted" BOOLEAN NOT NULL DEFAULT false,
    "addedToIPFS" BOOLEAN NOT NULL DEFAULT false,
    "state" "CharacterState" NOT NULL,
    "traits" JSONB,
    "worldCharacteristicsOfPeople" TEXT,

    CONSTRAINT "CharacterBackup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "associatedLandmark" TEXT NOT NULL,
    "mainActivity" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Landmark" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,

    CONSTRAINT "Landmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Celebration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,

    CONSTRAINT "Celebration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "World" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chakra" INTEGER NOT NULL,
    "otherside" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characteristics" TEXT NOT NULL,
    "characteristicsOfPeople" TEXT NOT NULL,

    CONSTRAINT "World_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "World_chakra_key" ON "World"("chakra");

-- AddForeignKey
ALTER TABLE "CharacterBackup" ADD CONSTRAINT "CharacterBackup_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Landmark" ADD CONSTRAINT "Landmark_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Celebration" ADD CONSTRAINT "Celebration_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
