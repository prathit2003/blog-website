-- CreateTable
CREATE TABLE "bookmark" (
    "authorId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "bookmark_authorId_postId_key" ON "bookmark"("authorId", "postId");

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
