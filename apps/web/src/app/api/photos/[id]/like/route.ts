import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = await request.json();
    if (typeof body?.liked !== 'boolean') {
      return NextResponse.json({ message: 'liked deve ser boolean.' }, { status: 400 });
    }

    const photo = await prisma.photo.update({
      where: { id },
      data: { likeCount: { increment: body.liked ? 1 : -1 } },
    });

    return NextResponse.json(photo);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
