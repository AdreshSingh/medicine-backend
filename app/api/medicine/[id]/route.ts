import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ? for nodejs runtime
export const runtime = 'nodejs';

// GET /api/medicine/[id] - Get a single medicine by ID
export async function GET(
  req: Request, 
  { params }: {params:Promise<{ id: string }>}
) {
  const id = Number((await params).id)
  
  const medicine = await prisma.medicine.findUnique({ where: { id } });
  if (!medicine) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(medicine);
}

// PUT /api/medicine/[id] - Update a medicine by ID
export async function PUT(
  req: Request, 
  { params }: {params:Promise<{ id: string }>}
) {
  const id = Number((await params).id)
  const data = await req.json();
  const medicine = await prisma.medicine.update({ where: { id }, data });
  return NextResponse.json(medicine);
}

// DELETE /api/medicine/[id] - Delete a medicine by ID
export async function DELETE(
  req: Request, 
  { params }: {params:Promise<{ id: string }>}
) {
  const id = Number((await params).id)
  await prisma.medicine.delete({ where: { id } });
  return NextResponse.json({ success: true });
}