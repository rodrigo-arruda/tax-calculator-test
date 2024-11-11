import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Service
import { fetchTaxRateByYear } from './services/api';

// Components
import DisplayError from './components/displayError';
import Loader from './components/loader';
import ResultsCard from './components/resultsCard';
import SalaryInput from './components/salaryInput';
import YearSelector from './components/yearSelector';

// Types
import { IResult, ITaxBand } from './types';

// Utils
import { calculateTaxes } from './utils';

// Styles
import classes from './App.module.scss';

function App(): React.ReactElement {
  const [year, setYear] = useState<number>(2022);
  const [salary, setSalary] = useState<number>(0);
  const [taxBands, setTaxBands] = useState<ITaxBand[]>([]);
  const [result, setResult] = useState<IResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTaxRates = async () => {
    setResult(null);
    setSalary(0);
    setLoading(true);
    try {
      const rates = await fetchTaxRateByYear(year);
      if (Array.isArray(rates.tax_brackets)) {
        setTaxBands(rates.tax_brackets);
        setError(null);
      } else {
        throw new Error('Fetched tax rates are not an array');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(message);
      setError(`Failed to load tax rates: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTaxRates();
  }, [year]);

  const handleCalculate = useCallback(() => {
    if (taxBands.length > 0) {
      const res = calculateTaxes(salary, taxBands);
      setResult(res);
    } else {
      console.error('Tax bands are not set correctly.');
    }
  }, [salary, taxBands]);

  const renderResult = useMemo(() => {
    if (!result) return null;

    return <ResultsCard data={result} />;
  }, [result]);

  return (
    <div className={classes.App}>
      <h1>Tax Calculator</h1>

      {error && <DisplayError error={error} />}

      {loading && <Loader year={year} />}

      {!loading && !error && (
        <section className={classes.contentWrapper}>
          <form
            className={classes.formWrapper}
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              handleCalculate();
            }}
          >
            <YearSelector year={year} setYear={setYear} />
            <SalaryInput salary={salary} setSalary={setSalary} />
            <button type="submit" disabled={salary === 0}>
              Calculate
            </button>
          </form>
          {renderResult}
        </section>
      )}
    </div>
  );
}

export default App;
