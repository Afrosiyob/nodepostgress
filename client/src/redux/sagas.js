import { all } from "redux-saga/effects"
import getTestSaga from "./test/saga"

export default function* rootSagas () {
    yield all( [
        getTestSaga()
        // saga()
    ] )
}