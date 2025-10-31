/*
  Warnings:

  - You are about to drop the column `description` on the `RepairRequest` table. All the data in the column will be lost.
  - You are about to drop the column `deviceModel` on the `RepairRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cause` to the `RepairRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `RepairRequest` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."RepairRequest" DROP COLUMN "description",
DROP COLUMN "deviceModel",
ADD COLUMN     "cause" TEXT NOT NULL,
ADD COLUMN     "comment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "email" TEXT,
ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
