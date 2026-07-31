import { prisma } from '@/lib/prisma';
import { hashPin, verifyPin } from '@/lib/pin';

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

export function isValidPin(pin: unknown): pin is string {
  return typeof pin === 'string' && /^\d{4}$/.test(pin);
}

export async function createGuestAccount(name: string, pin: string) {
  const trimmedName = name.trim();
  const nameLower = normalizeName(trimmedName);

  const existing = await prisma.guestAccount.findUnique({ where: { nameLower } });
  if (existing) {
    return {
      ok: false as const,
      status: 409,
      message: 'Esse nome já tem um PIN cadastrado. Toque em "Entrar" e use o PIN certo.',
    };
  }

  const account = await prisma.guestAccount.create({
    data: { name: trimmedName, nameLower, pinHash: hashPin(pin) },
  });
  return { ok: true as const, name: account.name };
}

// Usado tanto pelo login explícito quanto pelas rotas de criar comentário e
// foto — cada gravação reverifica nome+pin, não existe sessão/token no servidor.
export async function verifyGuestCredentials(name: string, pin: string) {
  const account = await prisma.guestAccount.findUnique({
    where: { nameLower: normalizeName(name) },
  });
  if (!account) {
    return {
      ok: false as const,
      status: 404,
      message: 'Nome não encontrado. Crie um acesso primeiro.',
    };
  }
  if (!verifyPin(pin, account.pinHash)) {
    return { ok: false as const, status: 401, message: 'PIN incorreto.' };
  }
  return { ok: true as const, name: account.name };
}
