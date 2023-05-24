-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "oauthProvider" TEXT,
    "email" TEXT,
    "username" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "timeZone" TEXT,
    "providerAccountId" TEXT,
    "whatsapp" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "badges" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sadhana" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "authorId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "targetSessions" INTEGER NOT NULL,
    "targetSessionDuration" INTEGER NOT NULL,
    "periodicity" TEXT NOT NULL,
    "startingTimestamp" TEXT NOT NULL,
    "userLimit" INTEGER,
    "elapsedDays" INTEGER NOT NULL DEFAULT 0,
    "started" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "activeDay" INTEGER,

    CONSTRAINT "Sadhana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SadhanaUpdate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "sadhanaId" INTEGER NOT NULL,
    "dayIndex" INTEGER NOT NULL,

    CONSTRAINT "SadhanaUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SadhanaDay" (
    "id" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL,
    "sadhanaId" INTEGER NOT NULL,

    CONSTRAINT "SadhanaDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "sadhanaDayId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SadhanaSession" (
    "id" TEXT NOT NULL,
    "sessionIndex" INTEGER,
    "startingTimestamp" TIMESTAMP(3),
    "finishedTimestamp" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "sadhanaId" INTEGER NOT NULL,
    "sadhanaDayId" TEXT NOT NULL,
    "notes" TEXT,
    "feeling" INTEGER NOT NULL,

    CONSTRAINT "SadhanaSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "main" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SadhanaParticipants" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerAccountId_key" ON "User"("providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "SadhanaUpdate_sadhanaId_dayIndex_key" ON "SadhanaUpdate"("sadhanaId", "dayIndex");

-- CreateIndex
CREATE UNIQUE INDEX "SadhanaDay_sadhanaId_dayIndex_key" ON "SadhanaDay"("sadhanaId", "dayIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_platform_key" ON "Social"("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "_SadhanaParticipants_AB_unique" ON "_SadhanaParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_SadhanaParticipants_B_index" ON "_SadhanaParticipants"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sadhana" ADD CONSTRAINT "Sadhana_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SadhanaUpdate" ADD CONSTRAINT "SadhanaUpdate_sadhanaId_fkey" FOREIGN KEY ("sadhanaId") REFERENCES "Sadhana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SadhanaDay" ADD CONSTRAINT "SadhanaDay_sadhanaId_fkey" FOREIGN KEY ("sadhanaId") REFERENCES "Sadhana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_sadhanaDayId_fkey" FOREIGN KEY ("sadhanaDayId") REFERENCES "SadhanaDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SadhanaSession" ADD CONSTRAINT "SadhanaSession_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SadhanaSession" ADD CONSTRAINT "SadhanaSession_sadhanaId_fkey" FOREIGN KEY ("sadhanaId") REFERENCES "Sadhana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SadhanaSession" ADD CONSTRAINT "SadhanaSession_sadhanaDayId_fkey" FOREIGN KEY ("sadhanaDayId") REFERENCES "SadhanaDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SadhanaParticipants" ADD CONSTRAINT "_SadhanaParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Sadhana"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SadhanaParticipants" ADD CONSTRAINT "_SadhanaParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
