'use client';

import { useSyncExternalStore } from 'react';
import { getSavedGuestName, subscribeGuestName } from '@/lib/guest-name';

function getServerSnapshot() {
  return null;
}

// useSyncExternalStore em vez de useEffect+setState — mesma técnica do
// useLike, pra não dar mismatch de hidratação com o localStorage do servidor.
export function useSavedGuestName() {
  return useSyncExternalStore(subscribeGuestName, getSavedGuestName, getServerSnapshot);
}
