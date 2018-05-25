import {createReducer} from 'redux-create-reducer';
import {
    FETCH_QUESTIONS,
    SEARCH_CHANGE,
    QUICK_VIEW_TABLE,
    FETCH_BEST_QUESTIONS_BY_AUTHOR,
    FETCH_FULL_QUESTION,
    FETCH_ANSWERS_BY_QUESTION_ID,
    FETCH_BEST_QUESTIONS_BY_TAG,
    SET_QUICK_VIEW_TABLE_TYPE
} from '../actionTypes'

export const quickViewTableType = createReducer(null, {
    [SET_QUICK_VIEW_TABLE_TYPE]: (state, action) => action.payload
})

export const answers = createReducer([], {
    [FETCH_ANSWERS_BY_QUESTION_ID.FINISH]: (state, action) => action.payload
})

export const answersIsLoading = createReducer(false, {
    [FETCH_ANSWERS_BY_QUESTION_ID.START]: () => true,
    [FETCH_ANSWERS_BY_QUESTION_ID.FINISH]: () => false,
})

export const questions = createReducer([], {
    [FETCH_QUESTIONS.FINISH]: (state, action) => action.payload
})

export const fullQuestion = createReducer([], {
    [FETCH_FULL_QUESTION.FINISH]: (state, action) => action.payload
})

export const fullQuestionIsLoading = createReducer(false, {
    [FETCH_FULL_QUESTION.START]: () => true,
    [FETCH_FULL_QUESTION.FINISH]: () => false,
})

export const questionsIsLoading = createReducer(false, {
    [FETCH_QUESTIONS.START]: () => true,
    [FETCH_QUESTIONS.FINISH]: () => false,
})

export const bestQuestionsByAuthor = createReducer([], {
    [FETCH_BEST_QUESTIONS_BY_AUTHOR.FINISH]: (state, action) => action.payload
})

export const bestQuestionsByTags = createReducer([], {
    [FETCH_BEST_QUESTIONS_BY_TAG.FINISH]: (state, action) => action.payload
})

export const bestQuestionsByTagsIsLoading = createReducer(false, {
    [FETCH_BEST_QUESTIONS_BY_TAG.START]: () => true,
    [FETCH_BEST_QUESTIONS_BY_TAG.FINISH]: () => false,
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
    bestQuestionsByAuthor,
    fullQuestion,
    fullQuestionIsLoading,
    answers,
    answersIsLoading,
    bestQuestionsByTags,
    bestQuestionsByTagsIsLoading,
    quickViewTableType
}