'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUploadFlow } from './upload-flow-context';

export default function UploadNamePage() {
  const router = useRouter();
  const { guestName, setGuestName } = useUploadFlow();
  const [value, setValue] = useState(guestName);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setGuestName(value.trim());
    router.push('/upload/camera');
  }

  return (
    <main className="flex flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Qual é o seu nome?</h1>
        <p className="text-muted-foreground text-sm">
          Usamos só para identificar quem enviou a foto.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          autoFocus
          placeholder="Seu nome"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit" size="lg" disabled={!value.trim()}>
          Continuar
        </Button>
      </form>
    </main>
  );
}
