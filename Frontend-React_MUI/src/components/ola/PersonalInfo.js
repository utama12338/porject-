import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import validator from '../ola-custom/Validator';
import TitleList from '../ola-custom/Helper';
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
import HitCountCenter from '../ola-custom/HitCountCenter';
import api from '../../services/api';
import LoadingProgress from '../ola-custom/LoadingProgress';
import AlertBox from '../ola-custom/AlertBox';

function PersonalInfo() {
  const location = useLocation();
  const props = location.state;
  const navigate = useNavigate();

  let appno = null;
  let uuid = null;
  let productSelect= null;
  let sizeDesc= null;
  let product =null;

  if(props!==null){
     appno = props.appno;
     uuid = props.uuid;
     productSelect = props.productSelect;
     sizeDesc = props.sizeDesc;
     product =props.product;
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('0');
  const [idCard, setIdCard] = useState('');
  const [telNo, setTelNo] = useState('');
  const [email, setEmail] = useState('');
  const [checkIdCard, setCheckIdCard] = useState(false);
  const [checkFirstName, setCheckFirstName] = useState(false);
  const [checkTitle, setCheckTitle] = useState(false);
  const [checkLastName, setCheckLastName] = useState(false);
  const [checkTelNo, setCheckTelNo] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');
  const [colorAlert, setColorAlert] = useState('');

  useEffect(() => {
    if(props!==null){
      HitCountCenter.hitCount(props.uuid, props.appno, 'PersonalInfoPage');
    }else{
      navigate('/error');
    }
  }, []);

  const handleChangeIdCard = (e) => {
    setCheckIdCard(validator.validIdCard(e.target.value));
    setIdCard(e.target.value);
  };

  const handleChangeFirstName = (e) => {
    setCheckFirstName(validator.validCharator(e.target.value));
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setCheckLastName(validator.validCharator(e.target.value));
    setLastName(e.target.value);
  };

  const handleChangeTitle = (e) => {
    if (e.target.value !== '0') {
      setCheckTitle(false);
    } else {
      setCheckTitle(true);
    }

    setTitle(e.target.value);
  };

  const handleChangeTelNo = (e) => {
    setCheckTelNo(validator.validMobileNo(e.target.value));
    setTelNo(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setCheckEmail(validator.validEmail(e.target.value));
    setEmail(e.target.value);
  };

  const handleClickReset = () => {
    setIdCard('');
    setCheckIdCard(false);

    setFirstName('');
    setCheckFirstName(false);

    setLastName('');
    setCheckLastName(false);

    setTitle('0');
    setCheckTitle(false);

    setTelNo('');
    setCheckTelNo(false);

    setEmail('');
    setCheckEmail(false);
  };

  const handlePreScreen = () => {
    if (!idCard) {
      setCheckIdCard(true);
    } else if (title === '0') {
      setCheckTitle(true);
    } else if (!firstName) {
      setCheckFirstName(true);
    } else if (!lastName) {
      setCheckLastName(true);
    } else if (!telNo) {
      setCheckTelNo(true);
    } else {
      setLoading(true);
      let params = {
        appNo: appno,
        idCard: idCard,
        title: title,
        firstName: firstName,
        lastName: lastName,
        mymoPhone: telNo,
        productCode: productSelect.productCode,
        email: email,
      };
      api
        .postCustomerScreening(params)
        .then((result) => {
          setLoading(false);
          if (result.status === 200) {
            if (result.data) {
              if (result.data.checkStatus === 'N') {
                let data = {
                  uuid: uuid,
                  appno: appno,
                  email: email,
                  status: true,
                  productSelect: productSelect,
                  product: product
                };

                navigate('/ola/resultScreen', { state: data });
              } else {
                let data = {
                  uuid: uuid,
                  appno: appno,
                  email: '',
                  status: false,
                  productSelect: productSelect,
                  product: product
                };

                navigate('/ola/resultScreen', { state: data });
              }
            } else {
              setShowAlert(true);
              setMsgAlert('ขณะมีผู้ใช้งานเป็นจำนวนมาก กรุณาลองใหม่อีกครั้ง');
              setColorAlert('warning');

              setTimeout(() => setShowAlert(false), 10000);
              console.error(result);
            }
          } else {
            setShowAlert(true);
            setMsgAlert('ขณะมีผู้ใช้งานเป็นจำนวนมาก กรุณาลองใหม่อีกครั้ง');
            setColorAlert('warning');

            setTimeout(() => setShowAlert(false), 10000);
            console.error(result);
          }
        })
        .catch((e) => {
          setLoading(false);
          setShowAlert(true);
          setMsgAlert('ขณะมีผู้ใช้งานเป็นจำนวนมาก กรุณาลองใหม่อีกครั้ง');
          setColorAlert('warning');

          setTimeout(() => setShowAlert(false), 10000);
          console.error("Access Denied : " + e.message);
        });
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={12} md={12} sm={12} sx={{ position: 'relative' }}>
        <Card
          sx={{
            backgroundColor: (theme) => theme.palette.info.contrastText,
          }}
        >
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
                กรุณากรอกข้อมูล เพื่อให้ธนาคารตรวจสอบคุณสมบัติเพิ่มเติม
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
            }}
          >
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel htmlFor="idCard" sx={{ fontSize: '16px', fontWeight: '400' }}>
                    หมายเลขบัตรประชาชน
                  </CustomFormLabel>
                  <CustomTextField
                    inputProps={{ 'data-testid': 'idcard-test' }}
                    id="idCard"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={idCard}
                    onChange={handleChangeIdCard}
                    color={checkIdCard === true ? 'error' : 'success'}
                    error={checkIdCard}
                    required
                    autoComplete="off"
                    sx={{ backgroundColor: '#ffffff', borderRadius: '0.5rem' }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkIdCard ? 'block' : 'none',
                    }}
                  >
                    กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel htmlFor="title" sx={{ fontSize: '16px', fontWeight: '400' }}>
                    คำนำหน้าชื่อ
                  </CustomFormLabel>
                  <CustomSelect
                    inputProps={{ 'data-testid': 'title-test' }}
                    id="title"
                    value={title}
                    onChange={handleChangeTitle}
                    fullWidth
                    variant="outlined"
                    size="small"
                    color={checkTitle === true ? 'error' : 'success'}
                    sx={{ backgroundColor: '#ffffff', borderRadius: '0.5rem' }}
                  >
                    {TitleList.getTilteList().map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkTitle ? 'block' : 'none',
                    }}
                  >
                    กรุณาเลือกคำนำหน้าชื่อ
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel htmlFor="firstName" sx={{ fontSize: '16px', fontWeight: '400' }}>
                    ชื่อ
                  </CustomFormLabel>
                  <CustomTextField
                    inputProps={{ 'data-testid': 'firstName-test' }}
                    id="firstName"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={firstName}
                    onChange={handleChangeFirstName}
                    color={checkFirstName === true ? 'error' : 'success'}
                    error={checkFirstName}
                    autoComplete="off"
                    sx={{ backgroundColor: '#ffffff', borderRadius: '0.5rem' }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkFirstName ? 'block' : 'none',
                    }}
                  >
                    กรุณากรอกชื่อ
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel htmlFor="lastName" sx={{ fontSize: '16px', fontWeight: '400' }}>
                    นามสกุล
                  </CustomFormLabel>
                  <CustomTextField
                    inputProps={{ 'data-testid': 'lastName-test' }}
                    id="lastName"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={lastName}
                    onChange={handleChangeLastName}
                    color={checkLastName === true ? 'error' : 'success'}
                    error={checkLastName}
                    autoComplete="off"
                    sx={{ backgroundColor: '#ffffff', borderRadius: '0.5rem' }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkLastName ? 'block' : 'none',
                    }}
                  >
                    กรุณากรอกนามสกุล
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel htmlFor="telNo" sx={{ fontSize: '16px', fontWeight: '400' }}>
                    หมายเลขโทรศัพท์
                  </CustomFormLabel>
                  <CustomTextField
                    inputProps={{ 'data-testid': 'telno-test' }}
                    id="telNo"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={telNo}
                    onChange={handleChangeTelNo}
                    color={checkTelNo === true ? 'error' : 'success'}
                    error={checkTelNo}
                    autoComplete="off"
                    sx={{ backgroundColor: '#ffffff', borderRadius: '0.5rem' }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkTelNo ? 'block' : 'none',
                    }}
                  >
                    กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <CustomFormLabel htmlFor="telNo" sx={{ fontSize: '16px', fontWeight: '400' }}>
                    อีเมล
                  </CustomFormLabel>
                  <CustomTextField
                    inputProps={{ 'data-testid': 'email-test' }}
                    id="email"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={email}
                    onChange={handleChangeEmail}
                    color={checkEmail === true ? 'error' : 'success'}
                    error={checkEmail}
                    autoComplete="off"
                    sx={{ backgroundColor: '#ffffff', borderRadius: '0.5rem' }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      color: 'red',
                      display: checkEmail ? 'block' : 'none',
                    }}
                  >
                    กรุณากรอกอีเมลให้ถูกต้อง
                  </Typography>
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
                color="primary"
                disabled={
                  !checkIdCard &&
                  !checkFirstName &&
                  !checkLastName &&
                  !checkTelNo &&
                  !checkEmail &&
                  !loading
                    ? false
                    : true
                }
                onClick={handlePreScreen}
              >
                ตรวจสอบคุณสมบัติ
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
export default PersonalInfo;
