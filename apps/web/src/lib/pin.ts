import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;

// scrypt do node:crypto em vez de bcrypt — evita adicionar uma dependência
// nova só pra isso; suficiente pra um PIN de 4 dígitos num app de baixo risco.
export function hashPin(pin: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(pin, salt, KEY_LENGTH).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPin(pin: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;

  const hashBuffer = Buffer.from(hash, 'hex');
  const suppliedBuffer = scryptSync(pin, salt, KEY_LENGTH);
  return hashBuffer.length === suppliedBuffer.length && timingSafeEqual(hashBuffer, suppliedBuffer);
}
