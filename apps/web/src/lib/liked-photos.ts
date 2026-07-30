const STORAGE_KEY = 'wed-snap:liked-photos';

function readLikedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function isPhotoLiked(photoId: string): boolean {
  return readLikedIds().includes(photoId);
}

// Guarda a curtida por aparelho (não por usuário, já que não há login) —
// é o que impede a mesma pessoa de curtir a mesma foto de novo após um reload.
export function setPhotoLiked(photoId: string, liked: boolean) {
  const ids = new Set(readLikedIds());
  if (liked) {
    ids.add(photoId);
  } else {
    ids.delete(photoId);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}
