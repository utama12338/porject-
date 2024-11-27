import React, { useState } from 'react';
import { experimentalStyled, useMediaQuery, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/ola/Header';
import Footer from '../../components/ola/Footer';

const MainWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
}));
const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',

  backgroundColor: theme.palette.background.default,

}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const customizer = useSelector((state) => state.CustomizerReducer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  return (
    <>
      <MainWrapper className={customizer.activeMode === 'dark' ? 'darkbg' : ''}>
        <PageWrapper>
          <Container
            maxWidth={false}
            sx={{
              paddingTop: '20px',
              paddingLeft: isSidebarOpen && lgUp ? '280px!important' : '',
            }}
          >
            <Header />
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <Outlet />
            </Box>
          </Container>
        </PageWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
};

export default FullLayout;
