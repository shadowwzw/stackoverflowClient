import {FETCH_QUESTIONS} from '../actionTypes'

export const questionsReducer = (state = [], action) => {
    if (action === FETCH_QUESTIONS.FINISH) return action.payload
    return state
}