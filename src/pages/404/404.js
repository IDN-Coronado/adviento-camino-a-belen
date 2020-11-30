import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

import backgroundImage from '../../images/bg@2x.png';
import backStar from '../../images/back-star.png';
import incLogo from '../../images/inc-logo.svg';

const styles = {
  root: {
    width: '100%',
    height: '100%'
  },
  backStar: {
    display: 'block',
    '& img': {
      width: '9.375rem',
      marginTop: '1.875rem'
    }
  },
  container: {
    height: '100%',
    padding: '4.375rem 2.875em',
    background: `url(${backgroundImage}) 0 0 no-repeat #1b304f`,
    backgroundSize: 'contain',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    '@media only screen and (min-width: 470px)': {
      background: `url(${backgroundImage}) 0 bottom no-repeat #1b304f`,
      backgroundSize: 'cover',
    }
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

function Page404 (props) {
  const { classes } = props;
  return <div className={classes.root}>
    <Container maxWidth="sm" classes={{ root: classes.container }}>
      <Typography variant="body1">Al parecer te desviaste del camino a Belén, puedes regresar siguiendo la estrella y dando click sobre ella
        <Link to="/" className={classes.backStar}><img src={backStar} alt="estrella"/></Link>
      </Typography>
      <img src={incLogo} alt="INC Logo" className={classes.incLogoImg}/>
    </Container>
  </div>
}


export default withStyles(styles)(Page404);
