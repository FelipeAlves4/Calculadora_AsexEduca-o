import { Copy, Sparkles } from 'lucide-react';
import { INDICATOR_CONFIG, REVENUE_DESCRIPTION } from '../data/indicatorConfig';
import { FinancialScenario, IndicatorKey, ScenarioResults } from '../types/financial';
import {
  updateIndicatorByAmount,
  updateIndicatorByPercentage,
  withRevenueRecalculated,
} from '../utils/calculations';
import { FinancialInput, NumericInput } from './FinancialInput';
import { InfoTooltip } from './InfoTooltip';
import { ScenarioSummary } from './ScenarioSummary';

interface ScenarioCalculatorProps {
  title: string;
  scenario: FinancialScenario;
  results: ScenarioResults;
  onChange: (scenario: FinancialScenario) => void;
  accent: 'current' | 'projected';
  onCopyCurrent?: () => void;
  onImprove?: () => void;
}

export const ScenarioCalculator = ({
  title,
  scenario,
  results,
  onChange,
  accent,
  onCopyCurrent,
  onImprove,
}: ScenarioCalculatorProps) => {
  const updateAmount = (key: IndicatorKey, amount: number, max: number) => onChange(updateIndicatorByAmount(scenario, key, amount, max));
  const updatePercentage = (key: IndicatorKey, percentage: number, max: number) =>
    onChange(updateIndicatorByPercentage(scenario, key, percentage, max));

  return (
    <section className={`scenario-panel ${accent === 'projected' ? 'scenario-panel-projected' : ''}`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold-500">Cenário financeiro</span>
          <h2 className="mt-1 text-2xl font-extrabold uppercase text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-300">
            {accent === 'projected'
              ? 'Resultado estimado com o apoio da ASEX Educação'
              : 'Situação financeira atual do negócio'}
          </p>
        </div>
        {accent === 'projected' && (
          <div className="flex flex-wrap gap-2">
            <button type="button" className="mini-action-button" onClick={onCopyCurrent}>
              <Copy size={15} />
              Copiar atual
            </button>
            <button type="button" className="mini-action-button mini-action-button-gold" onClick={onImprove}>
              <Sparkles size={15} />
              Aplicar melhoria
            </button>
          </div>
        )}
      </div>

      <div className="indicator-card mb-4">
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-sm font-bold text-white">Faturamento mensal</h3>
          <InfoTooltip text={REVENUE_DESCRIPTION} />
        </div>
        <NumericInput
          value={scenario.revenue}
          prefix="R$"
          onChange={(revenue) => onChange(withRevenueRecalculated(scenario, revenue))}
          ariaLabel="Faturamento mensal"
          compact
        />
      </div>

      <div className="grid gap-3">
        {INDICATOR_CONFIG.map((config) => (
          <div key={config.key}>
            <FinancialInput
              label={config.label}
              description={config.description}
              amount={scenario.indicators[config.key].amount}
              percentage={scenario.indicators[config.key].percentage}
              min={config.min}
              max={config.max}
              step={config.step}
              onAmountChange={(amount) => updateAmount(config.key, amount, config.max)}
              onPercentageChange={(percentage) => updatePercentage(config.key, percentage, config.max)}
            >
              <InfoTooltip text={config.description} />
            </FinancialInput>
          </div>
        ))}
      </div>

      <ScenarioSummary results={results} />
    </section>
  );
};
