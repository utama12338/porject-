import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import PersonalInfo from '../../components/ola/PersonalInfo';

function FinancialPage() {
  return (
    <PageContainer title="OLA - Online Lending Advisor by GSB" description="Personal Information">
      <PersonalInfo />
    </PageContainer>
  );
}

export default FinancialPage;
