export interface Comment {
  id: string;
  photoId: string;
  guestName: string;
  text: string;
  createdAt: string;
}

export interface CreateCommentInput {
  guestName: string;
  text: string;
}
