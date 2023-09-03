import { jwtCheck } from './token-handler';

/**
 * return authorization header with jwt token
 */
export function authHeader(options: IAuthOptionsProps) {
	const { refreshToken, multipart } = options;
	let Token = refreshToken || jwtCheck();

	let headers: any = {};
	if (multipart) {
		headers['Content-Type'] = 'multipart/form-data';
	}
	else {
		headers['Content-Type'] = 'application/json';
	}

	if (Token) {
		headers['Authorization'] = `Bearer ${Token}`;
	}

	return headers;
}

export interface IAuthOptionsProps {
	multipart?: boolean;
	refreshToken?: string;
}