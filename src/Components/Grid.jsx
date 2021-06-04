import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Grid = memo(props => {
	return <section className='grid'>{props.children}</section>;
});

Grid.displayName = 'Grid';
Grid.propTypes = {
	children: PropTypes.any
};

export default Grid;
