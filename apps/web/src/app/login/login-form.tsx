'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { saveGuestSession, skipLogin } from '@/lib/guest-session';
import { WeddingHero } from '@/components/wedding-logo/wedding-hero';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [mode, setMode] = useState<'login' | 'create'>('login');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function switchMode(next: 'login' | 'create') {
    setMode(next);
    setError(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || pin.length !== 4 || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const endpoint = mode === 'login' ? '/api/accounts/login' : '/api/accounts';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, pin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'Não foi possível continuar.');
        return;
      }
      saveGuestSession({ name: data.name, pin });
      router.push(redirectTo);
    } catch {
      setError('Não foi possível continuar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleSkip() {
    skipLogin();
    // Ignora o redirect (pode ser uma rota que exige login, tipo /upload —
    // voltar pra lá só faria dar bounce de volta pro /login). "Só
    // visualizar" sempre leva pra galeria.
    router.push('/gallery');
  }

  return (
    <main className="flex flex-1 flex-col justify-center gap-8 px-6 py-16">
      <WeddingHero />
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-3xl font-semibold italic">
          {mode === 'login' ? 'Entrar' : 'Criar acesso'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === 'login'
            ? 'Digite o nome e o PIN que você criou da primeira vez.'
            : 'Escolha o nome que vai te identificar e um PIN de 4 dígitos.'}
        </p>
      </div>

      <div className="mx-auto flex gap-1 rounded-full bg-muted p-1 text-sm">
        <button
          type="button"
          onClick={() => switchMode('login')}
          className={cn(
            'rounded-full px-4 py-1.5 transition-colors',
            mode === 'login'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => switchMode('create')}
          className={cn(
            'rounded-full px-4 py-1.5 transition-colors',
            mode === 'create'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Criar acesso
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          autoFocus
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          placeholder="PIN de 4 dígitos"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
        />

        {mode === 'create' && (
          <p className="text-xs text-muted-foreground">
            Esse nome e PIN vão te identificar sempre que você comentar ou publicar fotos por
            este aparelho. Depois de criado não dá pra trocar de nome sem começar um acesso
            novo, então escolha um nome que seja realmente o seu.
          </p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          size="lg"
          disabled={!name.trim() || pin.length !== 4 || submitting}
        >
          {submitting ? 'Enviando...' : mode === 'login' ? 'Entrar' : 'Criar e continuar'}
        </Button>
        <Button type="button" size="lg" variant="ghost" onClick={handleSkip}>
          Só visualizar por enquanto
        </Button>
      </form>
    </main>
  );
}
