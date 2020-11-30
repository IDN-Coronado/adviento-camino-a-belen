import React, { useEffect, useState, useRef } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { makeStyles, styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { useSwipeable } from 'react-swipeable';

import dayjs from 'dayjs';

import Gift from '../../components/Gift.js'

import getAdvent, { TOTAL_DAYS, setLatestDay, DEC1, DEC25 } from '../../lib/adventApi';
import backgroundImage from '../../images/bg@2x.png';
import navBgImage from '../../images/day-bg.png';

const BOTTOM_NAV_ITEM_WIDTH = 60;
const BOTTOM_NAV_ITEM_HEIGHT = 60;
const CONTAINER_MAX_WIDTH = 600;

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: `calc(100% - ${BOTTOM_NAV_ITEM_WIDTH}px)`,
    color: '#fff',
  },
  container: {
    height: '100%',
    padding: '4.375rem 2.1875rem',
    background: `url(${backgroundImage}) 0 0 no-repeat`,
    backgroundSize: 'cover',
  },
  arrowLeft: {
    width: '15px',
    height: '15px',
    position: 'absolute',
    top: '50%',
    left: '1.25rem',
    transform: 'translateY(-50%) rotate(-45deg)',
    border: '3px solid #ffffff',
    borderWidth: '3px 0 0 3px',
    userSelect: 'none',
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
  },
  arrowRight: {
    width: '15px',
    height: '15px',
    position: 'absolute',
    top: '50%',
    right: '1.25rem',
    transform: 'translateY(-50%) rotate(45deg)',
    border: '3px solid #ffffff',
    borderWidth: '3px 3px 0 0',
    userSelect: 'none',
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: BOTTOM_NAV_ITEM_HEIGHT,
    padding: 0,
  },
  bottomNav: {
    height: BOTTOM_NAV_ITEM_HEIGHT,
    overflowX: 'scroll',
    overflowY: 'hidden'
  },
  bottomNavItem: {
    background:  `url(${navBgImage}) 0 0 no-repeat`,
    backgroundColor: '#4f766c',
  },
  bottomNavLink: {
    flex: 'none',
    width: BOTTOM_NAV_ITEM_WIDTH,
    height: '100%',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    color: '#ffffff',
    textDecoration: 'none',
    fontFamily: 'BrandonGrotesqueRegular, Helvetica, Arial',
    fontSize: '1.5625rem'
  },
  bottomNavInner: (day) => ({
    display: 'flex',
    height: '100%',
  })
});

const BottomLink = styled('div')(
  ({
    isActive,
    isEven,
  }) => ({
  ...isEven ? { 
    'backgroundColor': '#AB5166'
  } : {}, 
  ...isActive ? { 
    'backgroundColor': '#F3B02C'
  } : {},
}));

const list = Array.from({length: TOTAL_DAYS}, (_, i) => i + 1);

function AdventPage (props) {
  const { day } = useParams();
  const botttomNavEl = useRef(null);
  const [ adventData, setAdventdata ] = useState(null);
  const [ isOpeningGift, setIsOpeningGift ] = useState(false);
  const classes = useStyles(Number(day) || 1);
  const date = day ? dayjs(`2020-12-${day}`) : null;

  useEffect(() => {
    console.log('useEffect');
    getAdvent(date).then(data => {
      setAdventdata(data);
      botttomNavEl.current.scrollLeft = ((day - 1) * BOTTOM_NAV_ITEM_WIDTH) + (BOTTOM_NAV_ITEM_WIDTH / 2) - (CONTAINER_MAX_WIDTH / 2);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ day ]);

  const handleGiftOpen = () => {
    setLatestDay(adventData.day);
    setIsOpeningGift(true);

    setTimeout(()=>{
      setAdventdata({
        ...adventData,
        gift: {
          ...adventData.gift,
          isOpened: true,
        }
      });
      setIsOpeningGift(false);
    },2000);
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
        {Number(day || 1) !== DEC1 ? <Link to={`/adviento/${Number(day || 1) - 1}`} className={classes.arrowLeft}></Link> : null}
        {Number(day || 1) !== DEC25 ? <Link to={`/adviento/${Number(day || 1) + 1}`} className={classes.arrowRight}></Link> : null }
        <Typography variant="h1" component="h1">{ adventData.name }</Typography>
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
          isOpening={isOpeningGift}
        />
      </div>}
    </Container>
    <div>
      <Container maxWidth="sm" className={classes.bottomNavContainer}>
        <div value={day || '1'} className={classes.bottomNav} ref={botttomNavEl}>
          <div className={classes.bottomNavInner}>
            {list.map(index => (
              <BottomLink key={`day-${index}`} isActive={Number(index) === Number(day || 1)} isEven={Number(index) % 2 === 0} className={classes.bottomNavItem}>
                <Link to={`/adviento/${index}`} className={classes.bottomNavLink}>
                  <p>{index}</p>
                </Link>
              </BottomLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  </div>
}

export default withRouter(AdventPage);
