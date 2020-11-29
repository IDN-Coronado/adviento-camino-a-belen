import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#224A57',
      dark: '#103044',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#F3B02C',
      contrastText: '#103044'
    }
  },
  typography: {
    fontFamily: 'BrandonGrotesqueRegular, Helvetica, Arial',
    fontSize: 15.8,
    lineHeight: '1.2em',
    subtitle2: {
      fontFamily: 'BrandonGrotesqueBold, Helvetica, Arial',
      display: 'block',
      marginTop: '.625rem',
      color: '#db778f'
    },
    body1: {
      lineHeight: '1.2em',
      marginBottom: '2.625rem'
    },
    body2: {
      lineHeight: '1.2em',
      marginBottom: '0.625rem'
    },
    h1: {
      fontFamily: 'WreathHalftone, Helvetica, Arial',
      color: '#f3b02c',
      fontSize: '3.65rem'
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
