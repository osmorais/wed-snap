'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Comment } from '@wed-snap/shared';
import { RelativeTime } from '@/components/relative-time/relative-time';
import { useGuestSession } from '@/components/auth/use-guest-session';
import { useComments } from './use-comments';

export function CommentsSection({
  photoId,
  initialCount,
  initialComments,
}: {
  photoId: string;
  initialCount: number;
  initialComments: Comment[];
}) {
  const { comments, count, addComment } = useComments(photoId, initialCount, initialComments);
  const session = useGuestSession();
  const pathname = usePathname();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText || submitting) return;

    setSubmitting(true);
    try {
      await addComment(trimmedText);
      setText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full border-t border-white/10 pt-3">
      <p className="text-xs font-medium tracking-[0.15em] text-white/50 uppercase">
        {count === 0
          ? 'Sem comentários ainda'
          : count === 1
            ? '1 comentário'
            : `${count} comentários`}
      </p>

      {comments.length > 0 && (
        <ul className="mt-2 flex max-h-40 flex-col gap-1.5 overflow-y-auto">
          {comments.map((comment) => (
            <li key={comment.id} className="text-sm text-white/90">
              <span className="font-hand text-lg leading-none text-primary">
                {comment.guestName}
              </span>{' '}
              {comment.text}
              <RelativeTime
                date={comment.createdAt}
                className="ml-2 text-[10px] text-white/40"
              />
            </li>
          ))}
        </ul>
      )}

      {session ? (
        <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva um comentário..."
            required
            className="flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-white/40 focus:outline-none md:text-sm"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      ) : (
        <p className="mt-2 text-sm text-white/70">
          <Link
            href={`/login?redirect=${encodeURIComponent(pathname)}`}
            className="font-medium text-primary underline underline-offset-2"
          >
            Entre
          </Link>{' '}
          para comentar.
        </p>
      )}
    </div>
  );
}
