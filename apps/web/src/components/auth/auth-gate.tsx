'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getGuestSession, hasSkippedLogin } from '@/lib/guest-session';

// Renderiza null — só existe pra checar, na primeira visita, se o aparelho
// já tem um nome+PIN ou já escolheu "só visualizar"; se não tiver nenhum
// dos dois, manda pro /login antes de mostrar a landing.
export function AuthGate() {
  const router = useRouter();

  useEffect(() => {
    if (!getGuestSession() && !hasSkippedLogin()) {
      router.replace('/login');
    }
  }, [router]);

  return null;
}
