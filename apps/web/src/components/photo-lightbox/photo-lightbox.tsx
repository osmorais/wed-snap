'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import type { Photo } from '@wed-snap/shared';
import { RelativeTime } from '@/components/relative-time/relative-time';
import { LikeButton } from '@/components/like-button/like-button';
import { useLike } from '@/components/like-button/use-like';
import { LikePop, useLikePop } from '@/components/like-button/like-pop';

export function PhotoLightbox({
  photo,
  onClose,
}: {
  photo: Photo | null;
  onClose: () => void;
}) {
  // Os hooks precisam ser chamados sempre, mesmo com photo null (foto
  // fechada) — por isso o early return abaixo vem depois deles, não antes.
  const { liked, count, like, toggle } = useLike(photo?.id ?? '', photo?.likeCount ?? 0);
  const { visible, pop } = useLikePop();

  if (!photo) return null;

  function handleDoubleClick() {
    like();
    pop();
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/90 p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="flex max-h-full max-w-full flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Duplo clique curte a foto, igual ao Instagram. */}
        <div
          onDoubleClick={handleDoubleClick}
          className="relative h-[min(70vh,92vw)] w-[min(70vh,92vw)] select-none"
        >
          <Image
            src={photo.imageUrl}
            alt={photo.caption}
            fill
            sizes="92vw"
            className="object-contain"
          />
          <LikePop visible={visible} />
        </div>
        <div className="w-[min(70vh,92vw)] max-w-[92vw]">
          <LikeButton liked={liked} count={count} onToggle={toggle} className="text-white" />
          <div className="mt-1 text-center">
            <p className="font-hand text-3xl leading-none text-primary">{photo.guestName}</p>
            {photo.caption && <p className="mt-1 text-sm text-white/90">{photo.caption}</p>}
            <RelativeTime date={photo.createdAt} className="mt-1 block text-xs text-white/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
