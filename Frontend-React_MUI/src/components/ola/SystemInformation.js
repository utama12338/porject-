import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
export default function SystemInformation() {
  return (
    <>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Box
            mb={3}
            sx={{
              backgroundColor: 'primary.main',
              textAlign: 'left',
              p: '2rem',
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: '#ffffff' }}
              data-testid={'text-test-1'}
            >
              หมายเหตุ
            </Typography>
            <Typography sx={{ color: '#ffffff' }}>
              1. ผลลัพธ์เป็นเพียงตัวเลขประมาณการเท่านั้น
            </Typography>
            <Typography sx={{ color: '#ffffff' }}>
              2. การคำนวณนี้ไม่ได้คำนึงถึงคุณสมบัติของผู้กู้
              ซึ่งการพิจารณาเงินกู้ต้องเป็นไปตามเงื่อนไขที่ผู้ให้กู้กำหนด
              ดังนั้นจึงควรสอบถามรายละเอียดเพิ่มเติม
            </Typography>
            <Typography sx={{ color: '#ffffff' }}>
              3. การคำนวณนี้กำหนดให้
            </Typography>
            <Typography sx={{ color: '#ffffff' }}>
              - ใช้หลักการคิดดอกเบี้ยแบบลดต้นลดดอก
            </Typography>
            <Typography sx={{ color: '#ffffff' }}>
              - ผ่อนชำระเท่ากันทุกเดือน เป็นเวลาอย่างน้อย 1 ปี
              โดยอัตราดอกเบี้ยเงินกู้คงที่ตลอดการกู้ยืม
              และต้องชำระหนี้เต็มจำนวนตามกำหนดทุกงวดโดยไม่มีการผิดนัดชำระ
            </Typography>
            <br/>
            <Typography sx={{ color: '#ffffff' }}>
              ติดต่อสอบถามได้ที่สาขาธนาคารออมสินทุกสาขาทั่วประเทศ GSB Call Center 1115
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
