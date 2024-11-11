import React from 'react';

import classes from '../GlobalStyles.module.scss';

import { ISalaryInput } from './types';

function SalaryInput({ salary, setSalary }: ISalaryInput) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');

    setSalary(Number(value));
  };

  return (
    <div className={classes.fieldsWrapper}>
      <label htmlFor="salary-input">Yearly Salary</label>
      <div className={classes.inputWrapper}>
        <span className={classes.dollarSign}>$</span>
        <input
          id="salary-input"
          type="text"
          value={salary ? salary.toLocaleString() : ''}
          onChange={handleChange}
          placeholder="0.00"
        />
      </div>
    </div>
  );
}

export default SalaryInput;
