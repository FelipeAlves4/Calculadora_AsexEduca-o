import { BarChart3, ClipboardList, Eraser, FileText, Maximize2, Presentation, Sparkles } from 'lucide-react';

interface HeaderProps {
  onExample: () => void;
  onClear: () => void;
  onCopyCurrent: () => void;
  onImprove: () => void;
  onPrint: () => void;
  onFullscreen: () => void;
  presentationMode: boolean;
  onTogglePresentation: () => void;
  message: string | null;
}

export const Header = ({
  onExample,
  onClear,
  onCopyCurrent,
  onImprove,
  onPrint,
  onFullscreen,
  presentationMode,
  onTogglePresentation,
  message,
}: HeaderProps) => (
  <header className="site-header">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-gold-500/30 bg-white/5 px-3 py-2 text-sm font-semibold text-gold-500">
            <BarChart3 size={17} />
            ASEX Educação
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Calculadora de Resultados</h1>
          <p className="mt-2 text-base leading-relaxed text-slate-300">
            Diagnóstico financeiro premium para comparar o cenário atual com o resultado projetado após melhorias.
          </p>
        </div>

        <div className="header-actions flex flex-wrap gap-2">
          <button type="button" className="primary-button" onClick={onExample}>
            <ClipboardList size={17} />
            Preencher exemplo
          </button>
          <button type="button" className="secondary-button secondary-action" onClick={onClear}>
            <Eraser size={17} />
            Limpar dados
          </button>
          <button type="button" className="secondary-button secondary-action" onClick={onCopyCurrent}>
            <FileText size={17} />
            Copiar atual
          </button>
          <button type="button" className="primary-button" onClick={onImprove}>
            <Sparkles size={17} />
            Aplicar melhoria
          </button>
          <button type="button" className="secondary-button secondary-action" onClick={onPrint}>
            <FileText size={17} />
            Imprimir/PDF
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
      {message && <div className="status-message">{message}</div>}
    </div>
  </header>
);
