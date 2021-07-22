import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { getTestReducer } from './test/reducer'


export const rootReducer = combineReducers( {
    getTestReducer,
    authReducer
} )