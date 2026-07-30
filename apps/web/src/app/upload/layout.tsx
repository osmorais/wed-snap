import { UploadFlowProvider } from './upload-flow-context';

// Sem isso, o Next.js pré-renderiza essas páginas como estáticas e o CDN
// da hospedagem passa a cachear as respostas de navegação (RSC) por muito
// tempo — o que causa telas presas/desatualizadas entre deploys, já que o
// fluxo depende só de estado no cliente, não faz sentido cachear no servidor.
export const dynamic = 'force-dynamic';

// Fica montado durante toda a navegação entre /upload, /upload/camera,
// /upload/review e /upload/caption — é isso que mantém o estado do fluxo
// (nome, foto, legenda) sem precisar de sessão/backend, já que não há login.
export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return <UploadFlowProvider>{children}</UploadFlowProvider>;
}
