type Listener = () => void;

// Estado compartilhado por chave (id da foto) entre todas as instâncias de um
// hook que mostram a mesma foto — sem isso, curtir/comentar no lightbox só
// atualizava o próprio lightbox, deixando o card no feed/galeria desatualizado
// até recarregar a página. Só existe no navegador: no servidor cada snapshot
// sempre usa o valor inicial vindo do banco, então o SSR nunca fica preso
// num estado antigo de uma requisição anterior.
export function createKeyedStore<T>() {
  const values = new Map<string, T>();
  const listeners = new Map<string, Set<Listener>>();

  function isBrowser() {
    return typeof window !== 'undefined';
  }

  function subscribe(key: string, listener: Listener) {
    if (!isBrowser()) return () => {};
    let set = listeners.get(key);
    if (!set) {
      set = new Set();
      listeners.set(key, set);
    }
    set.add(listener);
    return () => set!.delete(listener);
  }

  function getSnapshot(key: string, initial: T): T {
    if (!isBrowser()) return initial;
    if (!values.has(key)) values.set(key, initial);
    return values.get(key) as T;
  }

  function setValue(key: string, updater: T | ((current: T) => T)) {
    if (!isBrowser()) return;
    const current = values.get(key) as T;
    const next = typeof updater === 'function' ? (updater as (current: T) => T)(current) : updater;
    values.set(key, next);
    listeners.get(key)?.forEach((listener) => listener());
  }

  return { subscribe, getSnapshot, setValue };
}
