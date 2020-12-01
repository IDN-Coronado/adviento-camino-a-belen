import React, { Fragment } from 'react';
import { withStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {
	FacebookShareButton,
  FacebookIcon,
	TwitterShareButton,
  TwitterIcon,
	WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

import {ReactComponent as GiftSvg} from '../images/regalo-01.svg';

const styles = {
	button: {
		border: 'none',
		background: 'none',
		cursor: 'pointer',
		position: 'relative',
		outline: 'none',
		userSelect: 'none',
		'-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
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
	svgContainer: {
		animation: 'Gift-not-opened 1s ease-in-out infinite'
	},
	giftSvg: {
		width: '80%',
		height: 'auto',
		marginTop: '-37%'
	},
	giftLink: {
		color: '#103044',
		backgroundColor: '#F3B02C',
		padding: '.375rem 1.25rem',
		borderRadius: '.3125rem',
		marginTop: '1.25rem',
		display: 'inline-block',
		fontFamily: 'BrandonGrotesqueBold, Helvetica, Arial',
		'&:hover': {
			textDecoration: 'none'
		}
	},
	shareText: {
		marginTop: '15px'
	},
	shareButtons: {
		outline: 'none',
		marginRight: '15px',
	}
}

const AnimatedSvg = styled('div')(
  ({
    isOpening
  }) => ({
  ...isOpening ? { 
		'animation': 'none',
  } : {}
}));

function Gift ({
	classes,
	message,
	link,
	linkText,
	onGiftOpen,
	canOpen,
	download,
	url,
	isOpened = false,
	isOpening = false
}) {
	return isOpened ? (
		<Fragment>
			<Typography variant="body2">{ message }</Typography>
			{linkText && <Link
				variant="body2"
				color="secondary"
				href={link}
				target="_blank"
				rel="noreferrer"
				className={classes.giftLink}
			>{linkText}</Link>}
			<div>
				<Typography variant="body2" className={classes.shareText}>Comparte</Typography>
				<FacebookShareButton
					url={url}
					quote={`Ya completé el reto de hoy: "${message}"`}
					hashtag="#caminoaBelenIDNCoro"
					className={classes.shareButtons}
				>
					<FacebookIcon size={32} borderRadius={13} />
				</FacebookShareButton>
				<TwitterShareButton
					url={url}
					title={`Ya completé el reto de hoy: "${message}"`}
					hashtags={['caminoABelenIDNCoro']}
					className={classes.shareButtons}
				>
					<TwitterIcon size={32} borderRadius={13} />
				</TwitterShareButton>
				<WhatsappShareButton
					url={url}
					title={`Ya completé el reto de hoy: "${message}"`}
					separator=" "
				>
					<WhatsappIcon size={32} borderRadius={13} />
				</WhatsappShareButton>
			</div>
		</Fragment>) : (
		<button className={classes.button} disabled={!canOpen} type="button" onClick={onGiftOpen}>
			<AnimatedSvg isOpening={isOpening} className={`${classes.svgContainer} ${isOpening ? "gift-animate" : ""}`}>
				<GiftSvg className={classes.giftSvg}/>
			</AnimatedSvg>
			{!canOpen && <p>Todavía no puedes abrir esta sorpresa</p>}
		</button>
	);
}	

export default withStyles(styles)(Gift);