export interface ITaxBand {
  min: number;
  max?: number;
  rate: number;
}

export interface TaxCalculationResult {
  totalTaxes: number;
  taxesPerBand: { band: ITaxBand; tax: number }[];
  effectiveRate: number;
}

export interface IResult {
  totalTaxes: number;
  taxesPerBand: { band: ITaxBand; tax: number }[];
  effectiveRate: number;
}

export interface ICurrencyFormatterOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}
