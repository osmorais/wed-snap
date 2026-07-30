import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabaseStorage, STORAGE_BUCKET } from '@/lib/supabase-storage';

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(photos);
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

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${randomUUID()}-${file.name}`;

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
        guestName,
        caption,
        imageUrl: publicUrlData.publicUrl,
        challengeId: typeof challengeId === 'string' && challengeId ? challengeId : undefined,
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
