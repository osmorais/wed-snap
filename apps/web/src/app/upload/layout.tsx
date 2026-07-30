import { UploadFlowProvider } from './upload-flow-context';

// Fica montado durante toda a navegação entre /upload, /upload/camera,
// /upload/review e /upload/caption — é isso que mantém o estado do fluxo
// (nome, foto, legenda) sem precisar de sessão/backend, já que não há login.
export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return <UploadFlowProvider>{children}</UploadFlowProvider>;
}
