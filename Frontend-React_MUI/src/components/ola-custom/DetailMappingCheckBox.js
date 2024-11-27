import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Typography } from '@mui/material';
function DetailMappingCheckBox(props) {
  return (
    <>
      {props.detail.map((row) =>
        row.substring(0, 2) === 'H1' ? (
          <Typography
            fontWeight="200"
            variant="h4"
            key={row.substring(3)}
            data-testid={'text-load-detail-' + row.substring(3)}
          >
            <FeatherIcon icon="check-square" /> {row.substring(3)}
          </Typography>
        ) : null,
      )}
    </>
  );
}
export default DetailMappingCheckBox;
