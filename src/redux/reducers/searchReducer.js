import * as actionTypes from '../actions/actionsTypes'

const searchReducer = (state = '', action) => {
    let searchWord
    switch (action.type) {
        case actionTypes.searchFilmSeriesType:
            return (searchWord = action.payload)
        default:
            return state
    }

}

export default searchReducer