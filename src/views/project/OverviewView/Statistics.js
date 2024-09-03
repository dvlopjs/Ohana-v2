import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  InputBase,
  makeStyles
} from '@material-ui/core';
import {
  Share2 as ShareIcon,
  Bell as BellIcon,
  Heart as HeartIcon,
  Activity as ActivityIcon
} from 'react-feather';

import ShowChartIcon from '@material-ui/icons/ShowChart';
import CardStaticsTop from 'src/views/extra/charts/ApexChartsView/StaticsTop/CardStaticsTop';
import { CardContentStatics } from 'src/views/extra/charts/ApexChartsView/StaticsTop/CardContentStatics';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none'
    },
    [theme.breakpoints.up('md')]: {
      borderBottom: 'none',
      borderRight: `1px solid ${theme.palette.divider}`,
      '&:last-child': {
        borderRight: 'none'
      }
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  label: {
    marginTop: theme.spacing(1),
    display: 'block'
  }
}));

const Statistics = ({ event, className, ...rest }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={4} sm={4} xs={12}>
          <CardStaticsTop>
            <CardContentStatics
              icon={<ActivityIcon color="#5465D1" />}
              data={event.donations_count || 0}
              text={'Cant. total de donaciones'}
              isLoading={false}
            />
          </CardStaticsTop>
        </Grid>

        <Grid item md={4} sm={4} xs={12}>
          <CardStaticsTop>
            <CardContentStatics
              icon={<ShareIcon color="#5465D1" />}
              data={`${event.shared}`}
              text={'Veces compartido'}
              isLoading={false}
            />
          </CardStaticsTop>
        </Grid>

        <Grid item md={4} sm={4} xs={12}>
          <CardStaticsTop>
            <CardContentStatics
              icon={<HeartIcon color="#5465D1" />}
              data={event.likes_count}
              text={'Me gusta'}
              isLoading={false}
            />
          </CardStaticsTop>
        </Grid>
      </Grid>
    </>
  );
};

Statistics.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object.isRequired
};

export default Statistics;
