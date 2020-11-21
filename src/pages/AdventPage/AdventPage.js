import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

import dayjs from 'dayjs';

import getAdvent, { TOTAL_DAYS } from '../../lib/dates';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%'
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
  },
  bottomNav: {
    height: 60,
    display: 'flex',
    overflow: 'hidden',
    overflowX: 'scroll',
  },
  bottomNavItem: {
    flex: 'none',
    width: 60,
    height: '100%',
    border: '1px solid #000',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const list = Array.from({length: TOTAL_DAYS}, (_, i) => i + 1);

function AdventPage (props) {
  const { day } = useParams();
  const [ adventData, setAdventdata ] = useState(null);
  const { classes } = props;
  const date = day ? dayjs(`2020-12-${day}`) : null;

  useEffect(() => {
    getAdvent(date).then(data => {
      setAdventdata(data)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ day ]);

  return <div className={classes.root}>
    <Container maxWidth="sm" classes={{ root: classes.container }}>
      {!adventData && <p>Loader</p>}
      {adventData && <div>
        <Typography component="h1">{ adventData.name }</Typography>
        <Typography variant="body1">
          {adventData.verse.text}
          <Typography variant="subtitle2">{ adventData.verse.location }</Typography>
        </Typography>
        <p>{ adventData.challenge }</p>
        <a href={adventData.gift.href} target="_blank" rel="noreferrer">{adventData.gift.text}</a>
      </div>}
      <Container maxWidth="sm" className={classes.bottomNavContainer}>
        <div value={day || '1'} showLabels className={classes.bottomNav}>
          {list.map(index => (
            <Link key={`day-${index}`} to={`/advent/${index}`} className={classes.bottomNavItem}>
              <p>{index}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Container>
  </div>
}


export default withStyles(styles)(AdventPage);;
