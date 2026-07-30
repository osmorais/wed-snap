import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">WedSnap</h1>
        <p className="text-muted-foreground max-w-sm">
          Ajude a registrar os melhores momentos do casamento. Envie fotos direto do seu
          celular e veja tudo o que os outros convidados capturaram.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button size="lg" render={<Link href="/upload" />} nativeButton={false}>
          Enviar foto
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/gallery" />} nativeButton={false}>
          Ver galeria
        </Button>
      </div>
    </main>
  );
}
