import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AuthGate } from '@/components/auth/auth-gate';
import { WeddingHero } from '@/components/wedding-logo/wedding-hero';

// Sem isso, o Next.js pré-renderiza a landing como estática e o CDN da
// Hostinger cacheia o HTML por até 1 ano — se um deploy seguinte gerar um
// hash de CSS/JS novo, a página cacheada fica presa referenciando arquivos
// que não existem mais (404), quebrando a estilização inteira.
export const dynamic = 'force-dynamic';

export default function LandingPage() {
  return (
    <>
      <AuthGate />
      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16 text-center">
        <WeddingHero />
        <div className="space-y-3">
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
    </>
  );
}
