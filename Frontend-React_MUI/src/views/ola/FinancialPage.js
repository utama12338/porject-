import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import FinaacialInfo from '../../components/ola/FinancialInfo';

function FinancialPage() {
  return (
    <PageContainer title="OLA - Online Lending Advisor by GSB" description="Financial Information">
      <FinaacialInfo />
    </PageContainer>
  );
}

export default FinancialPage;
