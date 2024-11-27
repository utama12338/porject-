import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, CardActions, Button, Box } from '@mui/material';
import TableLoanSuggestion from './TableLoanSuggestion';
import HitCountCenter from '../ola-custom/HitCountCenter';
import BoxColorSubject from '../ola-custom/BoxColorSubject';

function LoanSuggestion() {
  const location = useLocation();
  const props = location.state;

  useEffect(() => {
    if (props !== null) {
      HitCountCenter.hitCount(props.uuid, props.appno, 'LoanSuggestionPage');
    } else {
      navigate('/error');
    }
  }, []);
  return (
    <Grid item xs={12} lg={12} sm={12} md={12}>
      <Card>
        <CardContent>
          <Typography variant="h4" fontWeight="700" textAlign="left">
            สินเชื่อแนะนำสำหรับคุณ
          </Typography>
          <Box sx={BoxColorSubject}></Box>
          {props.product.map((row) => (
            <TableLoanSuggestion
              key={row.productCode}
              row={row}
              uuid={props.uuid}
              appno={props.appno}
              product={props.product}
              sizeCode={props.sizeCode}
              sizeDesc={props.sizeDesc}
              occpt={props.occpt}
              totalIncome={props.totalIncome}
              dob={props.dob}
              totalExpensesAndDebt={props.totalExpensesAndDebt}
              loanObj={props.loanObj}
            />
          ))}
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item xs={12} lg={4} sm={6}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                to="/ola/loansize"
                component={Link}
              >
                ย้อนกลับ
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default LoanSuggestion;
