import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import imgGirl from '../../assets/images/ola/thankyou.png';
import HitCountCenter from '../ola-custom/HitCountCenter';

export default function Completed() {
  const location = useLocation();
  const props = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (props !== null) {
      HitCountCenter.hitCount(props.uuid, props.appno, 'CompletedPage');
    } else {
      navigate('/error');
    }
  }, []);

  const handleClickBack = () => {
    navigate('/', { replace: true });
  };

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
              <Typography fontWeight="600" variant="h4" data-testid="text-5">
                เพราะทุกความเห็นของท่านมีความหมาย
              </Typography>
              <Typography fontWeight="200" variant="h6" data-testid="text-6">
                OLA Online Lending Advisor by GSB
              </Typography>
            </Box>
            <Divider />
            <Typography fontWeight="200" variant="h4" data-testid="text-1">
              ความคิดเห็นของท่าน คือสิ่งสำคัญต่อการปรับปรุงบริการของเรา
            </Typography>
            <br />
            <br />
            <Typography fontWeight="200" variant="h5" data-testid="text-2">
              ธนาคารออมสินขอขอบพระคุณท่าน ที่เสียสละเวลาอันมีค่า ประเมินความพึงพอใจในการให้บริการ
            </Typography>
            <Typography
              fontWeight="200"
              variant="h5"
              sx={{ color: '#FF7495' }}
              data-testid="text-3"
            >
              OLA - ระบบแนะนำผลิตภัณฑ์สินเชื่อธนาคารออมสิน
            </Typography>
            <Typography fontWeight="200" variant="h5" data-testid="text-4">
              เพื่อธนาคารจัก ได้นำไปปรับปรุงบริการให้ดียิ่งขึ้นต่อไป
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center" my={2}>
          <Button variant="contained" size="small" color="secondary" onClick={handleClickBack}>
            กลับไปหน้าหลัก
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
