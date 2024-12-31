-- AlterTable
ALTER TABLE "_PostTags" ADD CONSTRAINT "_PostTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PostTags_AB_unique";
