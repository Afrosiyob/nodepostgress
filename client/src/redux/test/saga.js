

import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { GET_TEST_DATA } from "../actions"
import { fetchTestData } from "../services/api.service"
import { notificationMessage } from "../services/notification.service"
import { getTestDataError, getTestDataSuccess } from "./action"

function* watchGetTest () {
    yield takeEvery( GET_TEST_DATA, workGetTest )
}

function* workGetTest () {
    const { response, error } = yield call( fetchTestData )

    if ( response ) {
        yield put( getTestDataSuccess( response ) )
        notificationMessage( 'success', 'get test data' )
    } else {
        yield put( getTestDataError( error ) )
        notificationMessage( 'error', error )
    }
}

export default function* getTestSaga () {
    yield all( [
        fork( watchGetTest )
    ] )
}