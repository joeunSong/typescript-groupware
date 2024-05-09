import React from 'react';
import ReactDOM from 'react-dom/client';
// * css
import './styles/global.css';
import './styles/mui.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import { MuiTheme } from './styles/MuiTheme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// * component
import { PrimeReactProvider } from 'primereact/api';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <PrimeReactProvider>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={MuiTheme(rootElement)}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  </PrimeReactProvider>,
);
