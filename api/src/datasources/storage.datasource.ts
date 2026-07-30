import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

// Client com service role key: só é usado no backend, nunca exposto ao navegador.
export const supabaseStorage = createClient(supabaseUrl, supabaseServiceRoleKey);

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? 'wedding-photos';
