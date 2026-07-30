import type { Comment } from './comment';

export interface Photo {
  id: string;
  guestName: string;
  caption: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  // Só os 5 primeiros comentários (cronológicos) — usado pra prévia embaixo
  // da legenda no feed, sem precisar buscar a lista inteira de cada foto.
  previewComments: Comment[];
  challengeId: string | null;
  createdAt: string;
}

export interface CreatePhotoInput {
  guestName: string;
  caption: string;
  imageUrl: string;
  challengeId?: string;
}
