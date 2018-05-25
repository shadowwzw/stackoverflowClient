import {createSelector} from 'reselect'
import get from 'lodash/get'

export const questionsIsLoadingSelector = state => state.questionsIsLoading

export const createQuestionsSelector = key => state => state[key].map(item => ({
    question_id: get(item, 'question_id', 0),
    author: get(item, 'owner.display_name', ''),
    subject: get(item, 'title', ''),
    numberOfAnswers: get(item, 'answer_count', ''),
    tags: get(item, 'tags', []).join(' '),
    user_id: get(item, 'owner.user_id', 0)
}))

const searchSelector = state => state.search

const useFixturesSelector = state => state.useFixtures

const quickViewTableIsEnabledSelector = state => state.quickViewTableIsEnabled

const bestQuestionsByAuthorIsLoadingSelector = state => state.bestQuestionsByAuthorIsLoading

const quickViewTableTypeSelector = state => state.quickViewTableType

export const selectorForPanelOfResult = createSelector(
    questionsIsLoadingSelector,
    createQuestionsSelector('questions'),
    createQuestionsSelector('bestQuestionsByAuthor'),
    quickViewTableIsEnabledSelector,
    bestQuestionsByAuthorIsLoadingSelector,
    quickViewTableTypeSelector,
    createQuestionsSelector('bestQuestionsByTags'),
    useFixturesSelector,
    searchSelector,
    (
        questionsIsLoading,
        questions,
        bestQuestionsByAuthor,
        quickViewTableIsEnabledSelector,
        bestQuestionsByAuthorIsLoadingSelector,
        quickViewTableType,
        bestQuestionsByTags,
        useFixtures,
        search
        ) => ({
            questionsIsLoading,
            questions,
            bestQuestionsByAuthor,
            quickViewTableIsEnabledSelector,
            bestQuestionsByAuthorIsLoadingSelector,
            quickViewTableType,
            bestQuestionsByTags,
            useFixtures,
            search
        })
)

export const answersSelector = ({answers}) => answers.map(answer => ({
    author: get(answer, 'owner.display_name', ''),
    body: answer.body,
    answer_id: answer.answer_id
}))

export const fullQuestionSelector = ({fullQuestion}) => ({
    body: fullQuestion.body,
    title: fullQuestion.title,
    author: get(fullQuestion, 'owner.display_name')
})

export const fullQuestionIsLoadingSelector = state => state.fullQuestionIsLoading

export const selectorForModalOfDescription = createSelector(
    fullQuestionSelector,
    fullQuestionIsLoadingSelector,
    answersSelector,
    useFixturesSelector,
    (
        fullQuestion,
        fullQuestionIsLoading,
        answers,
        useFixtures
    ) => ({
        fullQuestion,
        fullQuestionIsLoading,
        answers,
        useFixtures
    })
)

export const selectorForSearchPanel = createSelector(
    searchSelector,
    search => ({search})
)

const locationSelector = state => state.routing.location

export const selectorForLocation = createSelector(
    locationSelector,
    location => ({location})
)