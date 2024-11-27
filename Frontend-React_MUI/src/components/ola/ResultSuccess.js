import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Card, CardContent, Typography, Divider } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import imgGirl from '../../assets/images/ola/feedback.png';
import RatingForm from '../ola-custom/RatingForm';
import BoxColorSubject from '../ola-custom/BoxColorSubject';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function ResultSuccess() {
  const location = useLocation();
  const props = location.state;

  return (
    <Card>
      <CardContent>
        <Grid spacing={2} container>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{ position: 'relative', justifyContent: 'center', textAlign: 'center' }}
          >
            <img src={imgGirl} alt="img" width="70%" style={{ borderRadius: '2rem' }} />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ position: 'relative' }}>
            <Box mb={2}>
              <Typography fontWeight="600" variant="h4">
                <Box sx={BoxColorSubject}></Box>
                ผลการตรวจสอบคุณสมบัติเบื้องต้น
              </Typography>
              <Typography fontWeight="200" variant="h6">
                OLA Online Lending Advisor by GSB
              </Typography>
            </Box>
            <Divider />
            <Typography
              mt={1}
              fontWeight="400"
              variant="body1"
              gutterBottom
              data-testid="success-text"
            >
              ธนาคารได้ตรวจสอบคุณสมบัติของท่านเบื้องต้นเรียบร้อยแล้ว
            </Typography>
            <Typography
              mt={1}
              fontWeight="400"
              variant="body1"
              gutterBottom
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              สินเชื่อแนะนำสำหรับคุณ (เบื้องต้น)
            </Typography>
            {props.product.map((row) => (
              <Typography fontWeight="200" variant="body1" gutterBottom>
                <ArrowRightIcon
                  sx={{ color: (theme) => theme.palette.info.main, verticalAlign: 'middle' }}
                />{' '}
                {row.productNameTh}
              </Typography>
            ))}
            <Typography
              mt={5}
              fontWeight="400"
              variant="body1"
              gutterBottom
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              กรุณาเตรียมเอกสารไปติดต่อธนาคารออมสินสาขาใกล้บ้านหรือสาขาที่สะดวกเพื่อยื่นคำขอกู้
            </Typography>
            <Typography fontWeight="400" variant="body1" gutterBottom>
              โดยสามารถเตรียมเอกสารเบื้องต้นดังต่อไปนี้
            </Typography>
            <Typography fontWeight="200" variant="body1" gutterBottom>
              <CheckBoxIcon
                sx={{ color: (theme) => theme.palette.info.main, verticalAlign: 'middle' }}
              />{' '}
              สำเนาบัตรประชาชน
            </Typography>
            <Typography fontWeight="200" variant="body1" gutterBottom>
              <CheckBoxIcon
                sx={{ color: (theme) => theme.palette.info.main, verticalAlign: 'middle' }}
              />{' '}
              สำเนาทะเบียนบ้าน
            </Typography>
            <Typography fontWeight="200" variant="body1" gutterBottom>
              <CheckBoxIcon
                sx={{ color: (theme) => theme.palette.info.main, verticalAlign: 'middle' }}
              />{' '}
              สำเนาสลิปเงินเดือน/เอกสารที่มารายได้
            </Typography>
            <Typography fontWeight="200" variant="body1" gutterBottom>
              <CheckBoxIcon
                sx={{ color: (theme) => theme.palette.info.main, verticalAlign: 'middle' }}
              />{' '}
              เอกสารหลักประกัน หรือสำเนาเอกสารหลักประกัน (ถ้ามี)
            </Typography>
            <Typography
              mb={5}
              fontWeight="200"
              variant="body1"
              gutterBottom
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              กรณีที่ต้องกู้สินเชื่อสุขสันต์ ท่านต้องมีบัญชีธนาคารออมสิน หรือ สลากออมสินพิเศษ
              เพื่อใช้เป็นหลักประกันในการขอกู้สินเชื่อ
            </Typography>
            <Typography mt={1} fontWeight="400" variant="body1" gutterBottom>
              ทั้งนี้ สินเชื่อบางประเภทอาจใช้เอกสารประกอบการยื่นขอสินเชื่อมากกว่าที่ระบุข้างต้น
            </Typography>

            <Box sx={BoxColorSubject}></Box>
            <RatingForm
              mt={2}
              uuid={props.uuid}
              appno={props.appno}
              status={props.status}
              email={props.email}
              productSelect={props.productSelect}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
