import cors from 'cors';
import express from 'express';
import { challengeController, photoController } from './controllers';

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.WEB_ORIGIN ?? '*' }));
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/photos', photoController);
  app.use('/challenges', challengeController);

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  });

  return app;
}
