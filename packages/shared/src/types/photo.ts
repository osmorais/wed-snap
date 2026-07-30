export interface Photo {
  id: string;
  guestName: string;
  caption: string;
  imageUrl: string;
  likeCount: number;
  challengeId: string | null;
  createdAt: string;
}

export interface CreatePhotoInput {
  guestName: string;
  caption: string;
  imageUrl: string;
  challengeId?: string;
}
