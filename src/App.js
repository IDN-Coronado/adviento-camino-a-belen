import React, { useState } from 'react';

import { Route, Switch, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { grey } from '@material-ui/core/colors';
import { Link } from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import CountdownPage from './pages/CountdownPage/CountdownPage';

import drawerImage from './images/navidad.jpg'

import './App.css';

const styles = {
  hamburger: {
    position: 'absolute',
    top: 0,
    left: 12,
  },
  page: {
    height: '100vh',
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
          <Link to="/" className={classes.link}>
            <ListItem button key={'Adviento'}>
              <ListItemText primary="Adviento" />
            </ListItem>
          </Link>
          <Link to="/countdown" className={classes.link}>
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
          <Route path="/" exact component={HomePage} />
          <Route path="/countdown" exact component={CountdownPage} />
        </Switch>
      </div>
    </div>
  );
}

export default withStyles(styles)(App);
