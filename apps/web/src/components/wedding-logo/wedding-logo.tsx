'use client';

import { usePathname } from 'next/navigation';

// Na landing ("/") e no login ("/login") a logo aparece grande e
// centralizada (WeddingHero), então a versão pequena e fixa do topo fica
// escondida nessas duas telas para não duplicar a marca.
export function WeddingLogo() {
  const pathname = usePathname();
  if (pathname === '/' || pathname === '/login') return null;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-0.5 px-4 py-2.5">
        <p className="font-heading text-lg leading-none italic">
          Larissa <span className="text-primary not-italic">&amp;</span> Osmar
        </p>
        <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
          15.08.26
        </p>
      </div>
    </header>
  );
}
