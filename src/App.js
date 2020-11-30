import React, { useState, useEffect } from 'react';

import { Route, Switch, Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AdventPage from './pages/AdventPage/AdventPage';
import CountdownPage from './pages/CountdownPage/CountdownPage';
import Page404 from './pages/404/404'

import { DEC1, DEC25, getTodayOrLatest } from './lib/adventApi';

import drawerImage from './images/navidad.jpg';
import incLogo from './images/inc-logo.svg';

import './App.css';

const useStyles = makeStyles({
  hamburger: {
    position: 'absolute',
    top: 0,
    left: 12,
    color: '#ffffff',
    zIndex: 30,
  },
  page: size => ({
    height: size.height,
    width: '100vw',
    minHeight: '600px',
    position: 'relative',
  }),
  drawer: {
    width: 250
  },
  paper: {
    backgroundColor: '#103044'
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    '&:visited, &:active': {
      color: '#fff'
    }
  },
  navItem: {
    '& span': {
      marginBottom: 0
    }
  },
  incLogoImg: {
    position: 'absolute',
    bottom: '20px',
    width: '40%',
    left: '50%',
    transform: 'translateX(-50%)',
  }
});

const AdventRoute = ({ children, ...rest }) => {
  const day = rest.computedMatch.params.day || getTodayOrLatest();
  return <Route
    {...rest}
    render={({ location }) => {
      if (day >= DEC1 && day <= DEC25) {
        return children;
      }
      return <Page404 />
    }}
  />
}

function App(props) {
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
  const size = useWindowSize();
  const classes = useStyles(size);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }
  return (
    <div className="App">
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        <img src={drawerImage} alt="Santa y su reno" className={classes.drawer} />
        <List>
          <Link to="/" className={classes.link} onClick={toggleDrawer}>
            <ListItem button key={'Adviento'}>
              <ListItemText primary="Adviento" className={classes.navItem}/>
            </ListItem>
          </Link>
          <Link to="/cuenta-regresiva" className={classes.link} onClick={toggleDrawer}>
            <ListItem button key={'Cuenta regresiva'}>
              <ListItemText primary="Cuenta Regresiva" />
            </ListItem>
          </Link>
          {process.env.NODE_ENV === 'development' && <Link className={classes.link} onClick={() => localStorage.clear()}>
            <ListItem button key={'Borrar localStorage'}>
              <ListItemText primary="Borrar localStorage" />
            </ListItem>
          </Link>}
        </List>
        <img src={incLogo} alt="INC Logo" className={classes.incLogoImg}/>
      </Drawer>
      <IconButton
        edge="start"
        className={classes.hamburger}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <div className={classes.page}>
        <Switch>
          <Route path="/" exact>
            <Redirect to={`/adviento/${getTodayOrLatest()}`} />
          </Route>
          <AdventRoute path="/adviento/:day">
            <AdventPage />
          </AdventRoute>
          <Route path="/cuenta-regresiva" exact component={CountdownPage} />
          <Route path="/404" exact component={Page404} />
          <Redirect from="*" to="404" />
        </Switch>
      </div>
    </div>
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default App;
