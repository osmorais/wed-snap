'use client';

import Image from 'next/image';
import type { Photo } from '@wed-snap/shared';
import { RelativeTime } from '@/components/relative-time/relative-time';
import { PhotoLightbox } from '@/components/photo-lightbox/photo-lightbox';
import { usePhotoLightbox } from '@/components/photo-lightbox/use-photo-lightbox';

export function PhotoFeed({ photos }: { photos: Photo[] }) {
  const { selected, open, close } = usePhotoLightbox();

  if (photos.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 py-16 text-center">
        <p className="font-heading text-xl italic text-foreground">O feed está quietinho</p>
        <p className="max-w-[26ch] text-sm text-muted-foreground">
          Assim que alguém publicar uma foto, ela aparece aqui primeiro.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-border">
        {photos.map((photo) => (
          <article
            key={photo.id}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
          >
            <header className="flex items-baseline justify-between px-4 py-3">
              <p className="font-hand text-3xl leading-none text-primary">{photo.guestName}</p>
              <RelativeTime date={photo.createdAt} className="text-xs text-muted-foreground" />
            </header>
            <button
              type="button"
              onClick={() => open(photo)}
              className="relative block aspect-square w-full"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.caption}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </button>
            {photo.caption && (
              <p className="px-4 py-3 text-sm text-foreground">
                <span className="font-semibold">{photo.guestName}</span> {photo.caption}
              </p>
            )}
          </article>
        ))}
      </div>

      <PhotoLightbox photo={selected} onClose={close} />
    </>
  );
}
