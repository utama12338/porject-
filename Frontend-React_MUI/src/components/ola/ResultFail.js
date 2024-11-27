import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Card, CardContent, Typography, Divider } from '@mui/material';
import imgGirl from '../../assets/images/ola/feedback.png';
import RatingForm from '../ola-custom/RatingForm';
import BoxColorSubject from '../ola-custom/BoxColorSubject';

export default function ResultFail() {
  const location = useLocation();
  const props = location.state;

  return (
    <Grid container>
      <Grid item xs={4} lg={4} sx={{ position: 'relative' }}>
        <Card>
          <CardContent>
            <img src={imgGirl} alt="img" width="100%" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8} lg={8} sx={{ position: 'relative' }}>
        <Card
          sx={{
            p: 0,
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
              <Typography fontWeight="600" variant="h4">
                <Box sx={BoxColorSubject}></Box>
                ผลการตรวจสอบคุณสมบัติเบื้องต้น
              </Typography>
              <Typography fontWeight="200" variant="h6">
                OLA Online Lending Advisor by GSB
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent
            sx={{
              padding: '30px',
            }}
          >
            <Typography fontWeight="200" variant="body1" sx={{ color: (theme) => theme.palette.primary.main }} data-testid="fail-text">
              ขออภัย ธนาคารออมสินไม่สามารถอนุมัติสินเชื่อให้ท่านได้ เนื่องจากไม่ผ่านเกณฑ์ของธนาคาร
            </Typography>
            <br />
            <Typography fontWeight="200" variant="body1">
              ขอบคุณที่ไว้วางใจสมัครสินเชื่อธนาคารออมสิน
            </Typography>
            
            <Box sx={BoxColorSubject}></Box>
            <RatingForm
              uuid={props.uuid}
              appno={props.appno}
              status={props.status}
              email={props.email}
              productSelect={props.productSelect}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
