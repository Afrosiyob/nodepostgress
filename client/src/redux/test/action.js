import { GET_TEST_DATA, GET_TEST_DATA_ERROR, GET_TEST_DATA_SUCCESS } from "../actions";

export const getTestData = () => ( {
    type: GET_TEST_DATA
} )

export const getTestDataSuccess = ( response ) => ( {
    type: GET_TEST_DATA_SUCCESS,
    payload: response
} )

export const getTestDataError = ( error ) => ( {
    type: GET_TEST_DATA_ERROR,
    payload: error
} )