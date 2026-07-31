export interface GuestSession {
  name: string;
  pin: string;
}

const SESSION_KEY = 'wed-snap:guest-session';
const SKIP_KEY = 'wed-snap:guest-skip';

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeGuestSession(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readSessionFromStorage(): GuestSession | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.name === 'string' && typeof parsed?.pin === 'string') {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

// Cacheado em módulo: useSyncExternalStore exige que getSnapshot devolva a
// mesma referência entre chamadas quando nada mudou, e JSON.parse a cada
// leitura criaria um objeto novo sempre — o que causa loop infinito de
// re-render. Só reparseia (e troca a referência) quando algo é gravado.
let cachedSession: GuestSession | null | undefined;

export function getGuestSession(): GuestSession | null {
  if (cachedSession === undefined) {
    cachedSession = readSessionFromStorage();
  }
  return cachedSession;
}

// Guardado por aparelho: nome e PIN ficam juntos, então comentar/postar não
// pede login de novo enquanto for o mesmo aparelho.
export function saveGuestSession(session: GuestSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.removeItem(SKIP_KEY);
  cachedSession = session;
  notify();
}

export function hasSkippedLogin(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SKIP_KEY) === '1';
}

// Quem escolhe "só visualizar" não deve ser interrompido de novo na landing,
// mas ainda vai bater no login se tentar comentar ou postar depois.
export function skipLogin() {
  localStorage.setItem(SKIP_KEY, '1');
  notify();
}
