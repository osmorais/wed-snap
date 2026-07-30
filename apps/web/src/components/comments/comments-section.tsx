'use client';

import { useState } from 'react';
import type { Comment } from '@wed-snap/shared';
import { RelativeTime } from '@/components/relative-time/relative-time';
import { useComments } from './use-comments';
import { useSavedGuestName } from './use-saved-guest-name';
import { saveGuestName } from '@/lib/guest-name';

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
  const savedName = useSavedGuestName();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const guestName = (savedName ?? name).trim();
    const trimmedText = text.trim();
    if (!guestName || !trimmedText || submitting) return;

    setSubmitting(true);
    try {
      await addComment({ guestName, text: trimmedText });
      if (!savedName) saveGuestName(guestName);
      setName('');
      setText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  function startEditingName() {
    setNameDraft(savedName ?? '');
    setEditingName(true);
  }

  function handleSaveName(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = nameDraft.trim();
    if (!trimmed) return;
    saveGuestName(trimmed);
    setEditingName(false);
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

      {savedName &&
        (editingName ? (
          <form onSubmit={handleSaveName} className="mt-3 flex gap-2">
            <input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              autoFocus
              required
              className="flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setEditingName(false)}
              className="text-sm text-white/50 hover:text-white"
            >
              Cancelar
            </button>
          </form>
        ) : (
          <p className="mt-3 text-xs text-white/50">
            Comentando como <span className="font-medium text-white/80">{savedName}</span>{' '}
            <button
              type="button"
              onClick={startEditingName}
              className="underline hover:text-white"
            >
              alterar
            </button>
          </p>
        ))}

      <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
        {!savedName && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            required
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
        )}
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva um comentário..."
            required
            className="flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
