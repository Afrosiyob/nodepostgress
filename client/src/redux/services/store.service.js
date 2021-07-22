
import { applyMiddleware, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";

import rootSagas from "../sagas";
import { rootReducer } from "../reducers";
const sagaMiddleware = createSagaMiddleware();


const middlewares = [ sagaMiddleware ];

if ( process.env.NODE_ENV === `development` ) {
    const { logger } = require( `redux-logger` );
    middlewares.push( logger );
}

export const store = compose( applyMiddleware( ...middlewares ) )( createStore )( rootReducer );

// export const store = createStore(
//     rootReducer,
//     compose( applyMiddleware( logger, sagaMiddleware ) )
// );


sagaMiddleware.run( rootSagas );
