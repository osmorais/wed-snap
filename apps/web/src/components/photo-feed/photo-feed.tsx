'use client';

import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import type { Photo } from '@wed-snap/shared';
import { RelativeTime } from '@/components/relative-time/relative-time';
import { LikeButton } from '@/components/like-button/like-button';
import { useLike } from '@/components/like-button/use-like';
import { LikePop, useLikePop } from '@/components/like-button/like-pop';
import { usePreviewComments } from '@/components/comments/use-preview-comments';
import { PhotoLightbox } from '@/components/photo-lightbox/photo-lightbox';
import { usePhotoLightbox } from '@/components/photo-lightbox/use-photo-lightbox';

function PhotoFeedItem({ photo, onOpenComments }: { photo: Photo; onOpenComments: () => void }) {
  const { liked, count, like, toggle } = useLike(photo.id, photo.likeCount);
  const { visible, pop } = useLikePop();
  const { count: commentCount, previewComments } = usePreviewComments(
    photo.id,
    photo.commentCount,
    photo.previewComments
  );

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
      <div className="flex items-center gap-4 px-4 pt-3">
        <LikeButton liked={liked} count={count} onToggle={toggle} />
        <button
          type="button"
          onClick={onOpenComments}
          className="flex items-center gap-1 text-foreground"
          aria-label="Ver comentários"
        >
          <MessageCircle className="h-5 w-5" />
          {commentCount > 0 && <span className="text-xs tabular-nums">{commentCount}</span>}
        </button>
      </div>
      {(photo.caption || previewComments.length > 0) && (
        <div className="flex flex-col gap-1 px-4 pt-3 pb-3">
          {photo.caption && (
            <p className="text-sm text-foreground">
              <span className="font-semibold">{photo.guestName}</span> {photo.caption}
            </p>
          )}
          {previewComments.map((comment) => (
            <p key={comment.id} className="text-sm text-foreground">
              <span className="font-semibold">{comment.guestName}</span> {comment.text}
            </p>
          ))}
          {commentCount > previewComments.length && (
            <button
              type="button"
              onClick={onOpenComments}
              className="text-left text-sm text-muted-foreground hover:text-foreground"
            >
              Ver todos os comentários
            </button>
          )}
        </div>
      )}
    </article>
  );
}

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
          <PhotoFeedItem key={photo.id} photo={photo} onOpenComments={() => open(photo)} />
        ))}
      </div>

      <PhotoLightbox photo={selected} onClose={close} />
    </>
  );
}
