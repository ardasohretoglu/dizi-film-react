import * as actionTypes from './actionsTypes'

export const searchFilmOrSeriesFunction = (payload) => ({
    type : actionTypes.searchFilmSeriesType,
    payload: payload
})