import { Grid, Switch, Typography } from '@material-ui/core';
import React from 'react';
export const SwitchDoubleLabel = ({ value, labels, handleChange, isXs }) => {
  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item style={{ fontSize: isXs ? '0.7rem' : '1rem' }}>
          {labels.label1}
        </Grid>
        <Grid item>
          <Switch
            checked={value}
            onChange={handleChange}
            name="switchDouble"
            size="small"
          />
        </Grid>
        <Grid item style={{ fontSize: isXs ? '0.7rem' : '1rem' }}>
          {labels.label2}
        </Grid>
      </Grid>
    </Typography>
  );
};
