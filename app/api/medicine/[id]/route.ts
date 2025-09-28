import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export async function GET(req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  const medicine = await prisma.medicine.findUnique({ where: { id } });

  if (!medicine) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(medicine);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  const data = await req.json();

  const medicine = await prisma.medicine.update({
    where: { id },
    data,
  });

  return NextResponse.json(medicine);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const id = Number(params.id);

  await prisma.medicine.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
