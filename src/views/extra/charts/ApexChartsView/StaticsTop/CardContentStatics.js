import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const CardContentStatics = ({ icon, data, text }) => {
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        alignContent={'center'}
        flexWrap={'wrap'}
        style={{ gap: 5 }}
      >
        {icon}

        <Typography>{data || 0}</Typography>
      </Box>
      <Typography
        variant="overline"
        color="textSecondary"
        style={{ paddingTop: '5px' }}
      >
        {text}
      </Typography>
    </>
  );
};
