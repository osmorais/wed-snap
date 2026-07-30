import { PhotoFeed } from '@/components/photo-feed/photo-feed';
import { UploadFab } from '@/components/upload-fab/upload-fab';
import { ViewTabs } from '@/components/view-tabs/view-tabs';
import { fetchPhotos } from '@/services/photo.service';

export default async function FeedPage() {
  const photos = await fetchPhotos();
  const newestFirst = [...photos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-border px-4 pt-6 pb-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            Ao vivo do casamento
          </p>
          <ViewTabs active="feed" />
        </div>
        <h1 className="mt-1 font-heading text-3xl font-semibold italic">Feed</h1>
      </header>
      <PhotoFeed photos={newestFirst} />
      <UploadFab />
    </main>
  );
}
