'use client';

import Image from 'next/image';
import type { Photo } from '@wed-snap/shared';
import { RelativeTime } from '@/components/relative-time/relative-time';
import { LikeButton } from '@/components/like-button/like-button';
import { useLike } from '@/components/like-button/use-like';
import { PhotoLightbox } from '@/components/photo-lightbox/photo-lightbox';
import { usePhotoLightbox } from '@/components/photo-lightbox/use-photo-lightbox';

function PhotoGridItem({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  const { liked, count, toggle } = useLike(photo.id, photo.likeCount);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-md ring-1 ring-primary/15 shadow-[0_1px_2px_rgba(43,33,29,0.08),0_8px_16px_-6px_rgba(217,122,70,0.22)] motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-500">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ver foto de ${photo.guestName}`}
        className="absolute inset-0 text-left"
      >
        <Image
          src={photo.imageUrl}
          alt={photo.caption}
          fill
          sizes="(max-width: 640px) 50vw, 245px"
          className="object-cover"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-2 pt-10 pb-1.5">
          <span className="block truncate font-hand text-2xl leading-none text-primary">
            {photo.guestName}
          </span>
          <span className="block truncate text-[11px] text-white/85">{photo.caption}</span>
          <RelativeTime date={photo.createdAt} className="block truncate text-[10px] text-white/60" />
        </span>
      </button>
      <LikeButton
        liked={liked}
        count={count}
        onToggle={(event) => {
          event.stopPropagation();
          toggle();
        }}
        className="absolute top-1.5 right-1.5 rounded-full bg-black/40 px-1.5 py-1 text-white backdrop-blur-sm"
      />
    </div>
  );
}

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const { selected, open, close } = usePhotoLightbox();

  if (photos.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 py-16 text-center">
        <p className="font-heading text-xl italic text-foreground">A parede está em branco</p>
        <p className="max-w-[22ch] text-sm text-muted-foreground">
          Seja o primeiro a registrar um momento e comece o mural de fotos.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
        {photos.map((photo) => (
          <PhotoGridItem key={photo.id} photo={photo} onOpen={() => open(photo)} />
        ))}
      </div>

      <PhotoLightbox photo={selected} onClose={close} />
    </>
  );
}
