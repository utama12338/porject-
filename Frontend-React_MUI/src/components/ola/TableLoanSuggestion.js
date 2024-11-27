import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Divider } from '@mui/material';
import Helper from '../ola-custom/Helper';

export default function TableLoanSuggestion(props) {
  const navigate = useNavigate();

  const handleClickProductDetail = () => {
    const data = {
      product: props.product,
      productSelect: props.row,
      uuid: props.uuid,
      appno: props.appno,
      sizeDesc: props.sizeDesc,
    };
    navigate('/ola/loandetail', { state: data });
  };
  return (
    <>
      <Box
        key={props.row.productCode}
        display="flex"
        alignItems="flex-start"
        sx={{
          mt: 2,
          pt: 1,
        }}
      >
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Typography variant="h5" fontWeight="600" sx={{}}>
            {props.row.productNameTh}
          </Typography>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            วงเงินกู้สูงสุด : {props.row.maxAmount === 9999999999.00000 ? 'ไม่จำกัด' : Helper.decimalCommaFormat(props.row.maxAmount).toString() + ' บาท'}
          </Typography>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            ระยะเวลาผ่อนชำระ : {props.row.maxTerm} ปี
          </Typography>
        </Box>
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <Button
            sx={{
              backgroundColor: 'primary.main',
              color: '#ffffff',
              maxWidth: 350,
            }}
            variant="contained"
            size="small"
            onClick={handleClickProductDetail}
          >
            เลือก
          </Button>
        </Box>
      </Box>
      <br />
      <Divider light />
    </>
  );
}
