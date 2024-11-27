import React from 'react';
import { Box, Typography } from '@mui/material';
const pjson = require('../../../package.json');
const Footer = () => (
  <Box sx={{ p: 3, textAlign: 'center' }} >
    <Typography data-testid="credit-test" color="textSecondary">© 2023 Government Savings Bank</Typography>
    <Typography color="textSecondary">{pjson.version}</Typography>
  </Box>
);

export default Footer;
