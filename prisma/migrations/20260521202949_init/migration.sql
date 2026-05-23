/*
  Warnings:

  - You are about to drop the `Participation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "eventId" TEXT;

-- DropTable
DROP TABLE "Participation";

-- CreateIndex
CREATE INDEX "User_eventId_idx" ON "User"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "User_eventId_key" ON "User"("eventId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
