import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, branch,renderComponent, withProps} from 'recompose'
import {fetchQuestionsByIntitle, fetchBestQuestionsByAuthor} from '../../actions'
import {Row, Col} from 'react-bootstrap'
import TableOfResult from '../../components/TableOfResult/index'
import ResultSpinner from '../../components/ResultSpinner'
import {selectorForPanelOfResult} from '../../selectors'

const PanelOfResult = ({questions, rowEvents, getTdProps}) => (
    <Row>
        <Col sm={12} md={12} lg={6}>
            <TableOfResult
                data={questions}
                rowEvents={rowEvents}
                getTdProps={getTdProps}
                caption="search results"
            />
        </Col>
    </Row>
)

export default compose(
    connect(selectorForPanelOfResult, {
        fetchQuestionsByIntitle,
        fetchBestQuestionsByAuthor
    }),
    lifecycle({
        componentDidUpdate() {
            console.log('questions = ', this.props.questions)
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
        ({fetchBestQuestionsByAuthor}) => ({
            getTdProps: (state, rowInfo, column, instance) => {
                return {
                    onClick: (e, handleOriginal) => {
                        if (column.Header === 'Author') {
                            fetchBestQuestionsByAuthor(123, true)
                        }
                        console.log("A Td Element was clicked!");
                        console.log("it produced this event:", e);
                        console.log("It was in this column:", column);
                        console.log("It was in this row:", rowInfo);
                        console.log("It was in this table instance:", instance);

                        // IMPORTANT! React-Table uses onClick internally to trigger
                        // events like expanding SubComponents and pivots.
                        // By default a custom 'onClick' handler will override this functionality.
                        // If you want to fire the original onClick handler, call the
                        // 'handleOriginal' function.
                        if (handleOriginal) {
                            handleOriginal()
                        }
                    }
                }
            }
        })
    )
)(PanelOfResult)