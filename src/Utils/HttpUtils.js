import axios from 'axios';
import { API_KEY, API_URL } from '../Constants/Constant';

function getServerConfig () {
	return {
		headers: {
			'Content-Type': 'application/json'
		}
	};
}

export async function getData (url, parameter) {
	let param = '';
	for (const key in parameter) {
		param += `&${key}=${parameter[key]}`;
	}

	try {
		const config = getServerConfig();
		const response = await axios.get(`${API_URL}${url}?apikey=${API_KEY}&${param}`, config);

		return response.data;
	} catch (e) {
		checkError(e);
	}
}

function checkError (e) {
	if (e.response && e.response.Error) {
		throw new Error(e.response.Error);
	} else {
		throw e;
	}
}
