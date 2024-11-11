import React from 'react';

// Styles
import classes from './Loader.module.scss';

// Types
import { ILoader } from './types';

function Loader({ year }: ILoader) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.spinner} />
      <p>{`Loading tax rates for the ${year} year ...`}</p>
    </div>
  );
}

export default Loader;
