import React from 'react';
import imgBanner from '../../assets/images/ola/contactUs/contactus_ola_mini.png';
import imgBannerBottom from '../../assets/images/ola/contactUs/banner-pqr_w.png';
import imgBrachService from '../../assets/images/ola/contactUs/branchservice_mini.png';
import imgMap from '../../assets/images/ola/contactUs/gsbmap-1.jpg';
import { Box, Divider, Typography, Grid, Link  } from '@mui/material';
import BoxColorSubject from '../ola-custom/BoxColorSubject';
function ContactUs() {
  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <img
          src={imgBanner}
          alt="img"
          width="100%"
          style={{ borderRadius: '2.5rem 2.5rem 0rem 0rem' }}
        />
      </Box>

      <Box
        sx={{ textAlign: 'center', border: '1px solid #DBDBDB', borderRadius: '1rem', p: '2rem' }}
      >
        <Box sx={BoxColorSubject}></Box>
        <Typography variant="h4" fontWeight="700" textAlign="left" data-testid="text-gsb-name">
          ธนาคารออมสินสำนักงานใหญ่
        </Typography>
        <Typography variant="h6" textAlign="left" mb={2}>
          470 ถนนพหลโยธิน แขวงสามเสนใน เขตพญาไท กรุงเทพมหานคร 10400
        </Typography>
        <Divider light />

        <Grid my={1} container spacing={2}>
          <Grid item md={6} xs={12}>
            <img src={imgMap} alt="img" width="100%" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              variant="h4"
              fontWeight="700"
              textAlign="left"
              sx={{ color: (theme) => theme.palette.info.main }}
            >
              ติดต่อเรา
            </Typography>
            <Typography mt={2} variant="body2" textAlign="left">
              <b>Call Center</b> : 1115
            </Typography>
          </Grid>
        </Grid>
        <Link href='https://gsbqr.gsb.or.th/qrm/website' target="_blank"><img src={imgBannerBottom} alt="img" width="100%" /></Link>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          border: '1px solid #DBDBDB',
          borderRadius: '1rem',
          p: '2rem',
          my: '2rem',
        }}
      >
        <Box sx={BoxColorSubject}></Box>
        <Typography variant="h4" fontWeight="700" textAlign="left" data-testid="text-branch-name">
          สาขา / จุดให้บริการ
        </Typography>

        <Divider light />
        <Box mt={2}>
        <Link href='https://www.gsb.or.th/contacts/gsbbranch/' target="_blank"><img src={imgBrachService} alt="img" width="100%" /></Link>
        </Box>
      </Box>
    </>
  );
}
export default ContactUs;
