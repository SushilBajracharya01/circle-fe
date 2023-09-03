import { allowedRolesType } from "../pages/requireAuth/RequireAuthWrapper";

export const LOCAL_ACCESS_TOKEN_NAME = 'circle_user';
export const LOCAL_REFRESH_TOKEN_NAME = 'circle_userRefresh';
export const USER_PROFILE_TOKEN_NAME = 'circle_profile_token';
export const PERSIST = 'circle_persist';

export const ROLES: allowedRolesType[] = ["Admin", "User"];
