const STORAGE_KEY = 'wed-snap:guest-name';

const listeners = new Set<() => void>();

export function subscribeGuestName(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSavedGuestName(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

// Guardado por aparelho (não por usuário, já que não há login) — depois do
// primeiro comentário, o nome fica preenchido sozinho nas próximas vezes.
export function saveGuestName(name: string) {
  localStorage.setItem(STORAGE_KEY, name);
  listeners.forEach((listener) => listener());
}
