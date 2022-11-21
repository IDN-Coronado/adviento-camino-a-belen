/* global firebase */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const apiKey = process.env.REACT_APP_API_KEY;
const projectId = process.env.REACT_APP_PROJECT_ID;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId,
  appId,
  measurementId,
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

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
    fontSize: 15,
    lineHeight: '1.2em',
    subtitle2: {
      fontFamily: 'BrandonGrotesqueBold, Helvetica, Arial',
      display: 'block',
      marginTop: '.625rem',
      color: '#db778f',
      fontSize: '1.25rem',
    },
    body1: {
      lineHeight: '1.2em',
      marginBottom: '2.1875rem',
      fontSize: '1.5rem',
      '@media only screen and (max-width: 350px)': {
        lineHeight: '1.1em',
        fontSize: '1rem'
      }
    },
    body2: {
      lineHeight: '1.2em',
      marginBottom: '0.625rem',
      fontSize: '1.125rem',
      color: '#cbcbcb',
      '@media only screen and (max-width: 350px)': {
        lineHeight: '1.1em',
        fontSize: '1rem'
      }
    },
    h1: {
      fontFamily: 'WreathHalftone, Helvetica, Arial',
      color: '#f3b02c',
      fontSize: '3.65rem',
      marginBottom: '1rem',
      '@media only screen and (max-width: 350px)': {
        fontSize: '3rem'
      }
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
