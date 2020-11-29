import React, { Fragment } from 'react';
import { withStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import giftImage from '../images/gift.png';
import {ReactComponent as GiftSvg} from '../images/regalo-01.svg';

const styles = {
	button: {
		border: 'none',
		background: 'none',
		cursor: 'pointer',
		position: 'relative',
		'&[disabled]': {
			opacity: 0.5,
			cursor: 'not-allowed',
			'& p': {
				color: '#b7b7b7'
			},
			'& svg': {
				bottom: '1.5625rem',
			}
		},
	},
	buttonImg: {
		width: '50%'
	},
	giftSvg: {
		width: '80%',
		height: 'auto',
		position: 'absolute',
    left: '50%',
    bottom: '0',
    transform: 'translateX(-50%)'
	}
}

const AnimatedSvg = styled('div')(
  ({
    isOpening
  }) => ({
  ...isOpening ? { 
    'opacity': '0.5'
  } : {}
}));

function Gift ({ classes, message, link, linkText, onGiftOpen, canOpen, isOpened = false, isOpening = false }) {
	return isOpened ? (
		<Fragment>
			<Typography variant="body2" className={classes.mainText}>{ message }</Typography>
			<Link variant="body2" color="secondary" href={link} target="_blank" rel="noreferrer">{linkText}</Link>
		</Fragment>) : (
		<button className={classes.button} disabled={!canOpen} type="button" onClick={onGiftOpen}>
			<AnimatedSvg isOpening={isOpening}>
				<GiftSvg className={classes.giftSvg}/>
			</AnimatedSvg>
			{!canOpen && <p>Todavía no puedes abrir esta sorpresa</p>}
		</button>
	);
}

export default withStyles(styles)(Gift);