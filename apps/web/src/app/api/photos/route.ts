import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { PREVIEW_COMMENTS_LIMIT } from '@wed-snap/shared';
import { prisma } from '@/lib/prisma';
import { getSupabaseStorage, STORAGE_BUCKET } from '@/lib/supabase-storage';
import { isValidPin, verifyGuestCredentials } from '@/lib/guest-account';

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { comments: true } },
        comments: { orderBy: { createdAt: 'asc' }, take: PREVIEW_COMMENTS_LIMIT },
      },
    });
    return NextResponse.json(
      photos.map(({ _count, comments, ...photo }) => ({
        ...photo,
        commentCount: _count.comments,
        previewComments: comments,
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const guestName = formData.get('guestName');
    const pin = formData.get('pin');
    const caption = formData.get('caption');
    const challengeId = formData.get('challengeId');

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'Arquivo de foto é obrigatório.' }, { status: 400 });
    }
    if (typeof guestName !== 'string' || !guestName || typeof caption !== 'string' || !caption) {
      return NextResponse.json(
        { message: 'guestName e caption são obrigatórios.' },
        { status: 400 }
      );
    }
    if (!isValidPin(pin)) {
      return NextResponse.json({ message: 'PIN deve ter 4 dígitos.' }, { status: 400 });
    }

    const auth = await verifyGuestCredentials(guestName, pin);
    if (!auth.ok) {
      return NextResponse.json({ message: auth.message }, { status: auth.status });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${randomUUID()}-${file.name}`;
    const supabaseStorage = getSupabaseStorage();

    const { error } = await supabaseStorage.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, buffer, { contentType: file.type });

    if (error) {
      return NextResponse.json(
        { message: `Falha ao enviar foto para o storage: ${error.message}` },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabaseStorage.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);

    const photo = await prisma.photo.create({
      data: {
        guestName: auth.name,
        caption,
        imageUrl: publicUrlData.publicUrl,
        challengeId: typeof challengeId === 'string' && challengeId ? challengeId : undefined,
      },
    });

    return NextResponse.json({ ...photo, commentCount: 0, previewComments: [] }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
