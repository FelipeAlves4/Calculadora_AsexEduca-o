export const toFiniteNumber = (value: unknown): number => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(toFiniteNumber(value), min), max);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(toFiniteNumber(value));

export const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(toFiniteNumber(value))}%`;

export const parseBrazilianNumber = (value: string): number => {
  if (!value.trim()) {
    return 0;
  }

  const normalized = value
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');

  return toFiniteNumber(Number(normalized));
};

export const formatPlainNumber = (value: number, digits = 2) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(toFiniteNumber(value));
