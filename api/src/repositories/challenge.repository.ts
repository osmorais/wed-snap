import { prisma } from '../datasources/prisma.datasource';

export const challengeRepository = {
  findAll() {
    return prisma.challenge.findMany();
  },
};
