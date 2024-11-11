import { ICurrencyFormatterOptions, ITaxBand, TaxCalculationResult } from './types';

export const calculateTaxes = (salary: number, taxBands: ITaxBand[]): TaxCalculationResult => {
  if (salary <= 0) return { totalTaxes: 0, taxesPerBand: [], effectiveRate: 0 };

  let remainingSalary = salary;

  const { totalTaxes, taxesPerBand } = taxBands.reduce(
    (acc, { min, max, rate }) => {
      if (remainingSalary <= 0) return acc;

      const upperLimit = max ?? remainingSalary;
      const taxableAmount = Math.min(remainingSalary, upperLimit - min);
      const tax = taxableAmount * rate;

      acc.totalTaxes += tax;
      acc.taxesPerBand.push({ band: { min, max, rate }, tax });

      remainingSalary -= taxableAmount;
      return acc;
    },
    { totalTaxes: 0, taxesPerBand: [] as { band: ITaxBand; tax: number }[] }
  );

  const effectiveRate = totalTaxes / salary;

  return { totalTaxes, taxesPerBand, effectiveRate };
};

export function formatCurrency(amount: number, options: ICurrencyFormatterOptions = {}): string {
  const { locale = 'en-US', currency = 'USD', minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount);
}
