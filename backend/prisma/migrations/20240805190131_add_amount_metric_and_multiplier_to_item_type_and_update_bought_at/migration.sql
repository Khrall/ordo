/*
  Warnings:

  - You are about to drop the column `boughtTime` on the `GroceryListItem` table. All the data in the column will be lost.
  - The `amount` column on the `GroceryListItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `boughtAt` to the `GroceryListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroceryListItem" RENAME COLUMN "boughtTime" TO "boughtAt";

ALTER TABLE "GroceryListItem"
DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "ItemType" ADD COLUMN     "amountMetric" TEXT NOT NULL DEFAULT 'stk',
ADD COLUMN     "amountMultiplier" INTEGER NOT NULL DEFAULT 1;
