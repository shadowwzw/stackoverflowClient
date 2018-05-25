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
    fetchBestQuestionsByTag
} from '../../actions'
import TableOfResult from '../../components/TableOfResult/index'
import ResultSpinner from '../../components/ResultSpinner'
import {selectorForPanelOfResult} from '../../selectors'

const PanelOfResult = ({
                           questions,
                           rowEvents,
                           getTdProps,
                           bestQuestionsByAuthor,
                           quickViewTableIsEnabledSelector,
                           bestQuestionsByAuthorIsLoadingSelector
}) => {
    const bestQuestionsTable =
        <TableOfResult
            data={bestQuestionsByAuthor}
            rowEvents={rowEvents}
            getTdProps={getTdProps}
            caption="search results"
        />
    const TableOfResultOrSpinner = bestQuestionsByAuthorIsLoadingSelector ? <ResultSpinner /> : bestQuestionsTable
    return <Row>
        <Col sm={12} md={12} lg={6}>
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
    push
}

export default compose(
    connect(selectorForPanelOfResult, mapDispatchToProps),
    lifecycle({
        componentDidUpdate() {
            // console.log('questions = ', this.props.questions)
        },
        componentDidMount() {
            const {fetchQuestionsByIntitle, search} = this.props
            fetchQuestionsByIntitle(search, true)
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
             push
        }) => ({
            getTdProps: (state, rowInfo, column, instance) => {
                return {
                    onClick: (e, handleOriginal) => {
                        if (handleOriginal) {
                            handleOriginal()
                        }
                        switch (column.Header) {
                            case 'Author':
                                const user_id = get(rowInfo, 'original.user_id', 0)
                                fetchBestQuestionsByAuthor(user_id, true)
                                quickViewTableEnable()
                                break
                            case 'Subject':
                            case 'Answers':
                                const question_id = get(rowInfo, 'original.question_id', 0)
                                push(`/result/description?question_id=${question_id}`)
                                break
                            case 'Tags':
                                const tags = get(rowInfo, 'original.tags', 'javascript')
                                fetchBestQuestionsByTag(tags, false)
                                break
                            default: break
                        }
                    }
                }
            }
        })
    )
)(PanelOfResult)