import { BarChart3, LockKeyhole } from 'lucide-react';
import { ReactNode } from 'react';

export const AuthShell = ({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <main className="auth-page">
    <div className="auth-backdrop" aria-hidden="true" />
    <section className="auth-shell">
      <div className="auth-brand-panel">
        <div className="auth-brand-mark"><BarChart3 size={24} /></div>
        <div>
          <strong>ASEX EDUCAÇÃO</strong>
          <span>Calculadora de Resultados</span>
        </div>
        <div className="auth-trust-note">
          <LockKeyhole size={18} />
          <p><strong>Acesso protegido</strong><span>Ambiente exclusivo para agentes de expansão.</span></p>
        </div>
      </div>
      <div className="auth-card">
        <span className="auth-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="auth-description">{description}</p>
        {children}
      </div>
    </section>
  </main>
);
