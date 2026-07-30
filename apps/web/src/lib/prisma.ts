import { PrismaClient } from '@prisma/client';

// Singleton do cliente Prisma guardado no globalThis: em dev, o Next.js
// recarrega módulos a cada mudança e criaria um PrismaClient novo (e uma
// conexão nova) a cada hot reload sem isso, esgotando o pool do Postgres.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
