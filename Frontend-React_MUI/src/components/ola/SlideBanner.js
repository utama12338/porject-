import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Grid } from '@mui/material';
import ola_banner from '../../assets/images/ola/banner-slide/ola-test.png';

export default function SimpleSlider() {
  return (
    <>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Box
            sx={{
              objectFit: 'cover',
              maxWidth: 800,
            }}
          >
            <img src={ola_banner} alt="img" width="100%" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
