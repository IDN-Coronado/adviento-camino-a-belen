import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import giftImage from '../images/gift.png';

const styles = {
	button: {
		border: 'none',
		background: 'none',
		cursor: 'pointer',
		'&[disabled]': {
			opacity: 0.5,
			cursor: 'not-allowed'
		}
	},
	buttonImg: {
		width: '50%'
	}
}

function Gift ({ classes, message, link, type, linkText, onGiftOpen, canOpen, isOpened = false }) {
	return isOpened ? (
		<Fragment>
			<p>{ message }</p>
			<a href={link} target="_blank" rel="noreferrer">{linkText}</a>
		</Fragment>) : (
		<button className={classes.button} disabled={!canOpen} type="button" onClick={onGiftOpen}>
			<img src={giftImage} alt="Gift" className={classes.buttonImg}/>
			{!canOpen && <p>Todavía no puedes abrir esta sorpresa</p>}
		</button>
	);
}

Gift.defaultProps = {
	type: 'gift'
};

export default withStyles(styles)(Gift);