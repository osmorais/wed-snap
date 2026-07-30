'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import { isPhotoLiked, setPhotoLiked } from '@/lib/liked-photos';

// Nenhum listener depende de qual foto mudou — todo hook montado reavalia
// isPhotoLiked(photoId) quando qualquer curtida muda em qualquer lugar da
// página, o que é barato o bastante pra não precisar de granularidade.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

function getServerSnapshot() {
  return false;
}

export function useLike(photoId: string, initialCount: number) {
  // useSyncExternalStore em vez de useEffect+setState: no servidor não
  // existe localStorage, então o snapshot do servidor é sempre "não
  // curtido" e só passa a refletir o localStorage real depois da
  // hidratação — mesma técnica usada em RelativeTime, evita mismatch.
  const liked = useSyncExternalStore(subscribe, () => isPhotoLiked(photoId), getServerSnapshot);
  const [count, setCount] = useState(initialCount);

  const apply = useCallback(
    async (nextLiked: boolean) => {
      setPhotoLiked(photoId, nextLiked);
      notify();
      setCount((current) => current + (nextLiked ? 1 : -1));

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
        notify();
        setCount((current) => current + (nextLiked ? -1 : 1));
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
