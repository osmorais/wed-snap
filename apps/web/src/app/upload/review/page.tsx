'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUploadFlow } from '../upload-flow-context';

export default function UploadReviewPage() {
  const router = useRouter();
  const { photo, photoPreviewUrl, setPhoto } = useUploadFlow();

  useEffect(() => {
    if (!photo) router.replace('/upload');
  }, [photo, router]);

  if (!photo || !photoPreviewUrl) return null;

  return (
    <main className="flex flex-1 flex-col gap-6 px-6 py-8">
      <h1 className="text-center text-2xl font-semibold">Ficou boa?</h1>
      <div className="aspect-square w-full overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element -- blob: URL local, next/image não suporta */}
        <img src={photoPreviewUrl} alt="Prévia da foto" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-3">
        <Button size="lg" onClick={() => router.push('/upload/caption')}>
          Usar essa foto
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setPhoto(null);
            router.push('/upload/camera');
          }}
        >
          Tirar novamente
        </Button>
      </div>
    </main>
  );
}
