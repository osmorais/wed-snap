import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mesma pílula de antes (duas opções lado a lado), só que fixa na tela em
// vez de dentro do header — assim continua visível depois de rolar a página.
export function ViewSwitcher({ active }: { active: 'gallery' | 'feed' }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2">
      <div className="flex gap-1 rounded-full border border-border bg-card/95 p-1 text-sm shadow-[0_8px_24px_-4px_rgba(43,33,29,0.25)] backdrop-blur-sm">
        <Link
          href="/gallery"
          className={cn(
            'rounded-full px-4 py-1.5 transition-colors',
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
            'rounded-full px-4 py-1.5 transition-colors',
            active === 'feed'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Feed
        </Link>
      </div>
    </div>
  );
}
