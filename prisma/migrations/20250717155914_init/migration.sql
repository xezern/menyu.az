/*
  Warnings:

  - You are about to drop the column `title_az` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title_en` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title_ru` on the `Product` table. All the data in the column will be lost.
  - Added the required column `name_az` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "title_az",
DROP COLUMN "title_en",
DROP COLUMN "title_ru",
ADD COLUMN     "name_az" TEXT NOT NULL,
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_ru" TEXT;
