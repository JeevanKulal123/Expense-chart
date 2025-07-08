import React from 'react';
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Top App Bar */}
      <Header />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>

      {/* Optional Footer */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 2,
          px: 2,

          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()}Spendly App
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
