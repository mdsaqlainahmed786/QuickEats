/*
  Warnings:

  - You are about to drop the column `dishId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_dishId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "dishId",
DROP COLUMN "quantity";
