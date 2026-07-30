import { PhotoGrid } from '@/components/photo-grid/photo-grid';
import { UploadFab } from '@/components/upload-fab/upload-fab';
import { fetchPhotos } from '@/services/photo.service';

export default async function GalleryPage() {
  const photos = await fetchPhotos();

  return (
    <main className="flex flex-1 flex-col">
      <h1 className="px-4 py-4 text-xl font-semibold">Galeria</h1>
      <PhotoGrid photos={photos} />
      <UploadFab />
    </main>
  );
}
