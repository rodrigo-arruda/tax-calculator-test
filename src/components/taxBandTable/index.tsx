import React from 'react';
import { ITaxTable } from './types';

import classes from './TaxBandTable.module.scss';
import { formatCurrency } from '../../utils';

const TaxBandTable: React.FC<ITaxTable> = ({ data }) => {
  return (
    <table className={classes.taxTable}>
      <thead>
        <tr>
          <th>Band Range (Min - Max)</th>
          <th>Rate (%)</th>
          <th>Tax ($)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              {formatCurrency(item.band.min)} - {item.band.max !== undefined ? formatCurrency(item.band.max) : 'and up'}
            </td>
            <td>{(item.band.rate * 100).toFixed(2)}%</td>
            <td>{formatCurrency(item.tax)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaxBandTable;
