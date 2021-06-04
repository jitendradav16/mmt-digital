import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const Header = memo(({ action }) => {
	const [search, setSearch] = useState('');
	const onChange = useCallback((e) => {
		setSearch(e.target.value);
		action(e.target.value);
	}, [action]);

	const onSearch = useCallback(() => {
		action(search);
	}, [search, action]);

	return (
		<div className='header'>
			<div className='header__logo'>
			</div>
			<div className='header__search'>
				<input
					type='text'
					placeholder='Search Here...'
					onChange={onChange}
					className='header__text'
				/>
				<button className='search__button' onClick={onSearch}>
					<span className='search__icon'></span>
				</button>
			</div>
		</div>
	);
});

Header.displayName = 'Header';

Header.propTypes = {
	action: PropTypes.func
};

export default Header;
