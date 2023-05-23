-- CreateTable
CREATE TABLE "Run" (
    "id" SERIAL NOT NULL,
    "twitterUser" TEXT NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);
