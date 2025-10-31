/*
  Warnings:

  - You are about to drop the column `attributes` on the `Product` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "attributes",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL;
