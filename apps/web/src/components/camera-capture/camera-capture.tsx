'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onCapture(file);
        }}
      />
      <Button size="lg" className="w-full" onClick={() => inputRef.current?.click()}>
        Tirar foto
      </Button>
    </>
  );
}
