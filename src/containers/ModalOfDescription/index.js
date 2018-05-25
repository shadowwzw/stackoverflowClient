import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {parse} from 'query-string'
import {FormGroup, FormControl, Form, Col, Button, Row, Modal} from 'react-bootstrap'
import {selectorForModalOfDescription} from '../../selectors'
import {fetchFullQuestion} from '../../actions'

const ModalOfDescription = ({fullQuestion}) => (
    <Modal
        show={true}
        onHide={() => {}}
        dialogClassName="custom-modal"
    >
        <Modal.Header closeButton>
            <Modal.Title>
                {fullQuestion.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div dangerouslySetInnerHTML={{__html: fullQuestion.body}} />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => {}}>Close</Button>
        </Modal.Footer>
    </Modal>
)

const mapDispatchToProps = {
    fetchFullQuestion
}

export default compose(
    connect(selectorForModalOfDescription, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const {fetchFullQuestion, location} = this.props
            const question_id = parse(location.search).question_id
            fetchFullQuestion(question_id, true)
        }
    })
)(ModalOfDescription)