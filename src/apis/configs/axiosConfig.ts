import axios from 'axios';
import jsCookie from 'js-cookie';

//
import { authHeader } from '../../_helpers/auth-header';
import { LOCAL_REFRESH_TOKEN_NAME } from '../../constants/constants';
import { LOCAL_ACCESS_TOKEN_NAME } from '../../constants/constants';

/**
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Axios(options?: any) {
	options = options ?? {};
	const baseURL = options.env ? process.env[options.env] : process.env.REACT_APP_BACKEND_API;

	return axios.create({
		baseURL: baseURL,
		headers: {
			credentials: 'include',
			...authHeader(options)
		}
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Axios().interceptors.response.use((response) => response, async function (error: any) {
	const originalRequest = error.config;


	if (originalRequest.url !== '/auth/login' && error.response) {
		// Access Token was expired
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = jsCookie.get(LOCAL_REFRESH_TOKEN_NAME);
				const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
					headers: {
						Authorization: `Bearer ${refreshToken}`
					}
				});

				const { accessToken } = response.data.body;

				localStorage.setItem(LOCAL_ACCESS_TOKEN_NAME, accessToken);
				return Axios()(originalRequest);
			}
			catch (err) {
				// Logging out the user by removing all the tokens from local
				localStorage.removeItem(LOCAL_ACCESS_TOKEN_NAME);
				jsCookie.remove(LOCAL_REFRESH_TOKEN_NAME);
				// Redirecting the user to the landing page
				window.location.href = window.location.origin;
				return Promise.reject(err);
			}
		}

	}
	return Promise.reject(error);
});




// reference: https://semaphoreci.com/blog/api-layer-react
