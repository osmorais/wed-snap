import { prisma } from '../datasources/prisma.datasource';

export const photoRepository = {
  findAll() {
    return prisma.photo.findMany({ orderBy: { createdAt: 'desc' } });
  },

  create(data: { guestName: string; caption: string; imageUrl: string; challengeId?: string }) {
    return prisma.photo.create({ data });
  },
};
