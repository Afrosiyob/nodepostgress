import { AUTH_LOGIN, AUTH_ME } from "../actions";

import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { fetchAuthLogin, fetchAuthMe } from "../services/api.service";
import { authLoginError, authLoginSuccess, authMeError, authMeSuccess } from "./action";
import { notificationMessage } from "../services/notification.service";

function* watchAuthLogin () {
    yield takeEvery( AUTH_LOGIN, workAuthLogin )
}

function* workAuthLogin ( { payload } ) {
    const { request, history } = payload
    const { response, error } = yield call( fetchAuthLogin, request )
    if ( response ) {
        const { token, user_info } = response.data.data
        localStorage.setItem( "token", `Bearer ${ token }` )
        yield put( authLoginSuccess( user_info ) )
        notificationMessage( "success", "auth login success" )
        history.push( "/admin" )
    } else {
        yield put( authLoginError( error.response.data.message ) )
        notificationMessage( "error", error.response.data.message )
    }
}


function* watchAuthMe () {
    yield takeEvery( AUTH_ME, workAuthMe )
}

function* workAuthMe ( { payload } ) {
    const history = payload
    const { response, error } = yield call( fetchAuthMe )

    if ( response ) {
        const { user_info } = response.data.data
        yield put( authMeSuccess( user_info ) )
        notificationMessage( "success", "get user info success" )
    } else {
        yield put( authMeError( error.response.data.message ) )
        notificationMessage( "error", error.response.data.message )
        localStorage.removeItem( "token" )
        history.push( "/" )
    }

}

export default function* authSaga () {
    yield all( [
        fork( watchAuthLogin ),
        fork( watchAuthMe )
    ] )
}

