import reduxTypesCreator from "redux-types-creator"

export const actionTypes = reduxTypesCreator(true)('START', 'FINISH', 'ERROR')('FETCH_QUESTIONS')

export const { FETCH_QUESTIONS } = actionTypes;