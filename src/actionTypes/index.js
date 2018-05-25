import reduxTypesCreator from "redux-types-creator"

export const actionTypes = reduxTypesCreator(true)(
    'START',
    'FINISH',
    'ERROR',
    'ENABLE',
    'DISABLE'
)('FETCH_QUESTIONS', 'QUICK_VIEW_TABLE', 'FETCH_BEST_QUESTIONS_BY_AUTHOR')

export const {
    FETCH_QUESTIONS,
    QUICK_VIEW_TABLE,
    FETCH_BEST_QUESTIONS_BY_AUTHOR
} = actionTypes;

export const SEARCH_CHANGE = 'SEARCH_CHANGE'