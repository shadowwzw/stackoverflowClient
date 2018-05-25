import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, branch,renderComponent} from 'recompose'
import {fetchQuestionsByIntitle} from '../../actions'
import {Panel, Row, Col} from 'react-bootstrap'
import TableOfResult from '../../components/TableOfResult/index'
import ResultSpinner from '../../components/ResultSpinner'
import {selectorForPanelOfResult} from '../../selectors'

const PanelOfResult = ({questions}) => (
    <Row>
        <Col sm={12} md={12} lg={6}>
            <Panel>
                <Panel.Heading>search results</Panel.Heading>
                <Panel.Body>
                    <TableOfResult data={questions} />
                </Panel.Body>
            </Panel>
        </Col>
    </Row>
)

export default compose(
    connect(selectorForPanelOfResult, {
        fetchQuestionsByIntitle
    }),
    lifecycle({
        componentDidUpdate() {
            console.log('questions = ', this.props.questions)
        },
        componentDidMount() {
            this.props.fetchQuestionsByIntitle('react', true)
        }
    }),
    branch(
        ({questionsIsLoading}) => questionsIsLoading,
        renderComponent(ResultSpinner)
    )
)(PanelOfResult)