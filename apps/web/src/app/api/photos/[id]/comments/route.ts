import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isValidPin, verifyGuestCredentials } from '@/lib/guest-account';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const comments = await prisma.comment.findMany({
      where: { photoId: id },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(comments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const guestName = typeof body?.guestName === 'string' ? body.guestName.trim() : '';
    const text = typeof body?.text === 'string' ? body.text.trim() : '';

    if (!guestName || !text) {
      return NextResponse.json(
        { message: 'guestName e text são obrigatórios.' },
        { status: 400 }
      );
    }
    if (!isValidPin(body?.pin)) {
      return NextResponse.json({ message: 'PIN deve ter 4 dígitos.' }, { status: 400 });
    }

    const auth = await verifyGuestCredentials(guestName, body.pin);
    if (!auth.ok) {
      return NextResponse.json({ message: auth.message }, { status: auth.status });
    }

    const comment = await prisma.comment.create({
      data: { photoId: id, guestName: auth.name, text },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
