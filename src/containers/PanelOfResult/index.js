import React from 'react'
import {connect} from 'react-redux'
import get from 'lodash/get'
import {compose, lifecycle, branch,renderComponent, withProps} from 'recompose'
import {push} from 'react-router-redux'
import {Row, Col} from 'react-bootstrap'
import {
    fetchQuestionsByIntitle,
    fetchBestQuestionsByAuthor,
    quickViewTableEnable,
    fetchBestQuestionsByTag,
    setQuickViewTableType
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
                           quickViewTableIsEnabledSelector,
                           bestQuestionsByAuthorIsLoadingSelector,
                           quickViewTableType,
                           bestQuestionsByTags
}) => {
    const bestQuestionsTable =
        <div>
            <h3>Quick view panel</h3>
            <TableOfResult
                data={quickViewTableType === BEST_QUESTIONS_BY_AUTHOR_TYPE ? bestQuestionsByAuthor : bestQuestionsByTags}
                rowEvents={rowEvents}
                getTdProps={getTdProps}
                caption="search results"
            />
        </div>
    const TableOfResultOrSpinner = bestQuestionsByAuthorIsLoadingSelector ? <ResultSpinner /> : bestQuestionsTable
    return <Row>
        <Col sm={12} md={12} lg={6}>
            <h3>Search results</h3>
            <TableOfResult
                data={questions}
                rowEvents={rowEvents}
                getTdProps={getTdProps}
                caption="search results"
            />
        </Col>
        {quickViewTableIsEnabledSelector && <Col sm={12} md={12} lg={6}>{TableOfResultOrSpinner}</Col>}
    </Row>
}

const mapDispatchToProps = {
    fetchQuestionsByIntitle,
    fetchBestQuestionsByAuthor,
    quickViewTableEnable,
    fetchBestQuestionsByTag,
    setQuickViewTableType,
    push
}

export default compose(
    connect(selectorForPanelOfResult, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const {fetchQuestionsByIntitle, search, useFixtures} = this.props
            fetchQuestionsByIntitle(search, useFixtures)
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
                                push(`/result/description?question_id=${question_id}`)
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