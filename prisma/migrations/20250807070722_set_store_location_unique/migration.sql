/*
  Warnings:

  - A unique constraint covering the columns `[store_location]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Store_store_location_key" ON "public"."Store"("store_location");
