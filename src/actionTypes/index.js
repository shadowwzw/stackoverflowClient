import reduxTypesCreator from "redux-types-creator"

export const actionTypes = reduxTypesCreator(true)(
    'START',
    'FINISH',
    'ERROR',
    'ENABLE',
    'DISABLE'
)('FETCH_QUESTIONS', 'QUICK_VIEW_TABLE')

export const { FETCH_QUESTIONS, QUICK_VIEW_TABLE } = actionTypes;

export const SEARCH_CHANGE = 'SEARCH_CHANGE'