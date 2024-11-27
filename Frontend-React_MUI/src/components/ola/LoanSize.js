import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Link } from 'react-router-dom';
import sizeS from '../../assets/images/ola/loan-size/size_s_300.jpg';
import sizeM from '../../assets/images/ola/loan-size/size_m_300.jpg';
import sizeL from '../../assets/images/ola/loan-size/size_l_300.jpg';
import api from '../../services/api';

export default function LoanSize(props) {
  const [loanSize, setLoanSize] = useState([]);
  useEffect(() => {
    api
      .getLoanSize()
      .then((result) => {
        setLoanSize(result.data.loanSize);
      })
      .catch((e) => {
        console.error('Access Denied : ' + e.message);
      });
  }, []);

  return (
    <>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {loanSize.map((product) => (
            <Card sx={{ display: 'flex',  maxWidth: 800 }} key={product.sizeCode}>
              <CardMedia
                component="img"
                sx={{ maxWidth: 140 }}
                image={product.sizeCode === 'S' ? sizeS : product.sizeCode === 'M' ? sizeM : sizeL}
                alt={product.sizeCode}
              />

              <CardActionArea
                to="/ola/financeInfo"
                state={{
                  sizeCode: product.sizeCode,
                  sizeDesc: product.sizeDesc,
                  uuid: props.uuid,
                  appno: props.appno,
                }}
                component={Link}
              >
                <CardContent sx={{ maxWidth: 200 }}>
                  <Typography
                    variant="h6"
                    textAlign="left"
                    sx={{ color: (theme) => theme.palette.grey.A200 }}
                  >
                    วงเงิน (บาท)
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="900"
                    sx={{ color: (theme) => theme.palette.primary.main }}
                  >
                    {product.sizeDesc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
