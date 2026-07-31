'use client';

import Link from 'next/link';
import { useGuestSession } from './use-guest-session';

// Só aparece pra quem escolheu "só visualizar" (ou ainda não decidiu) —
// comentar e publicar fotos continuam exigindo nome+PIN.
export function LoginBanner({ redirectTo }: { redirectTo: string }) {
  const session = useGuestSession();
  if (session) return null;

  return (
    <Link
      href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
      className="mt-1 inline-block text-xs font-medium text-primary underline underline-offset-2"
    >
      Entrar para comentar e publicar fotos
    </Link>
  );
}
