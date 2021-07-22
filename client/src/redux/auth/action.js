import { AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS, AUTH_ME, AUTH_ME_ERROR, AUTH_ME_SUCCESS } from "../actions";

export const authLogin = ( request, history ) => ( {
    type: AUTH_LOGIN,
    payload: { request, history }
} )

export const authLoginSuccess = ( response ) => ( {
    type: AUTH_LOGIN_SUCCESS,
    payload: response
} )

export const authLoginError = ( error ) => ( {
    type: AUTH_LOGIN_ERROR,
    payload: error
} )

export const authMe = ( history ) => ( {
    type: AUTH_ME,
    payload: history
} )

export const authMeSuccess = ( response ) => ( {
    type: AUTH_ME_SUCCESS,
    payload: response
} )

export const authMeError = ( error ) => ( {
    type: AUTH_ME_ERROR,
    payload: error
} )