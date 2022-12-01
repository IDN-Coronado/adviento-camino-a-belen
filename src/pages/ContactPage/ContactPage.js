
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { WhatsappIcon, FacebookIcon } from 'react-share';

import backgroundImage from '../../images/count-bg@2x.png';
import incLogo from '../../images/inc-logo.svg';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    color: 'white',
    fontFamily: 'BrandonGrotesqueRegular, Helvetica, Arial',
    height: '100%',
    padding: '4.375rem 2.875em',
    background: `url(${backgroundImage}) 0 0 no-repeat #1b304f`,
    backgroundSize: 'cover',
    '@media only screen and (min-width: 470px)': {
      background: `url(${backgroundImage}) 0 bottom no-repeat #1b304f`,
      backgroundSize: 'cover',
    },
  },
  incLogoImg: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '1.25rem',
    width: '4.6875rem',
    height: 'auto'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  listTitle: {
    fontSize: '1.5rem',
  },
  listMethod: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    margin: '0.5rem 0',
    opacity: '0.7'
  },
  listBlock: {
    marginBottom: '1.5rem'
  },
  socialLink: {
    marginRight: '1rem'
  }
}

function ContactPage ({ classes }) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  let whatsappLink = 'https://api.whatsapp.com/send?phone=%2B50685074555&text=Hola, quisiera obtener información.';
  let fbLink = 'https://www.facebook.com/iglesia.nazareno.sigueme';
  if (isMobile) {
    whatsappLink = 'whatsapp://send?phone=%2B50685074555&text=Hola, quisiera obtener información.';
    fbLink = `fb://${isAndroid ? 'page' : 'profile'}/104701416272739`
  }
  return <div className={classes.root}>
    <Container maxWidth="sm" classes={{ root: classes.container }}>
      <h1 className={classes.title}>Nuestros cultos</h1>
      <dl>
        <dt className={classes.listTitle}>Servicio dominical</dt>
        <dd className={classes.listBlock}>
          <p className={classes.listMethod}>Virtual y Prescencial</p>
          <span className={classes.listDescription}>Domingos 10:30am</span>
        </dd>
        <dt className={classes.listTitle}>Culto de oración</dt>
        <dd className={classes.listBlock}>
          <p className={classes.listMethod}>Virtual</p>
          <span className={classes.listDescription}>Jueves 7:30pm</span>
        </dd>
        <dt className={classes.listTitle}>Círculo íntimo</dt>
        <dd className={classes.listBlock}>
          <p className={classes.listMethod}>Virtual</p>
          <span className={classes.listDescription}>Viernes 3:00pm</span>
        </dd>
      </dl>
      <h2 className={classes.title}>Contactanos por acá</h2>
      <a className={classes.socialLink} href={whatsappLink} target="_blank">
        <WhatsappIcon size={32} borderRadius={13} />
      </a>
      <a href={fbLink} target="_blank">
        <FacebookIcon size={32} borderRadius={13} />
      </a>
      <img src={incLogo} alt="INC Logo" className={classes.incLogoImg}/>
    </Container>
  </div>
}
export default withStyles(styles)(ContactPage);