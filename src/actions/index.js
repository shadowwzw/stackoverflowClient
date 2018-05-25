import { apiHost } from '../constants'
import searchResponse from '../fixtures/searchResponse.json'
import {delay} from '../utils'
import {
    FETCH_QUESTIONS,
    SEARCH_CHANGE,
    QUICK_VIEW_TABLE
} from '../actionTypes'

export const fetchBestQuestionsByAuthor = (intitle, fromFixtures = false) => async (dispatch) => {
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
        console.log('json = ', json)
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
        console.log('json = ', json)
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

export const quickViewTableEnable = ({
    type: QUICK_VIEW_TABLE.ENABLE
})

export const quickViewTableDisable = ({
    type: QUICK_VIEW_TABLE.DISABLE
})
