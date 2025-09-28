import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const medicine = await prisma.medicine.findUnique({ where: { id } });

  if (!medicine) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(medicine);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const data = await req.json();

  const medicine = await prisma.medicine.update({
    where: { id },
    data,
  });

  return NextResponse.json(medicine);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  await prisma.medicine.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
