'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { isPhotoLiked, setPhotoLiked } from '@/lib/liked-photos';
import { createKeyedStore } from '@/lib/keyed-store';

// Nenhum listener depende de qual foto mudou — todo hook montado reavalia
// isPhotoLiked(photoId) quando qualquer curtida muda em qualquer lugar da
// página, o que é barato o bastante pra não precisar de granularidade.
const likedListeners = new Set<() => void>();

function subscribeLiked(listener: () => void) {
  likedListeners.add(listener);
  return () => likedListeners.delete(listener);
}

function notifyLiked() {
  likedListeners.forEach((listener) => listener());
}

function getServerLikedSnapshot() {
  return false;
}

// Contador por foto — compartilhado entre feed, galeria e lightbox, pra
// curtir num lugar refletir nos outros sem precisar recarregar a página.
const countStore = createKeyedStore<number>();

export function useLike(photoId: string, initialCount: number) {
  // useSyncExternalStore em vez de useEffect+setState: no servidor não
  // existe localStorage, então o snapshot do servidor é sempre "não
  // curtido" e só passa a refletir o localStorage real depois da
  // hidratação — mesma técnica usada em RelativeTime, evita mismatch.
  const liked = useSyncExternalStore(
    subscribeLiked,
    () => isPhotoLiked(photoId),
    getServerLikedSnapshot
  );
  const count = useSyncExternalStore(
    (listener) => countStore.subscribe(photoId, listener),
    () => countStore.getSnapshot(photoId, initialCount),
    () => initialCount
  );

  const apply = useCallback(
    async (nextLiked: boolean) => {
      setPhotoLiked(photoId, nextLiked);
      notifyLiked();
      countStore.setValue(photoId, (current) => current + (nextLiked ? 1 : -1));

      try {
        const res = await fetch(`/api/photos/${photoId}/like`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ liked: nextLiked }),
        });
        if (!res.ok) throw new Error('Falha ao curtir foto');
      } catch (err) {
        console.error(err);
        setPhotoLiked(photoId, !nextLiked);
        notifyLiked();
        countStore.setValue(photoId, (current) => current + (nextLiked ? -1 : 1));
      }
    },
    [photoId]
  );

  // Usado pelo duplo clique na foto — só adiciona a curtida (nunca tira),
  // igual ao double-tap do Instagram; tirar continua sendo só pelo coração.
  const like = useCallback(() => {
    if (!liked) apply(true);
  }, [liked, apply]);

  const toggle = useCallback(() => apply(!liked), [liked, apply]);

  return { liked, count, like, toggle };
}
