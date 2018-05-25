import {createSelector} from 'reselect'
import get from 'lodash/get'

export const questionsIsLoadingSelector = state => state.questionsIsLoading

export const createQuestionsSelector = key => state => state[key].map(item => {
    return {
        question_id: get(item, 'question_id', 0),
        author: get(item, 'owner.display_name', ''),
        subject: get(item, 'title', ''),
        numberOfAnswers: get(item, 'answer_count', ''),
        tags: get(item, 'tags', []).join(' '),
        user_id: get(item, 'owner.user_id', 0)
    }
})

const quickViewTableIsEnabledSelector = state => state.quickViewTableIsEnabled

export const selectorForPanelOfResult = createSelector(
    questionsIsLoadingSelector,
    createQuestionsSelector('questions'),
    createQuestionsSelector('bestQuestionsByAuthor'),
    quickViewTableIsEnabledSelector,
    (
        questionsIsLoading,
        questions,
        bestQuestionsByAuthor,
        quickViewTableIsEnabledSelector
        ) => ({
            questionsIsLoading,
            questions,
            bestQuestionsByAuthor,
            quickViewTableIsEnabledSelector
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