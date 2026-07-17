import { useEffect, useMemo, useState } from 'react';
import { ComparisonCards } from './components/ComparisonCards';
import { ComparisonTable } from './components/ComparisonTable';
import { Header } from './components/Header';
import { ResultsCharts } from './components/ResultsCharts';
import { ScenarioCalculator } from './components/ScenarioCalculator';
import { createEmptyScenario, exampleCurrentScenario, exampleProjectedScenario } from './data/exampleData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { FinancialScenario } from './types/financial';
import { applyImprovementSimulation, buildComparisonRows, calculateScenario } from './utils/calculations';

interface AppState {
  current: FinancialScenario;
  projected: FinancialScenario;
}

type MobileTab = 'current' | 'projected' | 'comparison';

const emptyState = (): AppState => ({
  current: createEmptyScenario(),
  projected: createEmptyScenario(),
});

const exampleState = (): AppState => ({
  current: exampleCurrentScenario(),
  projected: exampleProjectedScenario(),
});

function App() {
  const [state, setState, restored] = useLocalStorage<AppState>('asex-results-calculator', emptyState());
  const [message, setMessage] = useState<string | null>(restored ? 'Dados restaurados automaticamente.' : null);
  const [presentationMode, setPresentationMode] = useState(false);
  const [activeTab, setActiveTab] = useState<MobileTab>('current');

  const currentResults = useMemo(() => calculateScenario(state.current), [state.current]);
  const projectedResults = useMemo(() => calculateScenario(state.projected), [state.projected]);
  const comparisonRows = useMemo(() => buildComparisonRows(currentResults, projectedResults), [currentResults, projectedResults]);

  useEffect(() => {
    const timer = window.setTimeout(() => setMessage('Dados salvos temporariamente.'), 450);
    return () => window.clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = window.setTimeout(() => setMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [message]);

  const setCurrent = (current: FinancialScenario) => setState((previous) => ({ ...previous, current }));
  const setProjected = (projected: FinancialScenario) => setState((previous) => ({ ...previous, projected }));

  const fillExample = () => {
    setState(exampleState());
    setMessage('Exemplo preenchido.');
  };

  const clearData = () => {
    setState(emptyState());
    setMessage('Dados limpos.');
  };

  const copyCurrentToProjected = () => {
    setState((previous) => ({
      ...previous,
      projected: JSON.parse(JSON.stringify(previous.current)) as FinancialScenario,
    }));
    setActiveTab('projected');
    setMessage('Cenário atual copiado para o projetado.');
  };

  const improveProjection = () => {
    setState((previous) => ({
      ...previous,
      projected: applyImprovementSimulation(previous.current),
    }));
    setActiveTab('projected');
    setMessage('Simulação de melhoria aplicada.');
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
      return;
    }

    await document.exitFullscreen?.();
  };

  const comparisonPanel = (
    <>
      <section className="content-section">
        <div className="section-heading">
          <span>Comparação final</span>
          <h2>Cenário Atual x Cenário Projetado</h2>
        </div>
        <ComparisonCards current={currentResults} projected={projectedResults} />
        <div className="mt-4">
          <ComparisonTable rows={comparisonRows} />
        </div>
      </section>

      <ResultsCharts current={currentResults} projected={projectedResults} />
    </>
  );

  return (
    <div className={presentationMode ? 'presentation-mode min-h-screen' : 'min-h-screen'}>
      <Header
        onExample={fillExample}
        onClear={clearData}
        onCopyCurrent={copyCurrentToProjected}
        onImprove={improveProjection}
        onPrint={() => window.print()}
        onFullscreen={toggleFullscreen}
        presentationMode={presentationMode}
        onTogglePresentation={() => setPresentationMode((value) => !value)}
        message={message}
      />

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mobile-tabs" aria-label="Seções da calculadora">
          {[
            ['current', 'Cenário atual'],
            ['projected', 'Cenário projetado'],
            ['comparison', 'Comparação'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={activeTab === key ? 'mobile-tab mobile-tab-active' : 'mobile-tab'}
              onClick={() => setActiveTab(key as MobileTab)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="scenario-grid">
          <div className={activeTab === 'current' ? 'mobile-panel-active' : 'mobile-panel-hidden'}>
            <ScenarioCalculator
              title="Cenário Atual"
              scenario={state.current}
              results={currentResults}
              onChange={setCurrent}
              accent="current"
            />
          </div>
          <div className={activeTab === 'projected' ? 'mobile-panel-active' : 'mobile-panel-hidden'}>
            <ScenarioCalculator
              title="Cenário Projetado"
              scenario={state.projected}
              results={projectedResults}
              onChange={setProjected}
              accent="projected"
              onCopyCurrent={copyCurrentToProjected}
              onImprove={improveProjection}
            />
          </div>
        </div>

        <div className={activeTab === 'comparison' ? 'mobile-panel-active comparison-stack' : 'mobile-panel-hidden comparison-stack'}>
          {comparisonPanel}
        </div>
      </main>
    </div>
  );
}

export default App;
