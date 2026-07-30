import Link from 'next/link';
import { Camera } from 'lucide-react';

// Sempre visível na galeria, para o convidado poder enviar uma foto a
// qualquer momento — requisito de UX explícito do fluxo sem login.
export function UploadFab() {
  return (
    <Link
      href="/upload"
      className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
      aria-label="Enviar foto"
    >
      <Camera className="h-6 w-6" />
    </Link>
  );
}
