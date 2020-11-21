import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";

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

function Page404 (props) {
  const { classes } = props;
  return <div className={classes.root}>
    <Container maxWidth="sm" classes={{ root: classes.container }}>
      Al parecer te desviaste del camino a Belén, puedes regresar por <Link to="/">acá</Link>
    </Container>
  </div>
}


export default withStyles(styles)(Page404);
