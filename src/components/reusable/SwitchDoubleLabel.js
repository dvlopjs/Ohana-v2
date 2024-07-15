import { Grid, Switch, Typography } from '@material-ui/core';
import React from 'react';
export const SwitchDoubleLabel = ({ value, labels, handleChange }) => {
  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>{labels.label1}</Grid>
        <Grid item>
          <Switch checked={value} onChange={handleChange} name="switchDouble" />
        </Grid>
        <Grid item>{labels.label2}</Grid>
      </Grid>
    </Typography>
  );
};
