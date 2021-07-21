
import { applyMiddleware, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootSagas from "../sagas";
import { rootReducer } from "../reducers";
const sagaMiddleware = createSagaMiddleware();



export const store = createStore(
    rootReducer,
    compose( applyMiddleware( logger, sagaMiddleware ) )
);


sagaMiddleware.run( rootSagas );
