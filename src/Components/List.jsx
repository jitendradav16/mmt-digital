import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { getData } from '../Utils/HttpUtils';
import PosterBox from './PosterBox';
import Grid from './Grid';
import TransparentButton from './TransparentButton';

const List = memo(({ search, imageClick }) => {
	const [page, setPage] = useState(1);
	const [list, setList] = useState([]);
	const [totalResults, setTotalResults] = useState(0);
	const [maxPage, setMaxPage] = useState(0);
	const [noData, setNoData] = useState(false);
	const process = useRef(undefined);
	const getListData = useCallback((page) => {
		if (search.length >= 3) {
			getData('', { s: search, page: page })
				.then((data) => {
					if (data.Search) {
						setNoData(false);
						if (page !== 1) {
							setList(state => [...state, ...data.Search]);
						} else {
							setTotalResults(+data.totalResults);
							setMaxPage(Math.ceil(+data.totalResults / 8));
							setList(data.Search);
						}
					} else {
						setNoData(true);
					}
				});
		} else {
			setList([]);
		}
	}, [search, setList, setTotalResults, setMaxPage, setNoData]);

	useEffect(() => {
		// debounce method
		clearTimeout(process.current);
		process.current = setTimeout(() => {
			setPage(1);
			setList([]);
			search && getListData(1);
		}, 400);
	}, [search, setPage, setList]);

	useEffect(() => {
		if (list.length < page * 8 && list.length !== totalResults) {
			getListData(page);
		}
	}, [list, page, totalResults]);

	const nextPage = useCallback(() => {
		setPage(statePage => maxPage === statePage ? statePage : statePage + 1);
	}, [maxPage, setPage]);

	const prevPage = useCallback(() => {
		setPage(statePage => statePage === 1 ? statePage : statePage - 1);
	}, [setPage]);

	if (noData) {
		return <div>No Item Found!</div>;
	}

	if (list.length === 0) {
		return <div>Please search at least 3 characters</div>;
	}

	return (<div className='list'>
		<Grid>
			<div className='list__result'>
				{`${totalResults} Results found`}
			</div>
			<div className='list__pagination'>
				{`page ${page} of ${Math.ceil(totalResults / 8)}`}
				<TransparentButton action={prevPage}>
					<span className='back-button list__back'></span>
				</TransparentButton>
				<TransparentButton action={nextPage}>
					<span className='back-button list__forward'></span>
				</TransparentButton>
			</div>
			{list.length > 0 && list.slice((page - 1) * 8, page * 8).map(item => (
				<PosterBox
					key={item.imdbID}
					{...item}
					action={imageClick}
				/>
			))}
		</Grid>
	</div>
	);
});

List.displayName = 'List';
List.propTypes = {
	search: PropTypes.string,
	imageClick: PropTypes.func
};

export default List;
