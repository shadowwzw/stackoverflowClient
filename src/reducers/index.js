import {FETCH_QUESTIONS} from '../actionTypes'

export const questions = (state = [], action) => {
    if (action.type === FETCH_QUESTIONS.FINISH) return action.payload
    return state
}

export const questionsIsLoading = (state = false, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS.START: return true
        case FETCH_QUESTIONS.FINISH: return false
        default: return state
    }
}

export default {questions, questionsIsLoading}