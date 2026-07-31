'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CameraCapture } from '@/components/camera-capture/camera-capture';
import { Button } from '@/components/ui/button';
import { useGuestSession } from '@/components/auth/use-guest-session';
import { useUploadFlow } from '../upload-flow-context';

export default function UploadCameraPage() {
  const router = useRouter();
  const session = useGuestSession();
  const { setPhoto, reset } = useUploadFlow();

  useEffect(() => {
    if (session === null) router.replace('/upload');
  }, [session, router]);

  if (!session) return null;

  return (
    <main className="flex flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Sua vez, {session.name}!</h1>
        <p className="text-muted-foreground text-sm">Tire uma foto do momento.</p>
      </div>
      <CameraCapture
        onCapture={(file) => {
          setPhoto(file);
          router.push('/upload/review');
        }}
      />
      <Button
        size="lg"
        variant="ghost"
        onClick={() => {
          reset();
          router.push('/gallery');
        }}
      >
        Cancelar
      </Button>
    </main>
  );
}
