import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import api from '../../../api/Api';
import Filter from './Filter';
import Header from './Header';
import Results from './Results';
import CircularProgress from '@material-ui/core/CircularProgress';
import useDebounce from 'src/hooks/useDebounce';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  progress: {
    marginTop: '20vh',
    marginLeft: '32vw'
  }
}));

const ProjectBrowseView = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [pageSize, setPageSize] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 350);
  const [filters, setFilters] = useState([]);
  const [finished, setFinished] = useState(true);

  const handleGetEvents = async () => {
    setLoading(true);
    try {
      const response = await api.getEvents(
        page,
        pageSize,
        debouncedSearchTerm,
        '',
        filters,
        finished
      );
      setEvents(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetEvents();
  }, [debouncedSearchTerm, page, filters, finished]);

  return (
    <Page className={classes.root} title="Explorar campañas | Ohana">
      <Container maxWidth="lg">
        <Header />

        <Box mt={3}>
          <Filter
            inputValue={inputValue}
            setInputValue={setInputValue}
            filters={filters}
            setFilters={setFilters}
            finished={finished}
            setFinished={setFinished}
          />
        </Box>
        {!!loading ? (
          <CircularProgress
            className={classes.progress}
            color="primary"
            size={50}
          />
        ) : (
          <Box mt={4}>
            <Results
              projects={events}
              pageSize={pageSize}
              page={page}
              setPage={setPage}
              setPageSize={setPageSize}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default ProjectBrowseView;
