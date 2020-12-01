/* global firebase */

import React, { useEffect, useState, useRef } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { makeStyles, styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { useSwipeable } from 'react-swipeable';

import dayjs from 'dayjs';

import Gift from '../../components/Gift.js'

import getAdvent, { getOpenedDays, setLatestDay, TOTAL_DAYS, DEC1, DEC25 } from '../../lib/adventApi';
import backgroundImage from '../../images/bg@2x.png';
import navBgImage from '../../images/day-bg.png';
import incLogo from '../../images/inc-logo.svg';
import activeStar from '../../images/active-star.png';

const BOTTOM_NAV_ITEM_WIDTH = 60;
const BOTTOM_NAV_ITEM_HEIGHT = 60;
const CONTAINER_MAX_WIDTH = 600;
const NAV_TYPES = {
  ARROW: 'Arrow',
  BOTTOM_LINK: 'Bottom Link',
}
const BASE_URL = 'https://caminoabelen.nazarenocoronado.com';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: `calc(100% - ${BOTTOM_NAV_ITEM_WIDTH}px)`,
    color: '#fff',
  },
  container: {
    height: '100%',
    padding: '4.375rem 2.875em',
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
    fontSize: '1.5625rem',
    userSelect: 'none',
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
  },
  bottomNavInner: (day) => ({
    display: 'flex',
    height: '100%',
  }),
  incLogoImg: {
    position: 'absolute',
    right: '1.875rem',
    top: '.75rem',
    width: '4.6875rem',
    height: 'auto'
  }
});

const BottomLink = styled('div')(
  ({
    isActive,
    isEven,
    isOpened,
    isDisabled,
  }) => ({
  ...isEven ? { 
    'backgroundColor': '#AB5166'
  } : {}, 
  ...isActive ? { 
    'backgroundImage': `url(${activeStar}), url(${navBgImage})`,
    'backgroundSize': 'cover' 
  } : {},
  ...isOpened ? {
    'backgroundColor': '#224A57'
  } : {},
  'pointerEvents': isDisabled ? 'none' : 'auto',
  'touchAction': isDisabled ? 'none' : 'auto',
}));

const list = Array.from({length: TOTAL_DAYS}, (_, i) => i + 1);

const scrollBottomNav = (day, el) => {
  const windowWidth = window.innerWidth < CONTAINER_MAX_WIDTH ? window.innerWidth : CONTAINER_MAX_WIDTH;
  el.current.scrollLeft = ((day - 1) * BOTTOM_NAV_ITEM_WIDTH) + (BOTTOM_NAV_ITEM_WIDTH / 2) - (windowWidth / 2);
}

function AdventPage (props) {
  const params = useParams();
  const day = Number(params.day);
  const botttomNavEl = useRef(null);
  const [ adventData, setAdventdata ] = useState(null);
  const [ isOpeningGift, setIsOpeningGift ] = useState(false);
  const classes = useStyles(day);
  const date = dayjs(`2020-12-${day}`);

  useEffect(() => {
    firebase.analytics().logEvent('Page Load', {
      name: 'Advent Page',
      day
    });
    getAdvent(date, process.env.NODE_ENV === 'development').then(data => {
      setAdventdata(data);
      scrollBottomNav(day, botttomNavEl);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ day ]);

  const handleGiftOpen = () => {
    setLatestDay(adventData.day);
    setIsOpeningGift(true);

    firebase.analytics().logEvent('Click', {
      name: 'Open Gift',
      day
    });

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

  const onSwipedLeft = (eventData) => {
    const targetDay = day + 1;

    if (!isOpeningGift) {
      firebase.analytics().logEvent('Swipe Page', {
        name: 'Next Day',
        targetDay,
      });
      goToDay(day < DEC25 ? targetDay : null)
    }
  }

  const onSwipedRight = (eventData) => {
    const targetDay = day - 1;

    if (!isOpeningGift) {
      firebase.analytics().logEvent('Swipe Page', {
        name: 'Previous Day',
        targetDay,
      });
      goToDay(day > DEC1 ? targetDay : null)
    }
  }

  const goToDay = (day) => {
    day && props.history.push(`/adviento/${day}`)
  }

  const onNavClick = (targetDay, type, direction) => {
    if (!isOpeningGift) {
      firebase.analytics().logEvent('Nav Item Click', {
        name: `${ NAV_TYPES.ARROW === type ? direction : ''}${NAV_TYPES.ARROW === type ? ` ${type}` : type}`,
        targetDay,
      });
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  return <div className={classes.root}>
    <Container maxWidth="sm" classes={{ root: classes.container }} {...handlers}>
      {!adventData && <p>Cargando...</p>}
      {adventData && <div>
        <img src={incLogo} alt="INC Logo" className={classes.incLogoImg}/>
        {day !== DEC1 ? <Link
          to={isOpeningGift ? '#' : `/adviento/${day - 1}`}
          className={classes.arrowLeft}
          onClick={() => onNavClick(day - 1, NAV_TYPES.ARROW, 'Left')}
        /> : null}
        {day !== DEC25 ? <Link
          to={isOpeningGift ? '#' : `/adviento/${day + 1}`}
          className={classes.arrowRight}
          onClick={() => onNavClick(day + 1, NAV_TYPES.ARROW, 'Right')}
        /> : null }
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
          download={adventData.gift.download}
          onGiftOpen={handleGiftOpen}
          isOpening={isOpeningGift}
          url={`${BASE_URL}${props.location.pathname}`}
        />
      </div>}
    </Container>
    <div>
      <Container maxWidth="sm" className={classes.bottomNavContainer}>
        <div value={day || '1'} className={classes.bottomNav} ref={botttomNavEl}>
          <div className={classes.bottomNavInner}>
            {list.map(index => {
              const openedDays = getOpenedDays();
              const isActive = index === day;
              const isEven = index % 2 === 0;
              const isOpened = openedDays.indexOf(index) >= 0;
              return (
              <BottomLink
                key={`day-${index}`}
                isActive={isActive}
                isEven={isEven}
                isOpened={isOpened}
                isDisabled={isOpeningGift}
                className={classes.bottomNavItem}
              >
                <Link to={`/adviento/${index}`} className={classes.bottomNavLink} onClick={() => onNavClick(index, NAV_TYPES.BOTTOM_LINK)}>
                  <p>{index}</p>
                </Link>
              </BottomLink>
            )}
            )}
          </div>
        </div>
      </Container>
    </div>
  </div>
}

export default withRouter(AdventPage);
