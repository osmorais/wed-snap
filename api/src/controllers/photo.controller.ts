import { Router } from 'express';
import multer from 'multer';
import { photoService } from '../services/photo.service';

const upload = multer({ storage: multer.memoryStorage() });

export const photoController = Router();

// GET /photos — feed cronológico usado pela galeria.
photoController.get('/', async (_req, res, next) => {
  try {
    const photos = await photoService.list();
    res.json(photos);
  } catch (err) {
    next(err);
  }
});

// POST /photos — último passo do fluxo de upload (multipart: file + guestName + caption).
photoController.post('/', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Arquivo de foto é obrigatório.' });
    }

    const { guestName, caption, challengeId } = req.body;
    if (!guestName || !caption) {
      return res.status(400).json({ message: 'guestName e caption são obrigatórios.' });
    }

    const photo = await photoService.upload(req.file, { guestName, caption, challengeId });
    res.status(201).json(photo);
  } catch (err) {
    next(err);
  }
});
