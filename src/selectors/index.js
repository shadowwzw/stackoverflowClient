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