import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2', // Sky blue
    },
    secondary: {
      main: '#001f4d', // Navy blue
    },
    background: {
      default: '#0a1929', // Deep navy for background
      paper: '#1e293b', // Slightly lighter for cards
    },
    text: {
      primary: '#fff',
      secondary: '#b3c6e0',
    },
  },
});

export default theme;
