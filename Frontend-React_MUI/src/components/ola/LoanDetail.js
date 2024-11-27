import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Helper from '../ola-custom/Helper';
import HitCountCenter from '../ola-custom/HitCountCenter';
import DetailMappingCheckBox from '../ola-custom/DetailMappingCheckBox';
import DetailMappingDesc from '../ola-custom/DetailMappingDesc';

export default function Loandetail() {
  const location = useLocation();
  const props = location.state;

  const detail1 = Helper.splitPipe(props.productSelect.productDetail1);
  const detail2 = Helper.splitPipe(props.productSelect.productDetail2);
  const detail3 = Helper.splitPipe(props.productSelect.productDetail3);
  const detail4 = Helper.splitPipe(props.productSelect.productDetail4);

  useEffect(() => {
    if (props !== null) {
      HitCountCenter.hitCount(props.uuid, props.appno, 'LoanDeatailPage');
    } else {
      navigate('/error');
    }
  }, []);

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Grid container>
      <Grid item xs={12} lg={12} sx={{ position: 'relative' }}>
        <Card sx={{ backgroundColor: '#FBE7F0' }}>
          <CardContent>
            <Typography fontWeight="600" variant="h2" sx={{ color: '#F178B6' }}>
              {props.productSelect.productNameTh}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <DetailMappingCheckBox detail={detail1} />
          </CardContent>
          <CardContent>
            <Accordion expanded={expanded == 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  fontWeight="600"
                  variant="h5"
                  sx={{ width: '100%', flexShrink: 0 }}
                  data-testid="text-loan-details"
                >
                  รายละเอียดการสมัครสินเชื่อ
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DetailMappingDesc detail={detail2} />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded == 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  fontWeight="600"
                  variant="h5"
                  sx={{ width: '100%', flexShrink: 0 }}
                  data-testid="text-loan-interate"
                >
                  อัตราดอกเบี้ยและค่าธรรมเนียม
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DetailMappingDesc detail={detail3} />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded == 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  fontWeight="600"
                  variant="h5"
                  sx={{ width: '100%', flexShrink: 0 }}
                  data-testid="text-loan-property"
                >
                  คุณสมบัติของผู้สมัครสินเชื่อ
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DetailMappingDesc detail={detail4} />
              </AccordionDetails>
            </Accordion>

            {props.productSelect.productDetail ? (
              <Accordion expanded={expanded == 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography
                    fontWeight="600"
                    variant="h5"
                    sx={{ width: '100%', flexShrink: 0 }}
                    data-testid="text-loan-property"
                  >
                    ตารางการเปิดเผยข้อมูลผลิตภัณฑ์ (Sales Sheet)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Link target="_blank" to={props.productSelect.productDetail}>
                    คลิกที่นี่
                  </Link>
                </AccordionDetails>
              </Accordion>
            ) : null}
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center" my={2}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                to="/ola/loansuggest"
                component={Link}
                state={{
                  product: props.product,
                  uuid: props.uuid,
                  appno: props.appno,
                  sizeDesc: props.sizeDesc,
                }}
              >
                ย้อนกลับ
              </Button>
              &nbsp;
              <Button
                variant="contained"
                size="small"
                color="primary"
                to="/ola/personalInfo"
                component={Link}
                state={{
                  product: props.product,
                  productSelect: props.productSelect,
                  uuid: props.uuid,
                  appno: props.appno,
                  sizeDesc: props.sizeDesc,
                }}
              >
                คลิกเพื่อตรวจสอบคุณสมบัติเพิ่มเติม
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
