import React from 'react';
import PropTypes from 'prop-types';

const TransparentButton = React.memo(({ action, children }) => {
	return (
		<button type={'button'} className={'transparent-button'} onClick={action}>
			{children}
		</button>
	);
});

TransparentButton.displayName = 'TransparentButton';
TransparentButton.propTypes = {
	action: PropTypes.func,
	children: PropTypes.any
};

export default TransparentButton;
