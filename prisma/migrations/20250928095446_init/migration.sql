-- CreateTable
CREATE TABLE "public"."Medicine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "tablets" INTEGER NOT NULL,
    "pricePerTab" DOUBLE PRECISION NOT NULL,
    "pricePerStrip" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);
