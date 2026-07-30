import type { Photo } from '@wed-snap/shared';

export async function uploadPhoto(params: {
  file: File;
  guestName: string;
  caption: string;
}): Promise<Photo> {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('guestName', params.guestName);
  formData.append('caption', params.caption);

  const res = await fetch('/api/photos', { method: 'POST', body: formData });
  if (!res.ok) {
    throw new Error('Não foi possível publicar a foto.');
  }
  return res.json();
}
