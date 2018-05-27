import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Button} from 'react-bootstrap'
import {BEST_QUESTIONS_BY_AUTHOR_TYPE} from "../../constants"
import TableOfResult from '../TableOfResult'
import ResultSpinner from '../ResultSpinner'

const PanelOfResult = ({
                           questions,
                           getTdProps,
                           bestQuestionsByAuthor,
                           quickViewTableIsEnabled,
                           bestQuestionsByAuthorIsLoading,
                           quickViewTableType,
                           bestQuestionsByTags,
                           bestQuestionsByTagsIsLoading,
                           onClickOnGoToSearch
                       }) => {
    const bestQuestionsTable =
        <TableOfResult
            title="Quick view panel"
            data={quickViewTableType === BEST_QUESTIONS_BY_AUTHOR_TYPE ? bestQuestionsByAuthor : bestQuestionsByTags}
            getTdProps={getTdProps}
        />
    const isLoading = bestQuestionsByAuthorIsLoading || bestQuestionsByTagsIsLoading
    const TableOfResultOrSpinner = isLoading ? <ResultSpinner /> : bestQuestionsTable
    return <div>
        <Row>
            <Col sm={2}>
                <Button
                    onClick={onClickOnGoToSearch}
                >go to search</Button>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={12} lg={6}>
                <TableOfResult
                    title="Search results"
                    data={questions}
                    getTdProps={getTdProps}
                    caption="search results"
                />
            </Col>
            {quickViewTableIsEnabled && <Col sm={12} md={12} lg={6}>{TableOfResultOrSpinner}</Col>}
        </Row>
    </div>
}

PanelOfResult.propTypes = {
    onClickOnGoToSearch: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    getTdProps: PropTypes.func.isRequired,
    bestQuestionsByAuthor: PropTypes.array.isRequired,
    bestQuestionsByTags: PropTypes.array.isRequired,
    quickViewTableType: PropTypes.string,
    bestQuestionsByTagsIsLoading: PropTypes.bool.isRequired
}

export default PanelOfResult