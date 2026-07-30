'use client';

import { useSyncExternalStore } from 'react';
import { PREVIEW_COMMENTS_LIMIT, type Comment } from '@wed-snap/shared';
import { commentsStore, commentCountStore } from './comments-store';

// Só leitura — usado no card do feed, sem disparar fetch. Reage ao store
// compartilhado quando o lightbox busca ou adiciona um comentário.
export function usePreviewComments(photoId: string, initialCount: number, initialComments: Comment[]) {
  const count = useSyncExternalStore(
    (listener) => commentCountStore.subscribe(photoId, listener),
    () => commentCountStore.getSnapshot(photoId, initialCount),
    () => initialCount
  );
  const comments = useSyncExternalStore(
    (listener) => commentsStore.subscribe(photoId, listener),
    () => commentsStore.getSnapshot(photoId, initialComments),
    () => initialComments
  );

  return { count, previewComments: comments.slice(0, PREVIEW_COMMENTS_LIMIT) };
}
