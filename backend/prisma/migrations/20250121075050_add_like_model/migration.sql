/*
  Warnings:

  - A unique constraint covering the columns `[authorId,postId]` on the table `like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "like_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "like_authorId_postId_key" ON "like"("authorId", "postId");
