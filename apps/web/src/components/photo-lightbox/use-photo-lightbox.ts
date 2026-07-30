'use client';

import { useEffect, useState } from 'react';
import type { Photo } from '@wed-snap/shared';

export function usePhotoLightbox() {
  const [selected, setSelected] = useState<Photo | null>(null);

  useEffect(() => {
    if (!selected) return;

    document.body.style.overflow = 'hidden';
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
    }
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [selected]);

  return { selected, open: setSelected, close: () => setSelected(null) };
}
