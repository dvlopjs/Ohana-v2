import React, { useEffect, useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Switch,
  Typography,
  makeStyles,
  useTheme
} from '@material-ui/core';
import Chart from 'react-apexcharts';

import api from '../../../../api/Api.js';
import { SwitchDoubleLabel } from 'src/components/reusable/SwitchDoubleLabel.js';
import { useGetLastDonations } from './useGetLastDonations.js';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const TopProjects = () => {
  const theme = useTheme();
  const [valueSwitch, setValueSwitch] = useState(false);
  const { lastDonations } = useGetLastDonations({ valueSwitch: valueSwitch });

  const handleChangeSwitch = e => {
    setValueSwitch(e.target.checked);
  };

  //   CHART DATA
  const companies = lastDonations.map(item => item.title);
  const quantityDonations = lastDonations.map(item => item.donations);
  const totalAmountDonations = lastDonations.map(
    item => item.total_donated_amount
  );

  const data = {
    options: {
      chart: {
        type: 'bar',
        background: theme.palette.background.paper,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: [theme.palette.secondary.main],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: companies
      },
      theme: {
        mode: theme.palette.type
      }
    },
    series: [
      {
        name: !valueSwitch ? 'Donaciones' : 'Total',
        data: !valueSwitch ? quantityDonations : totalAmountDonations
      }
    ]
  };
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardContent>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography color="textPrimary" variant="h4">
              Las campañas mas destacadas
            </Typography>
            <SwitchDoubleLabel
              value={valueSwitch}
              labels={{
                label1: 'Cantidad',
                label2: 'Monto'
              }}
              handleChange={handleChangeSwitch}
            />
          </Box>

          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            height="400"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TopProjects;
