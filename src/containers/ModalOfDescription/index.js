import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {push} from 'react-router-redux'
import {parse} from 'query-string'
import {Button, Modal, Panel} from 'react-bootstrap'
import {selectorForModalOfDescription} from '../../selectors'
import {fetchFullQuestion, fetchAnswersByQuestionId} from '../../actions'

const ModalOfDescription = ({fullQuestion, onHide, answers}) => (
    <Modal
        bsSize="large"
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
            <Panel>
                <Panel.Heading>Question from {fullQuestion.author}</Panel.Heading>
                <Panel.Body>
                    <div dangerouslySetInnerHTML={{__html: fullQuestion.body}} />
                </Panel.Body>
            </Panel>
            {answers.map(answer => (
                <div key={answer.answer_id}>
                    <Panel>
                        <Panel.Heading>answer from {answer.author}</Panel.Heading>
                        <Panel.Body>
                            <div dangerouslySetInnerHTML={{__html: answer.body}}/>
                        </Panel.Body>
                    </Panel>
                </div>
            ))}
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
            const {fetchFullQuestion,fetchAnswersByQuestionId, location, useFixtures} = this.props
            const question_id = parse(location.search).question_id
            fetchFullQuestion(question_id, useFixtures)
            fetchAnswersByQuestionId(question_id, useFixtures)
        }
    })
)(ModalOfDescription)