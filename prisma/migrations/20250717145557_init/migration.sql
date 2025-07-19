/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isCheaps` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isTopSelling` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the `Slider` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name_az` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_ru` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_az` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_az` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_az` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Slider" DROP CONSTRAINT "Slider_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Slider" DROP CONSTRAINT "Slider_subcategoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "name_az" TEXT NOT NULL,
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "discount",
DROP COLUMN "imageUrl",
DROP COLUMN "isCheaps",
DROP COLUMN "isTopSelling",
DROP COLUMN "name",
DROP COLUMN "sizes",
ADD COLUMN     "description_az" TEXT NOT NULL,
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_ru" TEXT,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "ingridients" TEXT[],
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "title_az" TEXT NOT NULL,
ADD COLUMN     "title_en" TEXT,
ADD COLUMN     "title_ru" TEXT;

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "name",
ADD COLUMN     "name_az" TEXT NOT NULL,
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_ru" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- DropTable
DROP TABLE "Slider";
