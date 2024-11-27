import React from 'react';
import { Stack, Alert } from '@mui/material';
export default function AlertBox(props) {
  return (
    <>
      <Stack spacing={1}>
        <Alert variant="filled" severity={props.color}>
          {props.message}
        </Alert>
      </Stack>
    </>
  );
}
