import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// export const dynamic = "force-dynamic"; //? not needed anymore as we removed export static.

// GET /api/medicine - List all medicines
export async function GET() {
  const medicines = await prisma.medicine.findMany();
  return NextResponse.json(medicines);
}

// POST /api/medicine - Create a new medicine
export async function POST(req: Request) {
  const data = await req.json();
  const medicine = await prisma.medicine.create({ data });
  return NextResponse.json(medicine, { status: 201 });
}
