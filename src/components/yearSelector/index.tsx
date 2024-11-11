import React from 'react';

import { IYearSelector } from './types';

import classes from '../GlobalStyles.module.scss';

import { YEAR_OPTIONS } from '../../constants';

function YearSelector({ year, setYear }: IYearSelector) {
  return (
    <div className={classes.fieldsWrapper}>
      <label htmlFor="year-select">Select Year</label>
      <select id="year-select" value={year} onChange={(e) => setYear(Number(e.target.value))}>
        {YEAR_OPTIONS.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearSelector;
