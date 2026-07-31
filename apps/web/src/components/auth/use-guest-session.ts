'use client';

import { useSyncExternalStore } from 'react';
import { getGuestSession, subscribeGuestSession, type GuestSession } from '@/lib/guest-session';

function getServerSnapshot() {
  return null;
}

// useSyncExternalStore em vez de useEffect+setState — mesma técnica do
// useLike, pra não dar mismatch de hidratação com o localStorage do servidor.
export function useGuestSession(): GuestSession | null {
  return useSyncExternalStore(subscribeGuestSession, getGuestSession, getServerSnapshot);
}
