import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Statistics from './Statistics';
import Progress from './Progress';
import Amounts from './Amounts';
import Actions from './Actions';
import LatestDonations from './LatestDonations';
import api from './../../../api/Api';
import ItemsList from './ItemsList';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const OverviewView = ({ match, history }) => {
  const classes = useStyles();
  const [selectedEvent, setSelectedEvent] = useState();
  const [items, setItems] = useState([]);

  const hasItems = selectedEvent?.items.length;

  const getEvent = async () => {
    try {
      const event = await api.getEventById(match.params.id);
      setSelectedEvent(event);
      setItems(event.items_complete);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);
  return !!selectedEvent ? (
    <Page className={classes.root} title="Overview">
      <Container maxWidth="lg">
        <Header event={selectedEvent} />

        {!hasItems ? (
          <Box mt={3}>
            <Amounts event={selectedEvent} />
          </Box>
        ) : null}

        {hasItems ? (
          <Box mt={3}>
            <ItemsList
              event={selectedEvent}
              items={items}
              setItems={setItems}
            />
          </Box>
        ) : null}

        <Box mt={3}>
          <Progress event={selectedEvent} items={items} />
        </Box>
        <Box mt={6}>
          <Statistics event={selectedEvent} />
        </Box>
        <Box mt={6}>
          <Actions event={selectedEvent} setSelectedEvent={setSelectedEvent} />
        </Box>
        {!hasItems ? (
          <Box mt={6}>
            <LatestDonations event={selectedEvent} />
          </Box>
        ) : null}
      </Container>
    </Page>
  ) : null;
};

export default OverviewView;
