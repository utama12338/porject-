import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
function DetailMappingDesc(props) {
  return (
    <>
      {props.detail.map((row) =>
        row.substring(0, 2) === 'H1' ? (
          <Typography
            fontWeight="600"
            variant="h6"
            key={row.substring(3)}
            data-testid={'text-load-detail-' + row.substring(3)}
          >
            {row.substring(3)}
          </Typography>
        ) : row.substring(0, 2) === 'D1' ? (
          row.substring(3) === 'อัตราดอกเบี้ยเป็นไปตามประกาศธนาคาร คลิกที่นี่' ? (
            <Typography
              fontWeight="400"
              variant="h6"
              key={row.substring(3)}
              data-testid={'text-load-detail-' + row.substring(3)}
            >
              <p>
                <Link target="_blank" to="https://www.gsb.or.th/service/loan-itr-1/">
                  {row.substring(3)}
                </Link>
              </p>
            </Typography>
          ) : row.substring(3) === 'ค่าธรรมเนียมเป็นไปตามประกาศธนาคาร คลิกที่นี่' ? (
            <Typography
              fontWeight="400"
              variant="h6"
              key={row.substring(3)}
              data-testid={'text-load-detail-' + row.substring(3)}
            >
              <p>
                <Link
                  target="_blank"
                  to="https://www.gsb.or.th/service/%e0%b8%84%e0%b9%88%e0%b8%b2%e0%b8%98%e0%b8%a3%e0%b8%a3%e0%b8%a1%e0%b9%80%e0%b8%99%e0%b8%b5%e0%b8%a2%e0%b8%a1%e0%b8%97%e0%b8%b5%e0%b9%88%e0%b9%80%e0%b8%81%e0%b8%b5%e0%b9%88%e0%b8%a2%e0%b8%a7%e0%b9%80/"
                >
                  {row.substring(3)}
                </Link>
              </p>
            </Typography>
          ) : (
            <Typography
              fontWeight="400"
              variant="h6"
              key={row.substring(3)}
              data-testid={'text-load-detail-' + row.substring(3)}
            >
              <p>{row.substring(3)}</p>
            </Typography>
          )
        ) : row.substring(0, 2) === 'D2' ? (
          <Typography
            fontWeight="400"
            variant="h6"
            key={row.substring(3)}
            data-testid={'text-load-detail-' + row.substring(3)}
          >
            <p>{row.substring(3)}</p>
          </Typography>
        ) : null,
      )}
    </>
  );
}
export default DetailMappingDesc;
