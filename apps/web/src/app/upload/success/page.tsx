'use client';

import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUploadFlow } from '../upload-flow-context';

// Sem guard baseado em `photo`/`guestName`: o reset do fluxo só acontece
// quando o convidado sai desta tela (ver galeria ou enviar outra foto),
// então não corre o risco de disparar o redirect da página de legenda.
export default function UploadSuccessPage() {
  const router = useRouter();
  const { guestName, reset } = useUploadFlow();

  function goToGallery() {
    reset();
    router.push('/gallery');
  }

  function sendAnother() {
    reset();
    router.push('/upload');
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <CheckCircle2 className="h-16 w-16 text-primary" />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Foto publicada!</h1>
        <p className="text-muted-foreground max-w-xs text-sm">
          {guestName ? `Obrigado, ${guestName}! ` : ''}
          Sua foto já está na galeria do casamento.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button size="lg" onClick={goToGallery}>
          Ver galeria
        </Button>
        <Button size="lg" variant="outline" onClick={sendAnother}>
          Enviar outra foto
        </Button>
      </div>
    </main>
  );
}
