import {createSelector} from 'reselect'

export const questionsIsLoadingSelector = state => state.questionsIsLoading
export const questionsSelector = state => state.questions

export const selectorForPanelOfResult = createSelector(
    questionsIsLoadingSelector,
    questionsSelector,
    (questionsIsLoading, questions) => ({
        questionsIsLoading, questions
    })
)

const searchSelector = state => state.search

export const selectorForSearchPanel = createSelector(
    searchSelector,
    search => ({search})
)

const locationSelector = state => state.routing.location

export const selectorForLocation = createSelector(
    locationSelector,
    location => ({location})
)