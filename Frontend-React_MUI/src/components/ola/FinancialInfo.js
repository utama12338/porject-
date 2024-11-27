import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  MenuItem,
  Button,
} from '@mui/material';
import CustomTextField from '../forms/custom-elements/CustomTextField';
import CustomSelect from '../forms/custom-elements/CustomSelect';
import CustomFormLabel from '../forms/custom-elements/CustomFormLabel';
import CustomCheckbox from '../forms/custom-elements/CustomCheckbox';
import dayjs from 'dayjs';
import api from '../../services/api';
import Validator from '../ola-custom/Validator';
import HitCountCenter from '../ola-custom/HitCountCenter';
import LoadingProgress from '../ola-custom/LoadingProgress';
import { OlaDatePicker } from '../ola-custom/OlaDatePicker';
import ConsentDialog from '../ola-custom/ConsentDialog';
import AlertBox from '../ola-custom/AlertBox';

function FinaacialInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const props = location.state;

  let appno = null;
  let uuid = null;
  let sizeCode = null;
  let sizeDesc = null;

  if (props !== null) {
    appno = props.appno;
    uuid = props.uuid;
    sizeCode = props.sizeCode;
    sizeDesc = props.sizeDesc;
  }

  const maxDob = dayjs().subtract(20, 'year');
  const todayDob = dayjs(new Date()).add(-20, 'year').format('YYYY-MM-DD');
  const [objectiveList, setObjectiveList] = useState([]);
  const [occupationList, setOccupationList] = useState([]);

  const [objective, setObjective] = useState(0);
  const [occupation, setOccupation] = useState('-');
  const [totalIncome, setTotalIncome] = useState('');
  const [dob, setDob] = useState(todayDob);
  const [totalExpensesAndDebt, setTotalExpenseeAndDebt] = useState('');
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [checkObjective, setCheckObjective] = useState(false);
  const [checkOccupation, setCheckOccupation] = useState(false);
  const [checkTotalIncome, setCheckTotalIncome] = useState(false);
  const [checkTotalExpensesAndDebt, setCheckTotalExpensesAndDebt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');
  const [colorAlert, setColorAlert] = useState('');

  useEffect(() => {
    if (props !== null) {
      HitCountCenter.hitCount(props.uuid, props.appno, 'FinancialInfoPage');
    } else {
      navigate('/error');
    }

    api
      .getOccupation()
      .then((result) => {
        setOccupationList(
          result.data.occupation.sort((a, b) => (a.occupationDesc > b.occupationDesc ? 1 : -1)),
        );
      })
      .catch((e) => {
        console.error('Access Denied : ' + e.message);
      });

    api
      .getLoanObjective()
      .then((result) => {
        setObjectiveList(
          result.data.loanObjective.sort((a, b) =>
            a.loanObjectiveDesc > b.loanObjectiveDesc ? 1 : -1,
          ),
        );
      })
      .catch((e) => {
        console.error('Access Denied : ' + e.message);
      });
  }, []);

  const handleChangeObjective = (e) => {
    if (e.target.value !== '0') {
      setCheckObjective(false);
    } else {
      setCheckObjective(true);
    }

    setObjective(e.target.value);
  };

  const handleChangeOccupation = (e) => {
    if (e.target.value !== '-') {
      setCheckOccupation(false);
    } else {
      setCheckOccupation(true);
    }

    setOccupation(e.target.value);
  };

  const handleChangeTotalIncome = (e) => {
    setCheckTotalIncome(Validator.validNumber(e.target.value));
    setTotalIncome(e.target.value);
  };

  const handleChangeTotalExpensesAndDebt = (e) => {
    setCheckTotalExpensesAndDebt(Validator.validNumber(e.target.value));
    setTotalExpenseeAndDebt(e.target.value);
  };

  const handleClickReset = () => {
    setObjective('0');
    setCheckObjective(false);

    setOccupation('-');
    setCheckOccupation(false);

    setDob(todayDob);

    setTotalIncome('');
    setCheckTotalIncome(false);

    setTotalExpenseeAndDebt('');
    setCheckTotalExpensesAndDebt(false);
  };

  const handleChangeAgreeConsent = (e) => {
    setAgreeConsent(e.target.checked);
    if (e.target.checked) {
      setAgreeConsent(true);
    } else {
      setAgreeConsent(false);
    }
  };

  const handleClickLoanSuggest = () => {
    if (objective == '0' || objective === 0) {
      setCheckObjective(true);
    } else if (occupation === '-') {
      setCheckOccupation(true);
    } else if (!totalIncome) {
      setCheckTotalIncome(true);
    } else if (!totalExpensesAndDebt) {
      setCheckTotalExpensesAndDebt(true);
    } else {
      setLoading(true);
      api
        .postLoanSuggestion(
          appno,
          sizeCode,
          parseInt(occupation),
          parseInt(totalIncome),
          dob,
          parseInt(totalExpensesAndDebt),
          parseInt(objective),
        )
        .then((result) => {
          setLoading(false);
          if (result.status === 200) {
            if (result.data) {
              let data = {
                sizeCode: props.sizeCode,
                sizeDesc: props.sizeDesc,
                loanObj: parseInt(objective),
                occpt: parseInt(occupation),
                dob: dob,
                totalIncome: parseInt(totalIncome),
                totalExpensesAndDebt: parseInt(totalExpensesAndDebt),
                consent: agreeConsent,
                uuid: uuid,
                appno: appno,
                product: result.data.product,
              };

              navigate('/ola/loansuggest', { state: data });
            } else {
              setShowAlert(true);
              setMsgAlert(
                'ขออภัย คุณสมบัติของท่านไม่ตรงกับผลิตภัณฑ์สินเชื่อของธนาคาร ต้องการข้อมูลเพิ่มติดต่อ โทร. 1115',
              );
              setColorAlert('warning');

              setTimeout(() => setShowAlert(false), 10000);
              console.error('Access Denied : ' + result);
            }
          }
        })
        .catch((e) => {
          setLoading(false);
          setShowAlert(true);
          if (
            e.response.data.responseCode === 500 &&
            e.response.data.errorMessage === 'NullPointerException'
          ) {
            setMsgAlert(
              'ขออภัย คุณสมบัติของท่านไม่ตรงกับผลิตภัณฑ์สินเชื่อของธนาคาร ต้องการข้อมูลเพิ่มติดต่อ โทร. 1115',
            );
            console.error('Access Denied : ' + e.response.data.errorMessage);
          } else {
            setMsgAlert('ขณะมีผู้ใช้งานเป็นจำนวนมาก กรุณาลองใหม่อีกครั้ง');
            console.error('Access Denied : ' + e.message);
          }

          setColorAlert('warning');
          setTimeout(() => setShowAlert(false), 10000);
        });
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={12} md={12} sm={12} sx={{ position: 'relative', display: 'flex' }}>
        <Card>
          <Box
            sx={{
              padding: '15px 30px',
            }}
            display="flex"
            alignItems="center"
          >
            <Box flexGrow={1}>
              <Typography variant="h4" sx={{ color: (theme) => theme.palette.primary.main }}>
                วงเงิน {sizeDesc}
              </Typography>
              <Typography fontWeight="600" variant="h4">
                กรุณาระบุข้อมูล
              </Typography>
              <Typography fontWeight="200" variant="h6">
                กรอกให้ตรงกับความเป็นจริง เพื่อให้ได้ผลที่ใกล้เคียงที่สุด
              </Typography>
            </Box>
          </Box>
          <Divider />

          <CardContent
            sx={{
              padding: '30px',
              width: '100%',
              display: 'flex',
            }}
          >
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel htmlFor="objective" sx={{ fontSize: '16px', fontWeight: '400' }}>
                    วัตถุประสงค์การใช้เงิน
                  </CustomFormLabel>
                  <CustomSelect
                    inputProps={{
                      'aria-label': 'Select Option Objective',
                      'data-testid': 'select-obj-test',
                    }}
                    id="objective"
                    value={objective}
                    onChange={handleChangeObjective}
                    fullWidth
                    variant="outlined"
                    size="small"
                    color={checkObjective === true ? 'error' : 'success'}
                  >
                    <MenuItem key={0} value={0}>
                      กรุณาเลือกวัตถุประสงค์การใช้เงิน
                    </MenuItem>
                    {objectiveList.map((option) =>
                      props.sizeCode === 'S' && option.sizeS === 'Y' ? (
                        <MenuItem key={option.loanObjectiveCode} value={option.loanObjectiveCode}>
                          {option.loanObjectiveDesc}
                        </MenuItem>
                      ) : props.sizeCode === 'M' && option.sizeM === 'Y' ? (
                        <MenuItem key={option.loanObjectiveCode} value={option.loanObjectiveCode}>
                          {option.loanObjectiveDesc}
                        </MenuItem>
                      ) : props.sizeCode === 'L' && option.sizeL === 'Y' ? (
                        <MenuItem key={option.loanObjectiveCode} value={option.loanObjectiveCode}>
                          {option.loanObjectiveDesc}
                        </MenuItem>
                      ) : null,
                    )}
                  </CustomSelect>
                  <Typography
                    data-testid="checkObjectiveText"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkObjective ? 'block' : 'none',
                    }}
                  >
                    กรุณาเลือกวัตถุประสงค์การใช้เงิน
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel
                    htmlFor="occupation"
                    sx={{ fontSize: '16px', fontWeight: '400' }}
                  >
                    อาชีพ
                  </CustomFormLabel>
                  <CustomSelect
                    inputProps={{
                      'aria-label': 'Select Option Occupation',
                      'data-testid': 'select-occt-test',
                    }}
                    id="occupation"
                    value={occupation}
                    onChange={handleChangeOccupation}
                    fullWidth
                    variant="outlined"
                    size="small"
                    color={checkOccupation === true ? 'error' : 'success'}
                  >
                    <MenuItem key="-" value="-">
                      กรุณาเลือกอาชีพ
                    </MenuItem>
                    {occupationList.map((option) => (
                      <MenuItem key={option.occupationCode} value={option.occupationCode}>
                        {option.occupationDesc}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkOccupation ? 'block' : 'none',
                    }}
                  >
                    กรุณาเลือกอาชีพ
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel htmlFor="dob" sx={{ fontSize: '16px', fontWeight: '400' }}>
                    วันเดือนปีเกิด (กรุณาระบุให้ครบ)
                  </CustomFormLabel>
                  <OlaDatePicker
                    value={dob}
                    onChange={(christDate, buddhistDate) => setDob(buddhistDate)}
                    placeholder={'วันเดือนปีเกิด'}
                    dateFormat={'yyyy-MM-dd'}
                    displayFormat={'DD MMMM YYYY'}
                    clearable={true}
                    maxDate={maxDob}
                    disabled={false}
                    readOnly={false}
                    yearBoundary={99}
                  />
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel
                    htmlFor="totalIncome"
                    sx={{ fontSize: '16px', fontWeight: '400' }}
                  >
                    รายได้ทั้งหมดต่อเดือน (เช่น รายได้หลักและรายได้เสริม หรือ รายได้หลักรวมโบนัส)
                  </CustomFormLabel>
                  <CustomTextField
                    inputProps={{ 'data-testid': 'income-input-test' }}
                    id="totalIncome"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={totalIncome}
                    onChange={handleChangeTotalIncome}
                    color={checkTotalIncome === true ? 'error' : 'success'}
                    error={checkTotalIncome}
                    autoComplete="off"
                  />
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkTotalIncome ? 'block' : 'none',
                    }}
                  >
                    กรุณากรอกรายได้ทั้งหมดต่อเดือน
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel
                    htmlFor="totalExpensesAndDebt"
                    sx={{ fontSize: '16px', fontWeight: '400' }}
                  >
                    ค่าใช้จ่ายและภาระหนี้ทั้งหมดต่อเดือน
                  </CustomFormLabel>
                  <CustomTextField
                    inputProps={{ 'data-testid': 'debt-input-test' }}
                    id="totalExpensesAndDebt"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={totalExpensesAndDebt}
                    onChange={handleChangeTotalExpensesAndDebt}
                    color={checkTotalExpensesAndDebt === true ? 'error' : 'success'}
                    error={checkTotalExpensesAndDebt}
                    autoComplete="off"
                  />
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkTotalExpensesAndDebt ? 'block' : 'none',
                    }}
                  >
                    กรุณากรอกค่าใช้จ่ายและภาระหนี้ทั้งหมดต่อเดือน
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomCheckbox
                    color="default"
                    inputprops={{ 'aria-label': 'checkbox with default color' }}
                    onChange={handleChangeAgreeConsent}
                    sx={{ fontSize: '16px', fontWeight: '400' }}
                  />
                  ข้าพเจ้ายอมรับข้อตกลงและเงื่อนไขการใช้งานระบบแนะนำสินเชื่อธนาคารออมสิน (Term &
                  Condition) <ConsentDialog />
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  {showAlert && <AlertBox color={colorAlert} message={msgAlert} />}
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  {loading ? <LoadingProgress /> : null}
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center" my={2}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                to="/ola/loansize"
                component={Link}
              >
                ย้อนกลับ
              </Button>
              &nbsp;
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={handleClickLoanSuggest}
                disabled={
                  agreeConsent &&
                  !checkObjective &&
                  !checkOccupation &&
                  !checkTotalIncome &&
                  !checkTotalExpensesAndDebt &&
                  !loading
                    ? false
                    : true
                }
              >
                สินเชื่อที่เหมาะกับคุณ
              </Button>
              &nbsp;
              <Button variant="contained" size="small" color="secondary" onClick={handleClickReset}>
                ล้างข้อมูล
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FinaacialInfo;
