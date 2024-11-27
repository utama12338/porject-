import React from 'react';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

import olalogo from '../../assets/images/ola/logo-ola2.png';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;
  return (
    <>
      <Grid container spacing={1} sx={{ px: 2, pt: 1 }}>
        <Grid item xs={6} sm={6} md={6} lg={6} sx={{ textAlign: 'left' }}>
          <Link to="/">
            <img src={olalogo} alt="img" width="35%" />
          </Link>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} sx={{ textAlign: 'right' }}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem>
              <Link to="/ola/aboutUs">วิธีการใช้งาน</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/ola/contactUs">ติดต่อเรา</Link>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
}

