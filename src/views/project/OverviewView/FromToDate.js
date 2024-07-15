import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';

const FromToDate = ({ label, date }) => {
  return (
    <>
      <Typography variant="h5" color="textPrimary">
        {label}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {moment(date).format('DD/MM/YYYY')}
      </Typography>
    </>
  );
};

FromToDate.propTypes = {
  label: PropTypes.string,
  date: PropTypes.string
};

export default FromToDate;
