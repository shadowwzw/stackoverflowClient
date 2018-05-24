import delay from 'delay'
import { apiHost } from '../constants'
import {FETCH_QUESTIONS, SEARCH_CHANGE} from '../actionTypes'
import searchResponse from '../fixtures/searchResponse.json'

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