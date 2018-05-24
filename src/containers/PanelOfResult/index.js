import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {fetchQuestionsByIntitle} from '../../actions'
import {Panel, Row, Col} from 'react-bootstrap'
import TableOfResult from '../../components/TableOfResult/index'

const PanelOfResult = () => (
    <Row>
        <Col sm={12} md={12} lg={6}>
            <Panel>
                <Panel.Heading>search results</Panel.Heading>
                <Panel.Body>
                    <TableOfResult data={[]} />
                </Panel.Body>
            </Panel>
        </Col>
    </Row>
)

const mapStateToProps = (state, props) => {
    return {}
}

export default compose(
    connect(mapStateToProps, {
        fetchQuestionsByIntitle
    }),
    lifecycle({
        componentDidMount() {
            this.props.fetchQuestionsByIntitle('react', true)
        }
    })
)(PanelOfResult)