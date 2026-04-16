
import React from "react";
import { ThemeProvider, CssBaseline, Container, Typography } from '@mui/material';
import theme from './theme';

import AuthUI from "./AuthUI";

import DeviceStatus from "./DeviceStatus";

import DeviceControls from "./DeviceControls";
import DeviceMap from "./DeviceMap";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          E-Seal Dashboard
        </Typography>
        <AuthUI />
        <DeviceStatus />
        <DeviceControls />
        <DeviceMap />
      </Container>
    </ThemeProvider>
  );
}

export default App;
