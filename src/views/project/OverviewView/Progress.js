import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Typography,
  LinearProgress,
  makeStyles
} from '@material-ui/core';
import numeral from 'numeral';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingLeft: 50,
    paddingRight: 50
  },
  progress: {
    margin: theme.spacing(0, 1),
    flexGrow: 1
  }
}));

const Progress = ({ event, className, items, ...rest }) => {
  const classes = useStyles();

  //Bandera para manejar el tipo de progreso
  const showItemProgress = event.items.length;

  // Progreso basado en items completados
  const totalItems = items.length;
  const completedItems = items.filter(item => item.done).length;
  const itemProgress = (completedItems / totalItems) * 100;

  // Progreso basado en fondos recaudados
  const fundProgress =
    (Number(event.funds_collected) / Number(event.goal)) * 100;

  // Determinar qué progreso mostrar
  const progress = showItemProgress ? itemProgress : fundProgress;
  const progressText = showItemProgress
    ? `${completedItems} de ${totalItems} bienes completados`
    : `${numeral(Number(event.funds_collected) / Number(event.goal)).format(
        '0.00%'
      )} del objetivo alcanzado`;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Typography
        component="h3"
        gutterBottom
        variant="overline"
        color="textSecondary"
      >
        Progreso
      </Typography>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Typography variant="h3" color="textPrimary">
          {progressText}
        </Typography>
        <LinearProgress
          className={classes.progress}
          value={progress}
          color="secondary"
          variant="determinate"
        />
      </Box>
    </Card>
  );
};

Progress.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object.isRequired
};

export default Progress;
