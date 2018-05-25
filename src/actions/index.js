import get from 'lodash/get'
import randomInt from 'random-int'
import { apiHost } from '../constants'
import searchResponse from '../fixtures/searchResponse.json'
import bestQuestionsByAuthor from '../fixtures/bestQuestionsByAuthor.json'
import fullQuestion from '../fixtures/fullQuestion.json'
import answersByQuestionId from '../fixtures/answersByQuestionId.json'
import answersByTag from '../fixtures/answersByTag.json'
import {delay} from '../utils'
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

export const fetchAnswersByQuestionId = (id, fromFixtures = false) => async (dispatch) => {
    dispatch({
        type: FETCH_ANSWERS_BY_QUESTION_ID.START,
        payload: id
    })
    try {
        let json
        if (fromFixtures) {
            await delay(1000)
            json = answersByQuestionId
        } else {
            const url = `${apiHost}/2.2/questions/${id}/answers` +
                '?order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wzu0T'
            const response = await fetch(url)
            json = await response.json()
        }
        dispatch({
            type: FETCH_ANSWERS_BY_QUESTION_ID.FINISH,
            payload: json.items
        })
    } catch (error) {
        dispatch({
            type: FETCH_ANSWERS_BY_QUESTION_ID.ERROR,
            payload: error.message
        })
    }
}

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

export const fetchBestQuestionsByTag = (tags, fromFixtures = false) => async (dispatch) => {
    dispatch({
        type: FETCH_BEST_QUESTIONS_BY_TAG.START,
        payload: tags
    })
    try {
        let json
        if (fromFixtures) {
            await delay(1000)
            json = answersByTag
        } else {
            const topAskersUrl = `${apiHost}/2.2/tags/javascript/top-askers/all_time` +
                '?pagesize=100&site=stackoverflow&filter=!T(Pes*aFoM1ltCn4jY'
            const topAskersResponse = await fetch(topAskersUrl)
            const result = await topAskersResponse.json()
            const randomNumber = randomInt(0, result.items.length - 1)
            const randomItem = result.items[randomNumber]
            const id = get(randomItem, 'user.user_id')
            const url = `${apiHost}/2.2/users/${id}/tags/${encodeURI(tags)}/top-questions` +
                '?order=desc&sort=activity&site=stackoverflow'
            const response = await fetch(url)
            json = await response.json()
        }
        dispatch({
            type: FETCH_BEST_QUESTIONS_BY_TAG.FINISH,
            payload: json.items
        })
    } catch (error) {
        dispatch({
            type: FETCH_BEST_QUESTIONS_BY_TAG.ERROR,
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

export const setQuickViewTableType = (type) => ({
    type: SET_QUICK_VIEW_TABLE_TYPE,
    payload: type
})