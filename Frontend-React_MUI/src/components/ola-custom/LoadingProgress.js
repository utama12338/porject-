import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
export default function LoadingProgress() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <CircularProgress />
    </Box>
  );
}
