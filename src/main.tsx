
import './index.css';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';

import theme from './theme';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <BrowserRouter >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
