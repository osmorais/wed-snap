'use client';

import { useEffect, useSyncExternalStore } from 'react';
import type { Comment } from '@wed-snap/shared';
import { getGuestSession } from '@/lib/guest-session';
import { commentsStore, commentCountStore } from './comments-store';

export function useComments(photoId: string, initialCount: number, initialComments: Comment[]) {
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

  // Busca a lista completa ao abrir o lightbox — o store já começa com os 5
  // primeiros (vindos do servidor), isso substitui pela lista real completa.
  useEffect(() => {
    let cancelled = false;

    fetch(`/api/photos/${photoId}/comments`)
      .then((res) => res.json())
      .then((data: Comment[]) => {
        if (cancelled) return;
        commentsStore.setValue(photoId, data);
        commentCountStore.setValue(photoId, data.length);
      })
      .catch((err) => console.error(err));

    return () => {
      cancelled = true;
    };
  }, [photoId]);

  async function addComment(text: string) {
    const session = getGuestSession();
    if (!session) throw new Error('É preciso entrar antes de comentar.');

    const res = await fetch(`/api/photos/${photoId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestName: session.name, pin: session.pin, text }),
    });
    if (!res.ok) throw new Error('Falha ao comentar');

    const comment: Comment = await res.json();
    commentsStore.setValue(photoId, (current) => [...current, comment]);
    commentCountStore.setValue(photoId, (current) => current + 1);
  }

  return { comments, count, addComment };
}
