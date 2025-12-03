import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </>
);
