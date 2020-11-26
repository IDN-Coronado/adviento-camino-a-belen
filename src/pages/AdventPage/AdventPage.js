import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { makeStyles, styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { useSwipeable } from 'react-swipeable';

import dayjs from 'dayjs';

import Gift from '../../components/Gift.js'

import getAdvent, { TOTAL_DAYS, setLatestDay, DEC1, DEC25 } from '../../lib/adventApi';

const BOTTOM_NAV_ITEM_WIDTH = 60;
const CONTAINER_MAX_WIDTH = 600;

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: `calc(100% - ${BOTTOM_NAV_ITEM_WIDTH}px)`,
  },
  container: {
    height: '100%',
    padding: 0,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: 60,
    padding: 0,
  },
  bottomNav: {
    height: 60,
    overflow: 'hidden',
  },
  bottomNavItem: {
    flex: 'none',
    width: BOTTOM_NAV_ITEM_WIDTH,
    height: '100%',
    border: '1px solid #000',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavInner: (day) => ({
    display: 'flex',
    height: '100%',
    transform: `translateX(${(CONTAINER_MAX_WIDTH / 2) - (BOTTOM_NAV_ITEM_WIDTH / 2) - ((day - 1) * BOTTOM_NAV_ITEM_WIDTH)}px)`
  })
});

const BottomLink = styled('div')(({
  isActive
}) => ({
  ...isActive ? {
    'backgroundColor': 'red'
  } : {}
}));

const list = Array.from({length: TOTAL_DAYS}, (_, i) => i + 1);

function AdventPage (props) {
  const { day } = useParams();
  const [ adventData, setAdventdata ] = useState(null);
  const classes = useStyles(Number(day) || 1);
  const date = day ? dayjs(`2020-12-${day}`) : null;

  useEffect(() => {
    getAdvent(date).then(data => {
      setAdventdata(data)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ day ]);

  const handleGiftOpen = () => {
    setLatestDay(adventData.day);
    setAdventdata({
      ...adventData,
      gift: {
        ...adventData.gift,
        isOpened: true,
      }
    })
  }

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => Number(day || 1) < DEC25 ? props.history.push(`/adviento/${Number(day || 1) + 1}`) : null,
    onSwipedRight: (eventData) => Number(day || 1) > DEC1 ? props.history.push(`/adviento/${Number(day || 1) - 1}`) : null,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  return <div className={classes.root}>
    <Container maxWidth="sm" classes={{ root: classes.container }} {...handlers}>
      {!adventData && <p>Loader</p>}
      {adventData && <div>
        <Typography component="h1">{ adventData.name }</Typography>
        <Typography variant="body1">
          {adventData.verse.text}
          <Typography variant="subtitle2" component="span">{ adventData.verse.location }</Typography>
        </Typography>
        <Gift
          message={adventData.challenge}
          link={adventData.gift.href}
          linkText={adventData.gift.text}
          isOpened={adventData.gift.isOpened}
          canOpen={adventData.gift.canOpen}
          onGiftOpen={handleGiftOpen}
        />
      </div>}
    </Container>
    <Container maxWidth="sm" className={classes.bottomNavContainer}>
      <div value={day || '1'} className={classes.bottomNav}>
        <div className={classes.bottomNavInner}>
          {list.map(index => (
            <BottomLink key={`day-${index}`} isActive={Number(index) === Number(day || 1)}>
              <Link to={`/adviento/${index}`} className={classes.bottomNavItem}>
                <p>{index}</p>
              </Link>
            </BottomLink>
          ))}
        </div>
      </div>
    </Container>
  </div>
}

export default withRouter(AdventPage);
