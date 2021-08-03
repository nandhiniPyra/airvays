import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';

const PageLoader = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LinearProgress style={{ width: '80%', maxWidth: 700 }} />
    </Box>
  );
};

export default PageLoader;
