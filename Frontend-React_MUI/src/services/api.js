import axios from 'axios';
import * as https from 'agent-base';
const envServ = {};
require('dotenv').config({processEnv: envServ});
console.log(process.env);
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

let caCert =
  '-----BEGIN CERTIFICATE-----MIID3DCCAsSgAwIBAgIJANwrv7F83pj0MA0GCSqGSIb3DQEBCwUAMGYxCzAJBgNVBAYTAlRIMRIwEAYDVQQIDAlQaGF5YVRoYWkxDDAKBgNVBAoMA0dTQjELMAkGA1UECwwCSVQxKDAmBgNVBAMMH0dTQiBJVCBTZWN1cml0eSBJbnRlcm1lZGlhdGUgQ0EwHhcNMjMwNzI2MDM1MjA5WhcNMjgwNzI0MDM1MjA5WjB1MQswCQYDVQQGEwJUSDEQMA4GA1UECAwHQmFuZ2tvazESMBAGA1UEBwwJUGhheWFUaGFpMQwwCgYDVQQKDANHU0IxGDAWBgNVBAsMD0lUIERFViBhbmQgUHJvZDEYMBYGA1UEAwwPKi5tY3MuZ3NiLm9yLnRoMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmkvUYXStxhT1ZZqznV+TedZjNLXK96k7oplkN8rsqVmguFHogL+W0UvZlbexXqk7T0QlGGIgKyClaNYCQ86zmqMRe+LxsqXLdyEpibMjTZjrMdWQ1efJvmVfRYjarCm3W/6MR/B8kRqw7chnuRob17Kb5RFTzcSwaFsRDdh+LpyXL02Ahyvn9NNflNyR8gYpMJFtKGTlTXjnr8yz71YXzsWtL5KPR1X3kdvFmWmEHukIJd0xqDtCIB0l3vOKVEQoGLJZaDcH/Qj+W0xJ0KjB3q1rYfbWUJNQqR8NMcvb9hGg/HU8UoV778wwyNhpWBtDbRDd13y07SZuAc5dDgLyFQIDAQABo34wfDB6BgNVHREEczBxghcqLmFwcHMubWNzLWRjLmdzYi5vci50aIIXKi5hcHBzLm1jcy1kci5nc2Iub3IudGiCDyoubWNzLmdzYi5vci50aIISKi5tY3Mtc2IuZ3NiLm9yLnRoghgqLmFwcHMubWNzLWRldi5nc2Iub3IudGgwDQYJKoZIhvcNAQELBQADggEBAEAgN0FR77Fz0aP+MLKDgegOih7bXfb2ytUzBPeRwxA2p9h3Aj8XNX0JN1h1Qfm6Bp+BJAKwLpTOLWeS4V1WS2nM57fTpL6xSphoQLBt2Iv3WhVQWgM0hp+wGFBwZYvVO3Ycq9fgIpMMGSDv5PsuShxyiQ4Ufo67e8uwURikw6smINmkkSXFxcy4tgkmy9IEUERaYudgb1fBamh2jochowHLH5j/azPkftJyiX1Pvp4d3g471wEXCtGFyIZnl1mj/1+f9V9rpAnTkUhewYjBFvRJGJ/qgEseCjIjiu3mS/xDP9k6CHUen5xMcTICHLpJ/L5MiWLSvKvMPTyjCRx2vUc=-----END CERTIFICATE-----';

const agent = new https.Agent({
  rejectUnauthorized: false,
  ca: caCert,
});

const postHitCounter = (uuid, appno, pagename) => {
  let params = {
    uuid: uuid,
    appNo: appno,
    stepName: pagename,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': apiKey,
  };

  return axios.post(apiUrl + '/api/v1/ola/hitCounter', params, {
    headers: headers,
    httpsAgent: agent,
  });
};

const getLoanSize = () => {
  return axios.get(apiUrl + '/api/v1/ola/loanSize', {
    headers: { 'Authorization': apiKey }
  });
};

const getOccupation = () => {
  return axios.get(apiUrl + '/api/v1/ola/occupation', {
    headers: { 'Authorization': apiKey },
    httpsAgent: agent,
  });
};

const getLoanObjective = () => {
  return axios.get(apiUrl + '/api/v1/ola/loanObj', {
    headers: { 'Authorization': apiKey },
    httpsAgent: agent,
  });
};

const postSendMail = (appno, email) => {
  let params = {
    appNo: appno,
    customerEmail: email,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': apiKey,
  };

  return axios.post(apiUrl + '/api/v1/ola/sendEmail', params, {
    headers: headers,
    httpsAgent: agent,
  });
};

const getAppNo = () => {
  return axios.get(apiUrl + '/api/v1/ola/appNo', {
    headers: { 'Authorization': apiKey },
    httpsAgent: false,
  });
};

const postLoanSuggestion = (
  appNo,
  sizeCode,
  occupationCode,
  totalIncome,
  dateOfBirth,
  totalDebt,
  loanObjectiveCode,
) => {
  let params = {
    appNo: appNo,
    sizeCode: sizeCode,
    occupationCode: occupationCode,
    totalIncome: totalIncome,
    dateOfBirth: dateOfBirth,
    totalDebt: totalDebt,
    loanObjectiveCode: loanObjectiveCode,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': apiKey,
  };

  return axios.post(apiUrl + '/api/v1/ola/saveAndCalcProduct', params, {
    headers: headers,
    httpsAgent: agent,
  });
};

const postSaveScoreRate = (appno, score, comment) => {
  let params = {
    appNo: appno,
    score: score,
    comment: comment,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': apiKey,
  };

  return axios.post(apiUrl + '/api/v1/ola/saveVote', params, {
    headers: headers,
    httpsAgent: agent,
  });
};

const postCustomerScreening = (params) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: apiKey,
  };

  return axios.post(apiUrl + '/api/v1/ola/saveAndCustScreening', params, {
    headers: headers,
    httpsAgent: agent,
  });
};

export default {
  postHitCounter,
  getLoanSize,
  getOccupation,
  getLoanObjective,
  postSendMail,
  postLoanSuggestion,
  postSaveScoreRate,
  getAppNo,
  postCustomerScreening,
};
