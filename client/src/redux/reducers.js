import { combineReducers } from 'redux'
import { getTestReducer } from './test/reducer'

export const rootReducer = combineReducers( {
    getTestReducer
} )