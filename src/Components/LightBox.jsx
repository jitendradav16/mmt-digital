import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TransparentButton from './TransparentButton';
import Grid from './Grid';

const LightBox = memo(({ action, item, processing }) => {
	if (!item) {
		return null;
	}

	return (
		<div className={'light-box-over'}>
			{!processing &&
			<div className={'light-box'}>
				<TransparentButton action={action}>X</TransparentButton>
				<Grid>
					<img src={item.Poster !== 'N/A' ? item.Poster : `https://via.placeholder.com/320x450?text=${item.Title}`} className='light-box__image' />
					<div className='light-box__detail'>
						<h1>{item.Title} <small>({item.Year})</small></h1>
						<h3>Director: {item.Director}</h3>
						<h3>Cast: {item.Actors}</h3>
						<h3>Genre: {item.Genre}</h3>
						<p>{item.Plot}</p>
					</div>
				</Grid>
			</div>
			}
		</div>
	);
});

LightBox.displayName = 'LightBox';
LightBox.propTypes = {
	item: PropTypes.any,
	action: PropTypes.func,
	processing: PropTypes.bool
};

export default LightBox;
