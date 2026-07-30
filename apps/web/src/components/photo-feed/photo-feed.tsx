'use client';

import Image from 'next/image';
import type { Photo } from '@wed-snap/shared';
import { RelativeTime } from '@/components/relative-time/relative-time';
import { LikeButton } from '@/components/like-button/like-button';
import { useLike } from '@/components/like-button/use-like';
import { LikePop, useLikePop } from '@/components/like-button/like-pop';

function PhotoFeedItem({ photo }: { photo: Photo }) {
  const { liked, count, like, toggle } = useLike(photo.id, photo.likeCount);
  const { visible, pop } = useLikePop();

  function handleDoubleClick() {
    like();
    pop();
  }

  return (
    <article className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <header className="flex items-baseline justify-between px-4 py-3">
        <p className="font-hand text-3xl leading-none text-primary">{photo.guestName}</p>
        <RelativeTime date={photo.createdAt} className="text-xs text-muted-foreground" />
      </header>
      {/* Duplo clique curte a foto, igual ao Instagram — não abre mais o lightbox. */}
      <div
        onDoubleClick={handleDoubleClick}
        className="relative block aspect-square w-full select-none"
      >
        <Image
          src={photo.imageUrl}
          alt={photo.caption}
          fill
          sizes="(max-width: 640px) 100vw, 576px"
          className="object-cover"
        />
        <LikePop visible={visible} />
      </div>
      <LikeButton
        liked={liked}
        count={count}
        onToggle={toggle}
        className="px-4 pt-3 text-foreground"
      />
      {photo.caption && (
        <p className="px-4 py-3 text-sm text-foreground">
          <span className="font-semibold">{photo.guestName}</span> {photo.caption}
        </p>
      )}
    </article>
  );
}

export function PhotoFeed({ photos }: { photos: Photo[] }) {
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
    <div className="divide-y divide-border">
      {photos.map((photo) => (
        <PhotoFeedItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
