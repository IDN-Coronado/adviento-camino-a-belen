import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import dayjs from 'dayjs';

import backgroundImage from '../../images/background.jpg';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '30%',
  },
  container: {
    height: '100%'
  }
}

const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;

const getTimeToXMas = (time) => {
  const xmas = dayjs('2020-12-25');
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
    const interval = setInterval(() => {
      setState(getTimeToXMas(dayjs()))
    }, 1000);
    return () => clearInterval(interval)
  }, []);

  return <div className={classes.root}>
    <Container maxWidth="sm" classes={{ root: classes.container }}>
      <p>Days: {state.days}</p>
      <p>Hours: {state.hours}</p>
      <p>Minutes: {state.minutes}</p>
      <p>Seconds: {state.seconds}</p>
    </Container>
  </div>
}


export default withStyles(styles)(CountdownPage);
