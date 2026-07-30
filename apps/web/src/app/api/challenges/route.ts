import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const challenges = await prisma.challenge.findMany();
    return NextResponse.json(challenges);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
