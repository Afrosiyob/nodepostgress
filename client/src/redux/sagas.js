import { all } from "redux-saga/effects"
import authSaga from "./auth/saga"
import getTestSaga from "./test/saga"

export default function* rootSagas () {
    yield all( [
        getTestSaga(),
        authSaga()
        // saga()
    ] )
}