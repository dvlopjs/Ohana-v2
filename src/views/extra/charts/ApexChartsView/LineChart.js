import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from '../../../../api/Api.js';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';

const LineChart = () => {
  const theme = useTheme();
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  let [donations, setDonations] = useState(
    Array(12).fill({ month: 0, donations: 0 })
  );

  useEffect(() => {
    donar();
  }, []);

  const donar = async () => {
    try {
      const response = await api.getDonationsByMonth();

      // Crear un arreglo con todos los meses inicializados a 0
      const allMonths = months.map((_, index) => ({
        month: index + 1,
        donations: 0
      }));

      // Actualizar el arreglo con los datos reales
      response.forEach(donation => {
        allMonths[donation.month - 1].donations = donation.donations;
      });

      setDonations(allMonths);
    } catch (err) {
      console.error(err);
    }
  };

  const chart = () => ({
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
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return Math.round(val);
        }
      },
      grid: {
        borderColor: theme.palette.divider,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: theme.palette.text.secondary
        }
      },
      markers: {
        size: 4,
        strokeColors: ['#1f87e6', '#27c6db'],
        strokeWidth: 0,
        shape: 'circle',
        radius: 2,
        hover: {
          size: undefined,
          sizeOffset: 2
        }
      },
      stroke: {
        width: 3,
        curve: 'smooth',
        lineCap: 'butt',
        dashArray: [0, 3]
      },
      theme: {
        mode: theme.palette.type
      },
      tooltip: {
        theme: theme.palette.type,
        y: {
          formatter: function(val) {
            return Math.round(val);
          }
        }
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider
        },
        categories: months,
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: [
        {
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          axisTicks: {
            show: true,
            color: theme.palette.divider
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary
            },
            formatter: function(val) {
              return Math.round(val);
            }
          }
        },
        {
          axisTicks: {
            show: true,
            color: theme.palette.divider
          },
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary
            },
            formatter: function(val) {
              return Math.round(val);
            }
          },
          opposite: true
        }
      ]
    },
    series: [
      {
        name: 'Cantidad de donaciones',
        data: donations.map(d => d.donations)
      }
    ]
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Mis donaciones 💝
        </Typography>
        <Chart type="bar" height="300" {...chart()} />
      </CardContent>
    </Card>
  );
};

export default LineChart;
