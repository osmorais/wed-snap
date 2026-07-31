import { NextResponse } from 'next/server';
import { createGuestAccount, isValidPin } from '@/lib/guest-account';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return NextResponse.json({ message: 'Nome é obrigatório.' }, { status: 400 });
    }
    if (!isValidPin(body?.pin)) {
      return NextResponse.json({ message: 'PIN deve ter 4 dígitos.' }, { status: 400 });
    }

    const result = await createGuestAccount(name, body.pin);
    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    return NextResponse.json({ name: result.name }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
