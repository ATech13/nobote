/*
  Warnings:

  - Added the required column `clerkId` to the `AuthUser` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuthUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clerkId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "rang" TEXT NOT NULL DEFAULT 'D',
    "isCertified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'light'
);
INSERT INTO "new_AuthUser" ("createdAt", "email", "fullName", "id", "isActive", "isCertified", "rang", "theme", "updatedAt", "username") SELECT "createdAt", "email", "fullName", "id", "isActive", "isCertified", "rang", "theme", "updatedAt", "username" FROM "AuthUser";
DROP TABLE "AuthUser";
ALTER TABLE "new_AuthUser" RENAME TO "AuthUser";
CREATE UNIQUE INDEX "AuthUser_clerkId_key" ON "AuthUser"("clerkId");
CREATE UNIQUE INDEX "AuthUser_username_key" ON "AuthUser"("username");
CREATE UNIQUE INDEX "AuthUser_email_key" ON "AuthUser"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
