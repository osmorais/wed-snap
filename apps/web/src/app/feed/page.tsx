import { PhotoFeed } from '@/components/photo-feed/photo-feed';
import { UploadFab } from '@/components/upload-fab/upload-fab';
import { ViewSwitcher } from '@/components/view-switcher/view-switcher';
import { getPhotos } from '@/lib/photos';

// Sem isso o Next.js pré-renderiza a lista de fotos uma vez no build e
// nunca mais atualiza — o feed precisa refletir os uploads em tempo real.
export const dynamic = 'force-dynamic';

export default async function FeedPage() {
  const photos = await getPhotos();
  const newestFirst = [...photos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="flex flex-1 flex-col sm:mx-auto sm:w-full sm:max-w-xl">
      <header className="border-b border-border px-4 pt-6 pb-4">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          Ao vivo do casamento
        </p>
        <h1 className="mt-1 font-heading text-3xl font-semibold italic">Feed</h1>
      </header>
      <PhotoFeed photos={newestFirst} />
      <ViewSwitcher active="feed" />
      <UploadFab />
    </main>
  );
}
