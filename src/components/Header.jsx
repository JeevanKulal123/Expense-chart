import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = () => {
  const { mode, toggleColorMode } = useContext(ThemeContext);

  return (
    <AppBar color="secondary" position="static" elevation={1}>
      <Toolbar>
        {/* App name */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 600,
            fontSize: '1.5rem',
          }}
        >
          Spendly
        </Typography>

        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
          <Button color="inherit" href="/">
            Expense
          </Button>
          <Button color="inherit" href="/budget">
            Budget
          </Button>
        </Box>

        {/* Theme toggle */}
        <Box>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
