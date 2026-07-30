import { PhotoGrid } from '@/components/photo-grid/photo-grid';
import { UploadFab } from '@/components/upload-fab/upload-fab';
import { ViewSwitcher } from '@/components/view-switcher/view-switcher';
import { getPhotos } from '@/lib/photos';

// Sem isso o Next.js pré-renderiza a lista de fotos uma vez no build e
// nunca mais atualiza — a galeria precisa refletir os uploads em tempo real.
export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const photos = await getPhotos();
  const oldestFirst = [...photos].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <main className="flex flex-1 flex-col sm:mx-auto sm:w-full sm:max-w-3xl">
      <header className="border-b border-border px-4 pt-6 pb-4">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          Ao vivo do casamento
        </p>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <h1 className="font-heading text-3xl font-semibold italic">Galeria</h1>
          <span className="text-xs text-muted-foreground">
            {photos.length === 0
              ? 'nenhuma foto ainda'
              : photos.length === 1
                ? '1 foto'
                : `${photos.length} fotos`}
          </span>
        </div>
      </header>
      <PhotoGrid photos={oldestFirst} />
      <ViewSwitcher active="gallery" />
      <UploadFab />
    </main>
  );
}
