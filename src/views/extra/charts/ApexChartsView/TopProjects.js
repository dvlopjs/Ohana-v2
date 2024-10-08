import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import Chart from 'react-apexcharts';

import { SwitchDoubleLabel } from 'src/components/reusable/SwitchDoubleLabel.js';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const TopProjects = ({ lastDonations }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const [valueSwitch, setValueSwitch] = useState(false);

  const handleChangeSwitch = e => {
    setValueSwitch(e.target.checked);
  };

  //   CHART DATA
  const companies = lastDonations.map(item => item.title);
  const quantityDonations = lastDonations.map(item => item.donations);
  const totalAmountDonations = lastDonations.map(item =>
    Number(item.total_donated_amount)
  );

  const data = {
    options: {
      chart: {
        type: 'pie',
        background: theme.palette.background.paper,
        toolbar: {
          show: false
        }
      },
      labels: companies,
      colors: [
        '#6A7FDB', //Primary
        '#5D8FCD', //Secondary
        '#9C98CE', //Tercero
        '#A3C4F3',
        '#7583B7',
        '#8FA2C9',
        '#606E96',
        '#424C63',
        '#767A8D',
        '#D6E0F0'
      ],
      dataLabels: {
        enabled: true
      },
      tooltip: {
        y: {
          formatter: val => {
            const msjVal = val === 1 ? 'Donación' : 'Donaciones';
            return !valueSwitch ? `${val} ${msjVal}` : `$${val.toFixed(2)}`;
          }
        }
      },
      legend: {
        position: 'bottom'
      },
      theme: {
        mode: theme.palette.type
      }
    },
    series: !valueSwitch ? quantityDonations : totalAmountDonations // Datos de las porciones
  };

  const classes = useStyles();

  return (
    <>
      <Card>
        <CardContent>
          {!isXs ? (
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography color="textPrimary" variant="h4">
                Mis últimas donaciones ⭐
              </Typography>

              <SwitchDoubleLabel
                value={valueSwitch}
                labels={{
                  label1: 'Cantidad',
                  label2: 'Monto'
                }}
                handleChange={handleChangeSwitch}
                isXs={isXs}
              />
            </Box>
          ) : (
            <Box display={'flex'} flexDirection={'column'}>
              <Typography color="textPrimary" variant="h4">
                Mis últimas donaciones ⭐
              </Typography>

              <Box pt={1}>
                <SwitchDoubleLabel
                  value={valueSwitch}
                  labels={{
                    label1: 'Cantidad',
                    label2: 'Monto'
                  }}
                  handleChange={handleChangeSwitch}
                  isXs={isXs}
                />
              </Box>
            </Box>
          )}

          <Chart
            options={data.options}
            series={data.series}
            type="pie" // Cambiado a 'pie' para el gráfico de torta
            height={isXs ? '250' : '400'}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TopProjects;
