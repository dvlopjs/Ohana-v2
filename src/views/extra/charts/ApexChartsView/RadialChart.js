import React from 'react';
import Chart from 'react-apexcharts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme
} from '@material-ui/core';
import { useGetCompaniesEnded } from './hooks/useGetCompaniesEnded';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
const RadialChart = () => {
  const theme = useTheme();
  const { companiesEnded } = useGetCompaniesEnded();

  const data = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: false
      },
      colors: [theme.palette.secondary.main],
      labels: ['Campañas'],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%'
          },
          dataLabels: {
            name: {
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary
            },
            value: {
              color: theme.palette.text.secondary
            }
          },
          track: {
            background: theme.palette.background.dark
          }
        }
      },
      theme: {
        mode: theme.palette.type
      }
    },
    series: [companiesEnded.percentage_finished]
  };

  return (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Mis campañas finalizadas ✅
        </Typography>

        <Chart
          options={data.options}
          series={data.series}
          type="radialBar"
          height="200"
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems={'center'}
          alignContent={'center'}
        >
          <Typography variant="subtitle1" color="textSecondary">
            ✦ Total de campañas: <span>{companiesEnded.total_events}</span>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ✦ Campañas completadas:{' '}
            <span> {companiesEnded.finished_events}</span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RadialChart;
