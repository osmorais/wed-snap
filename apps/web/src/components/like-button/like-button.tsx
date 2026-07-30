'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LikeButton({
  liked,
  count,
  onToggle,
  className,
}: {
  liked: boolean;
  count: number;
  onToggle: (event: React.MouseEvent) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={liked}
      aria-label={liked ? 'Remover curtida' : 'Curtir foto'}
      className={cn('flex items-center gap-1', className)}
    >
      <Heart className={cn('h-5 w-5 transition-colors', liked && 'fill-primary text-primary')} />
      {count > 0 && <span className="text-xs tabular-nums">{count}</span>}
    </button>
  );
}
