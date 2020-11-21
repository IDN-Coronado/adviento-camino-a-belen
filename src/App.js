import React, { useState } from 'react';

import { Route, Switch, Link, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { grey } from '@material-ui/core/colors';

import AdventPage from './pages/AdventPage/AdventPage';
import CountdownPage from './pages/CountdownPage/CountdownPage';
import Page404 from './pages/404/404'

import { DEC1, DEC25 } from './lib/adventApi'

import drawerImage from './images/navidad.jpg'

import './App.css';

const styles = {
  hamburger: {
    position: 'absolute',
    top: 0,
    left: 12,
  },
  page: {
    height: window.innerHeight,
    width: '100vw',
  },
  drawer: {
    width: 250
  },
  paper: {
    backgroundColor: grey[800]
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    '&:visited, &:active': {
      color: '#fff'
    }
  }
};

const AdventRoute = ({ children, ...rest }) => {
  const day = rest.computedMatch.params.day;
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
  const { classes } = props;

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
              <ListItemText primary="Adviento" />
            </ListItem>
          </Link>
          <Link to="/countdown" className={classes.link} onClick={toggleDrawer}>
            <ListItem button key={'Cuenta regresiva'}>
              <ListItemText primary="Cuenta Regresiva" />
            </ListItem>
          </Link>
        </List>
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
          <Route path="/" exact component={AdventPage} />
          <AdventRoute path="/advent/:day">
            <AdventPage />
          </AdventRoute>
          <Route path="/countdown" exact component={CountdownPage} />
          <Route path="/404" exact component={Page404} />
          <Redirect from="*" to="404" />
        </Switch>
      </div>
    </div>
  );
}

export default withStyles(styles)(App);
