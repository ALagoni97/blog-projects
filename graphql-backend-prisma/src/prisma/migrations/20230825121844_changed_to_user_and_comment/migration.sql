/*
  Warnings:

  - You are about to drop the column `receiverId` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_post_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "receiverId";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
