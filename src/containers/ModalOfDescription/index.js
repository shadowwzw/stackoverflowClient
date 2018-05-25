import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {push} from 'react-router-redux'
import {parse} from 'query-string'
import {FormGroup, FormControl, Form, Col, Button, Row, Modal} from 'react-bootstrap'
import {selectorForModalOfDescription} from '../../selectors'
import {fetchFullQuestion, fetchAnswersByQuestionId} from '../../actions'

const ModalOfDescription = ({fullQuestion, onHide}) => (
    <Modal
        show={true}
        onHide={onHide}
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
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
)

const mapDispatchToProps = {
    fetchAnswersByQuestionId,
    fetchFullQuestion,
    push
}

export default compose(
    connect(selectorForModalOfDescription, mapDispatchToProps),
    withHandlers({
        onHide: ({push}) => () => {
            push('/result')
        }
    }),
    lifecycle({
        componentDidMount() {
            const {fetchFullQuestion,fetchAnswersByQuestionId, location} = this.props
            const question_id = parse(location.search).question_id
            fetchFullQuestion(question_id, true)
            fetchAnswersByQuestionId(question_id, true)
        }
    })
)(ModalOfDescription)