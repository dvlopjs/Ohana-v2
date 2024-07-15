import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Grid, Hidden, Typography, makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FromToDate from './FromToDate';
// import { FromToDate } from './FromToDate';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0'
  },
  action: {
    backgroundColor: theme.palette.common.white
  },
  image: {
    width: '250px',
    borderRadius: '10%',
    maxHeight: '250px',
    maxWidth: '250px',
    height: 'auto'
  },
  grid: {
    marginTop: 5
  },
  divImage: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const Header = ({ event, className, ...rest }) => {
  const classes = useStyles();

  const emptyImage =
    'https://www.argentina.gob.ar/sites/default/files/vinetas_justicia_cerca_04_quiero_donar_mis_organos.png';

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid alignItems="center" container justify="space-between" spacing={3}>
        <Grid item md={6} xs={12}>
          <div className={classes.firstDiv}>
            <Typography variant="overline" color="textSecondary">
              {!!event.category ? event.category.name : 'Personas'}
            </Typography>
            <Typography variant="h3" color="textPrimary">
              {event.name}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary">
              {event.description.replace(/<\/?[^>]+(>|$)/g, '')}
            </Typography>
          </div>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={3}
            className={classes.grid}
          >
            <Grid item>
              <FromToDate label={'Fecha inicio'} date={event.init_date} />
            </Grid>
            <Grid item>
              <FromToDate label={'Fecha fin'} date={event.end_date} />
            </Grid>
            <Grid item>
              <Typography variant="h5" color="textPrimary">
                {event.location.street}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ubicación
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color="textPrimary">
                {event.event_type.name === 'Monetary' ? 'Monetaria' : 'Física'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Tipo
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item md={6} className={classes.divImage}>
            <img
              alt="Cover"
              className={classes.image}
              src={event.image ? event.image : emptyImage}
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
