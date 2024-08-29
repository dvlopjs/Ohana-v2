import React from 'react';
import {
  makeStyles,
  Paper,
  Typography,
  Box,
  Button,
  Divider
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import moment from 'moment';
import { ListItemsToDonate } from 'src/components/reusable/ListItemsToDonate';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    maxWidth: '600px',
    margin: 'auto'
  },
  title: {
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  section: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  text: {
    fontSize: '0.9rem'
  }
}));

const DonationInstructions = ({ event, handleBack }) => {
  const classes = useStyles();

  const formattedTime = time => moment(time, 'HH:mm:ss').format('hh:mm A');

  return (
    <Paper className={classes.root} elevation={3}>
      <Box
        gridGap={10}
        display={'flex'}
        alignContent={'center'}
        alignItems={'center'}
        className={classes.title}
      >
        <DescriptionIcon />
        <Typography variant="h3">Instrucciones para donar</Typography>
      </Box>
      <Divider />

      <Box className={classes.section}>
        <Typography variant="h4" color="primary">
          - ¿Cómo donar?
        </Typography>
        <Typography className={classes.text} color="textSecondary">
          Puedes realizar tu donación a través de nuestro sitio web o visitando
          nuestras oficinas. ¡Todo bien que tengas y no utilices será muy
          bienvenido!
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.section}>
        <Typography variant="h4" color="primary">
          - Horarios
        </Typography>
        <Typography className={classes.text} color="textSecondary">
          Nuestras oficinas están abiertas para recibir donaciones los
          siguientes días:
        </Typography>
        <ul style={{ paddingLeft: 20 }}>
          {event.attention_schedule.map((x, i) => {
            return (
              <li key={i}>
                <Typography
                  className={classes.text}
                  color="textSecondary"
                  style={{ fontWeight: 'bolder' }}
                >
                  {x.day}: De {formattedTime(x.from_time)} a{' '}
                  {formattedTime(x.to_time)}.
                </Typography>
              </li>
            );
          })}
        </ul>
      </Box>
      <Divider />
      <Box className={classes.section}>
        <Typography variant="h4" color="primary">
          - ¿Qué se necesita?
        </Typography>
        <Typography className={classes.text} color="textSecondary">
          Actualmente la campaña{' '}
          <span style={{ fontWeight: 'bold' }}>{event.name}</span> está
          recolectando los siguientes bienes:
        </Typography>
        <ListItemsToDonate event={event} />
      </Box>
      <Divider />
      <Box
        display={'flex'}
        justifyContent={'center'}
        style={{ paddingTop: 25 }}
      >
        <Button variant="contained" color="primary" onClick={handleBack}>
          Volver
        </Button>
      </Box>
    </Paper>
  );
};

export default DonationInstructions;
