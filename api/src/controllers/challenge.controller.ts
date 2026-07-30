import { Router } from 'express';
import { challengeService } from '../services/challenge.service';

export const challengeController = Router();

challengeController.get('/', async (_req, res, next) => {
  try {
    const challenges = await challengeService.list();
    res.json(challenges);
  } catch (err) {
    next(err);
  }
});
