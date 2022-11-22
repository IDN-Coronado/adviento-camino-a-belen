/* global firebase */

import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import dayjs from 'dayjs';

import backgroundImage from '../../images/count-bg@2x.png';
import calendarLogo from '../../images/calendario-logo.png';
import incLogo from '../../images/inc-logo.svg';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    padding: '4.375rem 2.875em',
    background: `url(${backgroundImage}) 0 0 no-repeat #1b304f`,
    backgroundSize: 'contain',
    '@media only screen and (min-width: 470px)': {
      background: `url(${backgroundImage}) 0 bottom no-repeat #1b304f`,
      backgroundSize: 'cover',
    },
  },
  countDown:{
    '& p': {
      fontFamily: 'BrandonGrotesqueBold, Helvetica, Arial',
      color: '#ffffff'
    },
    '& span': {
      display: 'block',
      fontFamily: 'WreathHalftone'
    }
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5625rem'
  },
  countTime: {
    width: '4.8125rem',
    fontSize: '1.25rem',
    '& span': {
      color: '#cc6e84',
      fontSize: '2.25rem'
    }
  },
  countDays: {
    fontSize: '2.125rem',
    '& span': {
      color: '#f3b02c',
      fontSize: '4.5rem'
    }
  },
  calendarLogoImg: {
    width: '55%',
    marginBottom: '1.5625rem'
  },
  incLogoImg: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '1.25rem',
    width: '4.6875rem',
    height: 'auto'
  }
}

const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;

const getTimeToXMas = (time) => {
  const xmas = dayjs('2022-12-25');
  const days = xmas.diff(time, 'd');
  const hours = Math.abs(days * HOURS - xmas.diff(time, 'h'));
  const minutes = Math.abs((days * HOURS + hours) * MINUTES - xmas.diff(time, 'm'));
  const seconds = Math.abs(((days * HOURS + hours) * MINUTES + minutes) * SECONDS - xmas.diff(time, 's'));
  return {
    days,
    hours,
    minutes,
    seconds,
  }
};

function CountdownPage (props) {
  const now = dayjs()
  const [ state, setState ] = useState(getTimeToXMas(now));
  const { classes } = props;

  useEffect(() => {
    firebase.analytics().logEvent('Page Load', {
      name: 'Countdown Page',
    });
    const interval = setInterval(() => {
      setState(getTimeToXMas(dayjs()))
    }, 1000);
    return () => clearInterval(interval)
  }, []);

  return <div className={classes.root}>
    <Container maxWidth="sm" classes={{ root: classes.container }}>
      <img src={calendarLogo} alt="Calendar Logo" className={classes.calendarLogoImg}/>
      <div className={classes.countDown}>
        <p className={classes.countDays}><span>{state.days}</span> Días</p>
        <div className={classes.timeContainer}>
          <p className={classes.countTime}><span>{state.hours}</span> Horas</p>
          <p className={classes.countTime}><span>{state.minutes}</span> Minutos</p>
          <p className={classes.countTime}><span>{state.seconds}</span> Segundos</p>
        </div>
      </div>
      <img src={incLogo} alt="INC Logo" className={classes.incLogoImg}/>
    </Container>
  </div>
}


export default withStyles(styles)(CountdownPage);
