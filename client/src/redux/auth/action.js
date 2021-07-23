import {
    AUTH_LOGIN,
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_LOGOUT_ERROR,
    AUTH_LOGOUT_SUCCESS,
    AUTH_ME,
    AUTH_ME_ERROR,
    AUTH_ME_SUCCESS,
    AUTH_REGISTRATION,
    AUTH_REGISTRATION_ERROR,
    AUTH_REGISTRATION_SUCCESS,
} from "../actions";

export const authLogin = (request, history) => ({
    type: AUTH_LOGIN,
    payload: { request, history },
});

export const authLoginSuccess = (response) => ({
    type: AUTH_LOGIN_SUCCESS,
    payload: response,
});

export const authLoginError = (error) => ({
    type: AUTH_LOGIN_ERROR,
    payload: error,
});

export const authMe = (history) => ({
    type: AUTH_ME,
    payload: history,
});

export const authMeSuccess = (response) => ({
    type: AUTH_ME_SUCCESS,
    payload: response,
});

export const authMeError = (error) => ({
    type: AUTH_ME_ERROR,
    payload: error,
});

export const authLogout = (history) => ({
    type: AUTH_LOGOUT,
    payload: history,
});

export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT_SUCCESS,
});

export const authLogoutError = (error) => ({
    type: AUTH_LOGOUT_ERROR,
    payload: error,
});

export const authRegistration = (request, history) => ({
    type: AUTH_REGISTRATION,
    payload: { request, history },
});

export const authRegistrationSuccess = () => ({
    type: AUTH_REGISTRATION_SUCCESS,
});

export const authRegistrationError = (error) => ({
    type: AUTH_REGISTRATION_ERROR,
    payload: error,
});