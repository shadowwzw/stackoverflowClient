import {createReducer} from 'redux-create-reducer';
import {
    FETCH_QUESTIONS,
    SEARCH_CHANGE,
    QUICK_VIEW_TABLE,
    FETCH_BEST_QUESTIONS_BY_AUTHOR
} from '../actionTypes'

export const questions = createReducer([], {
    [FETCH_QUESTIONS.FINISH]: (state, action) => action.payload
})

export const questionsIsLoading = createReducer(false, {
    [FETCH_QUESTIONS.START]: () => true,
    [FETCH_QUESTIONS.FINISH]: () => false,
})

export const bestQuestionsByAuthor = createReducer([], {
    [FETCH_BEST_QUESTIONS_BY_AUTHOR.FINISH]: (state, action) => action.payload
})

export const bestQuestionsByAuthorIsLoading = createReducer(false, {
    [FETCH_BEST_QUESTIONS_BY_AUTHOR.START]: () => true,
    [FETCH_BEST_QUESTIONS_BY_AUTHOR.FINISH]: () => false,
})

export const search = createReducer('', {
    [SEARCH_CHANGE]: (state, action) => action.payload
})

export const quickViewTableIsEnabled = createReducer(false, {
    [QUICK_VIEW_TABLE.ENABLE]: () => true,
    [QUICK_VIEW_TABLE.DISABLE]: () => false,
})

export default {
    questions,
    questionsIsLoading,
    search,
    bestQuestionsByAuthorIsLoading,
    quickViewTableIsEnabled,
    bestQuestionsByAuthor
}