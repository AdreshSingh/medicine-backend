//! for local developement
// import { PrismaClient, Prisma } from "../app/generated/prisma";

//! for vercel deployment
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const medicines = [
    {
      name: "Aceclofenac",
      brand: "Hifenac",
      tablets: 10,
      pricePerTab: 2.8,
      pricePerStrip: 28,
    },
    {
      name: "Diclofenac",
      brand: "Voveran",
      tablets: 10,
      pricePerTab: 1.8,
      pricePerStrip: 18,
    },
    {
      name: "Ibuprofen",
      brand: "Brufen",
      tablets: 10,
      pricePerTab: 2.5,
      pricePerStrip: 25,
    },
    {
      name: "Naproxen",
      brand: "Naprosyn",
      tablets: 10,
      pricePerTab: 4,
      pricePerStrip: 40,
    },
    {
      name: "Mefenamic Acid",
      brand: "Meftal",
      tablets: 10,
      pricePerTab: 2.2,
      pricePerStrip: 22,
    },
    {
      name: "Ketorolac",
      brand: "Ketorol",
      tablets: 10,
      pricePerTab: 2.8,
      pricePerStrip: 28,
    },
    {
      name: "Piroxicam",
      brand: "Dolonex",
      tablets: 10,
      pricePerTab: 3.2,
      pricePerStrip: 32,
    },
    {
      name: "Indomethacin",
      brand: "Indocap",
      tablets: 10,
      pricePerTab: 3,
      pricePerStrip: 30,
    },
    {
      name: "Etodolac",
      brand: "Etova",
      tablets: 10,
      pricePerTab: 3.7,
      pricePerStrip: 37,
    },
    {
      name: "Flurbiprofen",
      brand: "Froben",
      tablets: 10,
      pricePerTab: 3.5,
      pricePerStrip: 35,
    },
    // ...continue all 50 records from PDF
  ];

  for (const med of medicines) {
    await prisma.medicine.create({
      data: med,
    });
  }
}

main()
  .then(() => console.log("✅ Medicines seeded successfully!"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
