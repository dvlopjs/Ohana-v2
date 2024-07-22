import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Share2 as ShareIcon,
  Bell as BellIcon,
  Heart as HeartIcon
} from 'react-feather';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CardStaticsTop from './CardStaticsTop';
import { CardContentStatics } from './CardContentStatics';

const StaticsTop = ({ totalQuantityDonations, totalDonated }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={4} sm={4} xs={12}>
        <CardStaticsTop>
          <CardContentStatics
            icon={<HeartIcon color="#5465D1" />}
            data={totalQuantityDonations}
            text={'Cant. total de donaciones'}
          />
        </CardStaticsTop>
      </Grid>

      <Grid item md={4} sm={4} xs={12}>
        <CardStaticsTop>
          <CardContentStatics
            icon={<LocalAtmIcon style={{ color: '#5465D1' }} />}
            data={`$ ${totalDonated}`}
            text={'Monto total de donaciones'}
          />
        </CardStaticsTop>
      </Grid>

      <Grid item md={4} sm={4} xs={12}>
        <CardStaticsTop>
          <CardContentStatics
            icon={<BellIcon color="#5465D1" />}
            data={0}
            text={'Campañas activas'}
          />
        </CardStaticsTop>
      </Grid>
    </Grid>
  );
};

export default StaticsTop;
