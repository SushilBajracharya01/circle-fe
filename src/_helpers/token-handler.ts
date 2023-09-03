import { LOCAL_ACCESS_TOKEN_NAME, LOCAL_REFRESH_TOKEN_NAME, USER_PROFILE_TOKEN_NAME } from "../constants/constants";

export function jwtCheck() {
	let accessToken;

	try {
		accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_NAME);
	} catch (error) {
		accessToken = null;
	}

	if (accessToken) {
		return accessToken;
	} else {
		return false;
	}
}

export const setLocalTokens = (accessToken:string, refreshToken:string) => {
	localStorage.setItem(LOCAL_ACCESS_TOKEN_NAME, accessToken);
	localStorage.setItem(LOCAL_REFRESH_TOKEN_NAME, refreshToken);
};

export const clearLocalTokens = () => {
	localStorage.removeItem(LOCAL_ACCESS_TOKEN_NAME);
	localStorage.removeItem(LOCAL_REFRESH_TOKEN_NAME);
	localStorage.removeItem(USER_PROFILE_TOKEN_NAME);
	localStorage.setItem('showLoginPage', 'true');
};
