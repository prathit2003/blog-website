/*
  Warnings:

  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bio` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_postId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" TEXT NOT NULL;

-- DropTable
DROP TABLE "like";

-- CreateTable
CREATE TABLE "Like" (
    "authorId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Subscription" (
    "username" TEXT NOT NULL,
    "profilePicture" TEXT,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_authorId_postId_key" ON "Like"("authorId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_username_key" ON "Subscription"("username");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
