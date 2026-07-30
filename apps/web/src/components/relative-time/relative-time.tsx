'use client';

import { useSyncExternalStore } from 'react';
import { formatRelativeTime } from '@/lib/relative-time';

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

// useSyncExternalStore é o jeito recomendado pelo React para valores que
// diferem entre servidor e cliente (aqui, "há X minutos" muda conforme o
// tempo passa entre o SSR e a hidratação): renderiza null nas duas
// primeiras passadas (idênticas) e só troca pelo valor real depois de
// montado, sem gerar mismatch de hidratação.
export function RelativeTime({ date, className }: { date: string; className?: string }) {
  const label = useSyncExternalStore(subscribe, () => formatRelativeTime(date), getServerSnapshot);

  if (!label) return null;

  return <span className={className}>{label}</span>;
}
