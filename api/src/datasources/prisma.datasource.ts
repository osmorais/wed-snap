import { PrismaClient } from '@prisma/client';

// Singleton do cliente Prisma — reutilizado em toda a aplicação para evitar
// esgotar o pool de conexões do Postgres (mesmo padrão do postgres.datasource.ts
// do dungeon-companion-api, adaptado para Prisma).
export const prisma = new PrismaClient();
