-- CreateTable
CREATE TABLE "public"."Store" (
    "id" TEXT NOT NULL,
    "store_location" TEXT NOT NULL,
    "tax_percentage" TEXT NOT NULL,
    "premium_items" TEXT[],

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);
