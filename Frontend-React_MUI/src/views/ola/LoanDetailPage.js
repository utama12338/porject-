import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import LoanDetail from '../../components/ola/LoanDetail';
export default function LoanDetailPage(){
    return(
    <PageContainer title="OLA - Online Lending Advisor by GSB" description="Landing Page">
      <LoanDetail />
    </PageContainer>
    );
}