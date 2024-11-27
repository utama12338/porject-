import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import LoanSuggestion from '../../components/ola/LoanSuggestion';
import { Grid } from '@mui/material';


function LoanSuggestionPage() {
  return (
    <PageContainer title="OLA - Online Lending Advisor by GSB" description="Loan Suggestion">
      <Grid container spacing={0}>
        <LoanSuggestion />
      </Grid>
    </PageContainer>
  );
}

export default LoanSuggestionPage;
