import type { Comment } from '@wed-snap/shared';
import { createKeyedStore } from '@/lib/keyed-store';

// Compartilhado entre o preview no feed e a lista completa no lightbox —
// comentar no lightbox atualiza o preview sem precisar recarregar a página.
export const commentsStore = createKeyedStore<Comment[]>();
export const commentCountStore = createKeyedStore<number>();
