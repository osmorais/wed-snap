'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { compressPhoto } from '@/lib/image-compression';
import { uploadPhoto } from '@/services/photo.service';
import { useUploadFlow } from '../upload-flow-context';

export default function UploadCaptionPage() {
  const router = useRouter();
  const { guestName, photo, reset } = useUploadFlow();
  const [caption, setCaption] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) router.replace('/upload');
  }, [photo, router]);

  if (!photo) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!photo || isPublishing) return;

    setIsPublishing(true);
    setError(null);
    try {
      const compressed = await compressPhoto(photo);
      await uploadPhoto({ file: compressed, guestName, caption });
      reset();
      router.push('/gallery');
    } catch {
      setError('Não foi possível publicar a foto. Tente novamente.');
      setIsPublishing(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-center text-2xl font-semibold">Adicione uma legenda</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Textarea
          autoFocus
          placeholder="Escreva algo sobre esse momento..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button type="submit" size="lg" disabled={!caption.trim() || isPublishing}>
          {isPublishing ? 'Publicando...' : 'Publicar'}
        </Button>
      </form>
    </main>
  );
}
