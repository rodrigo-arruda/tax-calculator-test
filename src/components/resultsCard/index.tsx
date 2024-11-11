import React from 'react';

// Components
import TaxBandTable from '../taxBandTable';

// Types
import { IResultCard } from './types';

// Utils
import { formatCurrency } from '../../utils';

// Styles
import classes from './ResultCard.module.scss';

function ResultCard({ data }: IResultCard) {
  return (
    <div className={classes.wrapper}>
      <section className={classes.resultsContentWrapper}>
        <div className={classes.summary}>
          <h2>Summary</h2>
          <p>
            <strong>Total Taxes Owed:</strong>
            {formatCurrency(data.totalTaxes)}
          </p>
          <p>
            <strong>Effective Tax Rate:</strong>
            {`${(data.effectiveRate * 100).toFixed(2)}%`}
          </p>
        </div>

        <div className={classes.table}>
          <h3>Taxes Per Band</h3>
          <TaxBandTable data={data.taxesPerBand} />
        </div>
      </section>
    </div>
  );
}

export default ResultCard;
