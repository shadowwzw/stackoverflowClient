import React from 'react'
import {connect} from 'react-redux'
import get from 'lodash/get'
import {compose, lifecycle, branch,renderComponent, withProps} from 'recompose'
import {push} from 'react-router-redux'
import {parse} from 'query-string'
import {Row, Col} from 'react-bootstrap'
import {
    fetchQuestionsByIntitle,
    fetchBestQuestionsByAuthor,
    quickViewTableEnable,
    fetchBestQuestionsByTag,
    setQuickViewTableType,
    changeSearch
} from '../../actions'
import TableOfResult from '../../components/TableOfResult/index'
import ResultSpinner from '../../components/ResultSpinner'
import {selectorForPanelOfResult} from '../../selectors'
import {BEST_QUESTIONS_BY_AUTHOR_TYPE, BEST_QUESTIONS_BY_TAGS_TYPE} from '../../constants'

const PanelOfResult = ({
                           questions,
                           rowEvents,
                           getTdProps,
                           bestQuestionsByAuthor,
                           quickViewTableIsEnabled,
                           bestQuestionsByAuthorIsLoading,
                           quickViewTableType,
                           bestQuestionsByTags,
                           bestQuestionsByTagsIsLoading
}) => {
    const bestQuestionsTable =
        <TableOfResult
            title="Quick view panel"
            data={quickViewTableType === BEST_QUESTIONS_BY_AUTHOR_TYPE ? bestQuestionsByAuthor : bestQuestionsByTags}
            rowEvents={rowEvents}
            getTdProps={getTdProps}
        />
    const isLoading = bestQuestionsByAuthorIsLoading || bestQuestionsByTagsIsLoading
    const TableOfResultOrSpinner = isLoading ? <ResultSpinner /> : bestQuestionsTable
    return <Row>
        <Col sm={12} md={12} lg={6}>
            <TableOfResult
                title="Search results"
                data={questions}
                rowEvents={rowEvents}
                getTdProps={getTdProps}
                caption="search results"
            />
        </Col>
        {quickViewTableIsEnabled && <Col sm={12} md={12} lg={6}>{TableOfResultOrSpinner}</Col>}
    </Row>
}

const mapDispatchToProps = {
    fetchQuestionsByIntitle,
    fetchBestQuestionsByAuthor,
    quickViewTableEnable,
    fetchBestQuestionsByTag,
    setQuickViewTableType,
    changeSearch,
    push
}

export default compose(
    connect(selectorForPanelOfResult, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const {fetchQuestionsByIntitle, search, useFixtures, location, changeSearch} = this.props
            console.log('location = ', location)
            const {search: searchFromLocation} = parse(location.search)
            const decodedSearchFromLocation = decodeURI(searchFromLocation)
            console.log('decodedSearchFromLocation = ', decodedSearchFromLocation)
            if (search === undefined) changeSearch(decodedSearchFromLocation)
            fetchQuestionsByIntitle(decodedSearchFromLocation, useFixtures)
        },
    }),
    branch(
        ({questionsIsLoading}) => questionsIsLoading,
        renderComponent(ResultSpinner)
    ),
    withProps(
        ({
             fetchBestQuestionsByAuthor,
             quickViewTableEnable,
             fetchBestQuestionsByTag,
             setQuickViewTableType,
             useFixtures,
             search,
             push
        }) => ({
            getTdProps: (state, rowInfo, column) => {
                return {
                    onClick: (e, handleOriginal) => {
                        if (handleOriginal) {
                            handleOriginal()
                        }
                        switch (column.Header) {
                            case 'Author':
                                const user_id = get(rowInfo, 'original.user_id', 0)
                                fetchBestQuestionsByAuthor(user_id, useFixtures)
                                setQuickViewTableType(BEST_QUESTIONS_BY_AUTHOR_TYPE)
                                quickViewTableEnable()
                                break
                            case 'Subject':
                            case 'Answers':
                                const question_id = get(rowInfo, 'original.question_id', 0)
                                push(`/result/description?search=${encodeURI(search)}&question_id=${question_id}`)
                                break
                            case 'Tags':
                                const tags = get(rowInfo, 'original.tags', 'javascript')
                                fetchBestQuestionsByTag(tags, useFixtures)
                                setQuickViewTableType(BEST_QUESTIONS_BY_TAGS_TYPE)
                                quickViewTableEnable()
                                break
                            default: break
                        }
                    }
                }
            }
        })
    )
)(PanelOfResult)