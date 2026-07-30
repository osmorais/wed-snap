import { randomUUID } from 'node:crypto';
import { photoRepository } from '../repositories/photo.repository';
import { STORAGE_BUCKET, supabaseStorage } from '../datasources/storage.datasource';
import type { CreatePhotoRequest } from '../models/photo-types';

export const photoService = {
  async list() {
    return photoRepository.findAll();
  },

  async upload(file: Express.Multer.File, data: CreatePhotoRequest) {
    const fileName = `${randomUUID()}-${file.originalname}`;

    const { error } = await supabaseStorage.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) {
      throw new Error(`Falha ao enviar foto para o storage: ${error.message}`);
    }

    const { data: publicUrlData } = supabaseStorage.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return photoRepository.create({
      guestName: data.guestName,
      caption: data.caption,
      imageUrl: publicUrlData.publicUrl,
      challengeId: data.challengeId,
    });
  },
};
