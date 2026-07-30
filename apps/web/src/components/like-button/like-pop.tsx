'use client';

import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const POP_DURATION_MS = 550;

// Compartilhado entre Feed e Lightbox: dispara a animação de coração que
// aparece e some no duplo clique, independente do coração já estar curtido
// ou não (mesmo comportamento do double-tap do Instagram).
export function useLikePop() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => clearTimeout(timeoutRef.current ?? undefined), []);

  function pop() {
    setVisible(true);
    clearTimeout(timeoutRef.current ?? undefined);
    timeoutRef.current = setTimeout(() => setVisible(false), POP_DURATION_MS);
  }

  return { visible, pop };
}

export function LikePop({ visible, className }: { visible: boolean; className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out',
        visible ? 'scale-100 opacity-90' : 'scale-75 opacity-0',
        className
      )}
    >
      <Heart
        className="h-20 w-20 fill-white text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
        aria-hidden="true"
      />
    </div>
  );
}
