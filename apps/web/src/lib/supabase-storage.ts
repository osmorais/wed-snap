import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Client com service role key: só é usado em código de servidor (Route
// Handlers), nunca importado por Client Components — a key nunca vai pro
// bundle do navegador porque não tem o prefixo NEXT_PUBLIC_.
//
// Criado sob demanda (não no topo do módulo): o Next.js executa o módulo da
// rota durante o build (fase de "Collecting page data") para inspecioná-la,
// e se as variáveis de ambiente não estiverem disponíveis nesse momento
// (comum em plataformas que só injetam env vars em runtime), instanciar o
// client aqui quebraria o build mesmo a aplicação funcionando normalmente
// depois. Assim, só roda de verdade quando uma requisição chega.
let cachedClient: SupabaseClient | undefined;

export function getSupabaseStorage(): SupabaseClient {
  if (!cachedClient) {
    cachedClient = createClient(
      process.env.SUPABASE_URL ?? '',
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
    );
  }
  return cachedClient;
}

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? 'wedding-photos';
