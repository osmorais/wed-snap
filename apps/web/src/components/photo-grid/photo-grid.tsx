import Image from 'next/image';
import type { Photo } from '@wed-snap/shared';

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) {
    return (
      <p className="p-8 text-center text-muted-foreground">
        Ainda não há fotos. Seja o primeiro a enviar!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-1 p-1 sm:grid-cols-3">
      {photos.map((photo) => (
        <figure key={photo.id} className="relative aspect-square overflow-hidden">
          <Image
            src={photo.imageUrl}
            alt={photo.caption}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover"
          />
        </figure>
      ))}
    </div>
  );
}
