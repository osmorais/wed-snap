'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface UploadFlowState {
  guestName: string;
  photo: File | null;
  photoPreviewUrl: string | null;
  setGuestName: (name: string) => void;
  setPhoto: (file: File | null) => void;
  reset: () => void;
}

const UploadFlowContext = createContext<UploadFlowState | null>(null);

export function UploadFlowProvider({ children }: { children: ReactNode }) {
  const [guestName, setGuestName] = useState('');
  const [photo, setPhotoState] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  function setPhoto(file: File | null) {
    setPhotoPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : null;
    });
    setPhotoState(file);
  }

  function reset() {
    setGuestName('');
    setPhoto(null);
  }

  return (
    <UploadFlowContext.Provider
      value={{ guestName, photo, photoPreviewUrl, setGuestName, setPhoto, reset }}
    >
      {children}
    </UploadFlowContext.Provider>
  );
}

export function useUploadFlow() {
  const ctx = useContext(UploadFlowContext);
  if (!ctx) {
    throw new Error('useUploadFlow deve ser usado dentro de UploadFlowProvider');
  }
  return ctx;
}
