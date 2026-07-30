import type { Photo } from '@wed-snap/shared';
import { prisma } from '@/lib/prisma';

// Chamado direto pelos Server Components da galeria/feed — como front e
// back agora são o mesmo app, não faz sentido dar um fetch HTTP na própria
// API; a rota /api/photos continua existindo só para o upload no cliente.
export async function getPhotos(): Promise<Photo[]> {
  const photos = await prisma.photo.findMany({ orderBy: { createdAt: 'desc' } });
  return photos.map((photo) => ({ ...photo, createdAt: photo.createdAt.toISOString() }));
}
