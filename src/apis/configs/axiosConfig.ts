import axios, { InternalAxiosRequestConfig } from 'axios';
import jsCookie from 'js-cookie';

//
import { LOCAL_REFRESH_TOKEN_NAME } from '../../constants/constants';
import { LOCAL_ACCESS_TOKEN_NAME } from '../../constants/constants';
import { jwtCheck } from '../../_helpers/token-handler';

/**
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Axios = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API,
	headers: {
		credentials: 'include',
	}
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
Axios.interceptors.response.use((response) => response, async function (error: any) {
	const originalRequest = error.config;

	if (originalRequest.url !== '/auth' && error.response) {
		// Access Token was expired
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = jsCookie.get(LOCAL_REFRESH_TOKEN_NAME);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await axios.get(`${import.meta.env.VITE_BACKEND_API}/auth/refresh`, {
					headers: {
						Authorization: `Bearer ${refreshToken}`
					}
				});
				const { accessToken } = response.data;

				localStorage.setItem(LOCAL_ACCESS_TOKEN_NAME, accessToken);

				return Axios(originalRequest);
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

// defining a custom error handler for all APIs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (error: any) => {
	if (error.response) {
		throw error.response.data;
	} else if (error.request) {
		if (!error.statusCode) {
			throw new Error('Network error');
		}
		throw error.request;
	} else {
		console.log(error, 'Erroor ELSE');
		throw new Error('Network error');
	}
};

// registering the custom error handler to the
// "Axios" axios instance
Axios.interceptors.response.use(
	(response) => response,
	(error) => {
		return errorHandler(error);
	}
);

interface InternalAxiosRequestConfigExtended extends InternalAxiosRequestConfig {
	refreshToken?: string;
	multipart?: boolean;
}

Axios.interceptors.request.use(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(config: InternalAxiosRequestConfigExtended) => {
		const Token = config.refreshToken || jwtCheck();

		if (Token) {
			config.headers['Authorization'] = `Bearer ${Token}`;
		}
		if (config.multipart) {
			config.headers['Content-Type'] = 'multipart/form-data';
		}
		else {
			config.headers['Content-Type'] = 'application/json';
		}

		return config;
	},
	(error) => {
		return errorHandler(error);
	}
);

export { Axios };

// reference: https://semaphoreci.com/blog/api-layer-react
