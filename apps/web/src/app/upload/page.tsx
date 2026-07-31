'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGuestSession } from '@/components/auth/use-guest-session';

// O nome já vem da sessão (login/PIN) agora — essa tela não pergunta mais
// nada, só decide pra onde mandar o convidado.
export default function UploadGatePage() {
  const router = useRouter();
  const session = useGuestSession();

  useEffect(() => {
    if (session === null) {
      router.replace('/login?redirect=/upload');
    } else {
      router.replace('/upload/camera');
    }
  }, [session, router]);

  return null;
}
