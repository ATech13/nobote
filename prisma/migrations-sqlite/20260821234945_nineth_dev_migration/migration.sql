-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "voterIp" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voteId" TEXT,
    CONSTRAINT "Comment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("createdAt", "description", "eventId", "id", "voteId", "voterIp") SELECT "createdAt", "description", "eventId", "id", "voteId", "voterIp" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE INDEX "Comment_eventId_idx" ON "Comment"("eventId");
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT,
    "coverImageId" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DISABLED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "AuthUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("coverImage", "coverImageId", "createdAt", "description", "endDate", "id", "ownerId", "startDate", "status", "title", "updatedAt") SELECT "coverImage", "coverImageId", "createdAt", "description", "endDate", "id", "ownerId", "startDate", "status", "title", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE INDEX "Event_status_idx" ON "Event"("status");
CREATE INDEX "Event_startDate_endDate_idx" ON "Event"("startDate", "endDate");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "avatarId" TEXT,
    "country" TEXT,
    "city" TEXT,
    "age" INTEGER,
    "eventId" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CANDIDATE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("age", "avatar", "avatarId", "bio", "city", "country", "createdAt", "email", "eventId", "fullName", "id", "isBlocked", "isVerified", "password", "role", "updatedAt", "username") SELECT "age", "avatar", "avatarId", "bio", "city", "country", "createdAt", "email", "eventId", "fullName", "id", "isBlocked", "isVerified", "password", "role", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_eventId_idx" ON "User"("eventId");
CREATE TABLE "new_Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "voterIp" TEXT,
    "deviceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vote_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Vote_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vote" ("candidateId", "createdAt", "deviceId", "eventId", "id", "voterIp") SELECT "candidateId", "createdAt", "deviceId", "eventId", "id", "voterIp" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
CREATE INDEX "Vote_eventId_idx" ON "Vote"("eventId");
CREATE INDEX "Vote_candidateId_idx" ON "Vote"("candidateId");
CREATE UNIQUE INDEX "Vote_eventId_candidateId_voterIp_key" ON "Vote"("eventId", "candidateId", "voterIp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
