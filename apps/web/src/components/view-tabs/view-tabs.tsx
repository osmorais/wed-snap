import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ViewTabs({ active }: { active: 'gallery' | 'feed' }) {
  return (
    <div className="flex gap-1 rounded-full bg-muted p-1 text-sm">
      <Link
        href="/gallery"
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          active === 'gallery'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Galeria
      </Link>
      <Link
        href="/feed"
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          active === 'feed'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Feed
      </Link>
    </div>
  );
}
