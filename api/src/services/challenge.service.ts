import { challengeRepository } from '../repositories/challenge.repository';

export const challengeService = {
  async list() {
    return challengeRepository.findAll();
  },
};
