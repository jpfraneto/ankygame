-- CreateTable
CREATE TABLE "NFT" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promptForMidjourney" TEXT,
    "name" TEXT,
    "characterBackstory" TEXT,
    "imageId" TEXT,
    "upscaledImageUrls" TEXT[],
    "chosenImageUrl" TEXT,
    "traits" JSONB,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
