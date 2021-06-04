import React, { useCallback, useState } from 'react';

import './App.css';
import Header from './Components/Header';
import LightBox from './Components/LightBox';
import List from './Components/List';
import { getData } from './Utils/HttpUtils';

function App () {
	const [search, setSearch] = useState('');
	const [imageObj, setImageObj] = useState(undefined);
	const [processing, setProcessing] = useState(false);

	const onSearchAction = useCallback((value) => {
		setSearch(value);
	}, [setSearch]);
	const onImageClick = useCallback((id) => {
		setProcessing(true);
		getData('', { i: id })
			.then(data => {
				setImageObj(data);
			})
			.finally(() => {
				setProcessing(false);
			});
	}, [setImageObj]);

	const clearImage = useCallback(() => {
		setImageObj(undefined);
	}, []);

	return (
		<>
			<Header action={onSearchAction} />
			<List search={search} imageClick={onImageClick} />
			<LightBox processing={processing} item={imageObj} action={clearImage} />
		</>
	);
}

export default App;
