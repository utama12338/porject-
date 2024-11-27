import React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default StyledRating;
