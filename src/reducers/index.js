import {createReducer} from 'redux-create-reducer';
import {FETCH_QUESTIONS, SEARCH_CHANGE} from '../actionTypes'

export const questions = createReducer([], {
    [FETCH_QUESTIONS.FINISH]: (state, action) => action.payload
})

// export const questions = (state = [], action) => {
//     if (action.type === FETCH_QUESTIONS.FINISH) return action.payload
//     return state
// }

export const questionsIsLoading = createReducer(false, {
    [FETCH_QUESTIONS.START]: () => true,
    [FETCH_QUESTIONS.FINISH]: () => false,
})

// export const questionsIsLoading = (state = false, action) => {
//     switch (action.type) {
//         case FETCH_QUESTIONS.START: return true
//         case FETCH_QUESTIONS.FINISH: return false
//         default: return state
//     }
// }

export const search = createReducer('', {
    [SEARCH_CHANGE]: (state, action) => action.payload
})

// export const search = (state = '', action) => {
//     if (action.type === SEARCH_CHANGE) return action.payload
//     return state
// }

export default {questions, questionsIsLoading, search}