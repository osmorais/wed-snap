import { Suspense } from 'react';
import { LoginForm } from './login-form';

// force-dynamic evita o mesmo problema de cache estático já visto em
// outras páginas — aqui nem se aplicaria (não busca dados), mas useSearchParams
// exige um limite de Suspense de qualquer forma pro build não falhar.
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
