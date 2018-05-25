import {createReducer} from 'redux-create-reducer';
import {FETCH_QUESTIONS, SEARCH_CHANGE, QUICK_VIEW_TABLE} from '../actionTypes'

export const questions = createReducer([], {
    [FETCH_QUESTIONS.FINISH]: (state, action) => action.payload
})

export const questionsIsLoading = createReducer(false, {
    [FETCH_QUESTIONS.START]: () => true,
    [FETCH_QUESTIONS.FINISH]: () => false,
})

export const search = createReducer('', {
    [SEARCH_CHANGE]: (state, action) => action.payload
})

export const quickViewTableIsEnabled = createReducer(false, {
    [QUICK_VIEW_TABLE.ENABLE]: () => true,
    [QUICK_VIEW_TABLE.DISABLE]: () => false,
})

export default {questions, questionsIsLoading, search}