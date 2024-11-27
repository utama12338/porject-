import React, { useEffect, useState } from 'react';
import PageContainer from '../../components/container/PageContainer';
import LoanSize from '../../components/ola/LoanSize';
import { Grid } from '@mui/material';
import SlideBanner from '../../components/ola/SlideBanner';
import SystemInformation from '../../components/ola/SystemInformation';
import api from '../../services/api';
const { v4: uuidv4 } = require('uuid');

function LoanSizePage() {
  const uuid = uuidv4();
  const [appno, setAppno] = useState('');

  useEffect(() => {
    api
      .getAppNo()
      .then((resultAppNo) => {
        if (resultAppNo.status === 200) {
          setAppno(resultAppNo.data.appNo);

          api
            .postHitCounter(uuid, resultAppNo.data.appNo, 'LoansizePage')
            .then((result) => {
              if (result.status === 200) {
                console.info('success hit counter Loan Size Page');
              } else {
                console.error('Access Denied : ' + result);
              }
            })
            .catch((e) => {
              console.error('Access Denied : ' + e.message);
            });
        } else {
          console.error('Access Denied : ' + resultAppNo);
        }
      })
      .catch((e) => {
        console.error('Access Denied : ' + e.message);
      });
  }, []);

  return (
    <PageContainer title="OLA - Online Lending Advisor by GSB" description="Loan size/Loan amount">
      <SlideBanner />
      <LoanSize uuid={uuid} appno={appno} />
      <SystemInformation />
    </PageContainer>
  );
}

export default LoanSizePage;
