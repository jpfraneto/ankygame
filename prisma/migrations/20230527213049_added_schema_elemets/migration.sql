-- AlterTable
ALTER TABLE "Run" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "pauseTimes" INTEGER,
ADD COLUMN     "sentToAnki" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
