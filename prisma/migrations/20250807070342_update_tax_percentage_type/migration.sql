/*
  Warnings:

  - Changed the type of `tax_percentage` on the `Store` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Store" DROP COLUMN "tax_percentage",
ADD COLUMN     "tax_percentage" INTEGER NOT NULL;
