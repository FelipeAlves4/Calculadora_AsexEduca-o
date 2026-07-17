import { BarChart3, ClipboardList, Eraser, FileText, Maximize2, Presentation } from 'lucide-react';

interface HeaderProps {
  onExample: () => void;
  onClear: () => void;
  onPrint: () => void;
  onFullscreen: () => void;
  presentationMode: boolean;
  onTogglePresentation: () => void;
}

export const Header = ({
  onExample,
  onClear,
  onPrint,
  onFullscreen,
  presentationMode,
  onTogglePresentation,
}: HeaderProps) => (
  <header className="site-header">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="brand-pill">
            <BarChart3 size={17} />
            ASEX Educação
          </div>
          <h1 className="site-title">Calculadora de Resultados</h1>
          <p className="site-subtitle">
            Diagnóstico financeiro premium para comparar o cenário atual com o resultado projetado.
          </p>
        </div>

        <div className="header-actions">
          <button type="button" className="primary-button" onClick={onExample}>
            <ClipboardList size={17} />
            Exemplo
          </button>
          <button type="button" className="secondary-button" onClick={onClear}>
            <Eraser size={17} />
            Limpar
          </button>
          <button type="button" className="secondary-button secondary-action" onClick={onPrint}>
            <FileText size={17} />
            PDF
          </button>
          <button type="button" className="secondary-button secondary-action" onClick={onFullscreen}>
            <Maximize2 size={17} />
            Tela cheia
          </button>
          <button
            type="button"
            className={presentationMode ? 'primary-button' : 'secondary-button'}
            onClick={onTogglePresentation}
          >
            <Presentation size={17} />
            Apresentação
          </button>
        </div>
      </div>
    </div>
  </header>
);
