import { GET_TEST_DATA, GET_TEST_DATA_ERROR, GET_TEST_DATA_SUCCESS } from "../actions";

const INIT_STATE = {
    loading: false,
    error: null,
    data: null
}

export const getTestReducer = ( state = INIT_STATE, { type, payload } ) => {
    switch ( type ) {
        case GET_TEST_DATA:
            return { ...state, loading: true }
        case GET_TEST_DATA_SUCCESS:
            return { ...state, loading: false, data: payload }
        case GET_TEST_DATA_ERROR:
            return { ...state, loading: false, error: payload }
        default:
            return { ...state }
    }
}