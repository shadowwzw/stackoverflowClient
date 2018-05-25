import { apiHost } from '../constants'
import searchResponse from '../fixtures/searchResponse.json'
import bestQuestionsByAuthor from '../fixtures/bestQuestionsByAuthor.json'
import fullQuestion from '../fixtures/fullQuestion.json'
import {delay} from '../utils'
import {
    FETCH_QUESTIONS,
    SEARCH_CHANGE,
    QUICK_VIEW_TABLE,
    FETCH_BEST_QUESTIONS_BY_AUTHOR,
    FETCH_FULL_QUESTION
} from '../actionTypes'

export const fetchFullQuestion = (id, fromFixtures = false) => async (dispatch) => {
    dispatch({
        type: FETCH_FULL_QUESTION.START,
        payload: id
    })
    try {
        let json
        if (fromFixtures) {
            await delay(1000)
            json = fullQuestion
        } else {
            const url = `${apiHost}/2.2/questions/${id}?order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wwYGT`
            const response = await fetch(url)
            json = await response.json()
        }
        dispatch({
            type: FETCH_FULL_QUESTION.FINISH,
            payload: json.items[0]
        })
    } catch (error) {
        dispatch({
            type: FETCH_FULL_QUESTION.ERROR,
            payload: error.message
        })
    }
}

export const fetchBestQuestionsByAuthor = (id, fromFixtures = false) => async (dispatch) => {
    dispatch({
        type: FETCH_BEST_QUESTIONS_BY_AUTHOR.START,
        payload: id
    })
    try {
        let json
        if (fromFixtures) {
            await delay(1000)
            json = bestQuestionsByAuthor
        } else {
            const url = `${apiHost}/2.2/users/${id}/questions?order=desc&sort=votes&site=stackoverflow`
            const response = await fetch(url)
            json = await response.json()
        }
        dispatch({
            type: FETCH_BEST_QUESTIONS_BY_AUTHOR.FINISH,
            payload: json.items
        })
    } catch (error) {
        dispatch({
            type: FETCH_BEST_QUESTIONS_BY_AUTHOR.ERROR,
            payload: error.message
        })
    }
}

export const fetchQuestionsByIntitle = (intitle, fromFixtures = false) => async (dispatch) => {
    dispatch({
        type: FETCH_QUESTIONS.START,
        payload: intitle
    })
    try {
        let json
        if (fromFixtures) {
            await delay(1000)
            json = searchResponse
        } else {
            const url = `${apiHost}/2.2/search?order=desc&sort=activity&intitle=${intitle}&site=stackoverflow`
            const response = await fetch(url)
            json = await response.json()
        }
        dispatch({
            type: FETCH_QUESTIONS.FINISH,
            payload: json.items
        })
    } catch (error) {
        dispatch({
            type: FETCH_QUESTIONS.ERROR,
            payload: error.message
        })
    }
}

export const changeSearch = newValue => ({
    type: SEARCH_CHANGE,
    payload: newValue
})

export const quickViewTableEnable = () => ({
    type: QUICK_VIEW_TABLE.ENABLE
})

export const quickViewTableDisable = () => ({
    type: QUICK_VIEW_TABLE.DISABLE
})
