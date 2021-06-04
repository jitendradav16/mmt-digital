import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

const PosterBox = memo(({ Title, Poster, Year, action, imdbID }) => {
	const onClick = useCallback(() => {
		action(imdbID);
	}, [action, imdbID]);

	return (
		<div className='poster-box' onClick={onClick}>
			<img
				className='poster-box__image'
				alt={Title}
				src={Poster !== 'N/A' ? Poster : `https://via.placeholder.com/320x450?text=${Title}`}/>
			<div>{Title}</div>
			<div>{Year}</div>
		</div>
	);
});

PosterBox.displayName = 'PosterBox';
PosterBox.propTypes = {
	Poster: PropTypes.string,
	Title: PropTypes.string,
	Year: PropTypes.string,
	action: PropTypes.func,
	imdbID: PropTypes.string
};

export default PosterBox;
