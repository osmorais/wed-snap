import type { Photo } from '@wed-snap/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function fetchPhotos(): Promise<Photo[]> {
  const res = await fetch(`${API_URL}/photos`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Não foi possível carregar a galeria.');
  }
  return res.json();
}

export async function uploadPhoto(params: {
  file: File;
  guestName: string;
  caption: string;
}): Promise<Photo> {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('guestName', params.guestName);
  formData.append('caption', params.caption);

  const res = await fetch(`${API_URL}/photos`, { method: 'POST', body: formData });
  if (!res.ok) {
    throw new Error('Não foi possível publicar a foto.');
  }
  return res.json();
}
