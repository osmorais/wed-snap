import Link from 'next/link';
import { Camera } from 'lucide-react';

// Sempre visível na galeria, para o convidado poder enviar uma foto a
// qualquer momento — requisito de UX explícito do fluxo sem login.
export function UploadFab() {
  return (
    <Link
      href="/upload"
      className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(217,122,70,0.3),0_8px_24px_-4px_rgba(217,122,70,0.5)] transition-transform active:scale-95"
      aria-label="Enviar foto"
    >
      <Camera className="h-6 w-6" />
    </Link>
  );
}
