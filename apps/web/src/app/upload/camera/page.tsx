'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CameraCapture } from '@/components/camera-capture/camera-capture';
import { useUploadFlow } from '../upload-flow-context';

export default function UploadCameraPage() {
  const router = useRouter();
  const { guestName, setPhoto } = useUploadFlow();

  useEffect(() => {
    if (!guestName) router.replace('/upload');
  }, [guestName, router]);

  if (!guestName) return null;

  return (
    <main className="flex flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Sua vez, {guestName}!</h1>
        <p className="text-muted-foreground text-sm">Tire uma foto do momento.</p>
      </div>
      <CameraCapture
        onCapture={(file) => {
          setPhoto(file);
          router.push('/upload/review');
        }}
      />
    </main>
  );
}
