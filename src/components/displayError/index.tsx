import React from 'react';

// Styles
import classes from './DisplayError.module.scss';

// Types
import { IDisplayError } from './types';

function DisplayError({ error }: IDisplayError) {
  return (
    <div className={classes.wrapper}>
      <p className={classes.error}>{error}</p>

      <button className={classes.refreshButton} type="button" onClick={() => window.location.reload()}>
        Refresh
      </button>
    </div>
  );
}

export default DisplayError;
