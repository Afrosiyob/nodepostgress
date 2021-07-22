import { AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS, AUTH_ME, AUTH_ME_ERROR, AUTH_ME_SUCCESS } from "../actions";

const INIT_STATE = {
    loading: false,
    data: null,
    error: null
}

export const authReducer = ( state = INIT_STATE, { type, payload } ) => {
    switch ( type ) {
        case AUTH_LOGIN:
            return { ...state, loading: true }
        case AUTH_LOGIN_SUCCESS:
            return { ...state, loading: false, data: payload, error: null }
        case AUTH_LOGIN_ERROR:
            return { ...state, loading: false, error: payload }
        case AUTH_ME:
            return { ...state, loading: true }
        case AUTH_ME_SUCCESS:
            return { ...state, loading: false, error: null }
        case AUTH_ME_ERROR:
            return { ...state, loading: false, error: payload }
        default:
            return { ...state }
    }
}