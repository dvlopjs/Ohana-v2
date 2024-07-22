import { Card, CardContent, Box } from '@material-ui/core';
import React from 'react';

const CardStaticsTop = ({ children }) => {
  return (
    <Card>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="100%"
          >
            {children}
          </Box>
        </CardContent>
      </Card>
    </Card>
  );
};

export default CardStaticsTop;
