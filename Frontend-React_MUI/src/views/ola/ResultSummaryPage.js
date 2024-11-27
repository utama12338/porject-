import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';
import ResultSuccess from '../../components/ola/ResultSuccess';
import ResultFail from '../../components/ola/ResultFail';
import api from '../../services/api';

function ResultSummaryPage() {
  const location = useLocation();
  const props = location.state;

  useEffect(() => {
    if(props!==null){
      if (props.status) {
        api
          .postHitCounter(props.uuid, props.appno, 'ResultSuccessPage')
          .then((result) => {
            if (result.status === 200) {
              console.info('success hit counter Result Success Page');
            } else {
              console.error("Access Denied : " + result);
            }
          })
          .catch((e) => {
            console.error("Access Denied : " + e.message);
          });
      } else {
        api
          .postHitCounter(props.uuid, props.appno, 'ResultFailPage')
          .then((result) => {
            if (result.status === 200) {
              console.info('success hit counter Result Fail Page');
            } else {
              console.error("Access Denied : " + result);
            }
          })
          .catch((e) => {
            console.error("Access Denied : " + e.message);
          });
      }
    }else{
      navigate('/error');
    }

  }, []);
  return (
    <PageContainer title="OLA - Online Lending Advisor by GSB" description="Result Summary">
      {props.status ? (
        <ResultSuccess
          uuid={props.uuid}
          appno={props.appno}
          status={props.status}
          email={props.email}
          productSelect={props.productSelect}
          product={props.product}
        />
      ) : (
        <ResultFail
          uuid={props.uuid}
          appno={props.appno}
          status={props.status}
          email={props.email}
          productSelect={props.productSelect}
          product={props.product}
        />
      )}
    </PageContainer>
  );
}

export default ResultSummaryPage;
