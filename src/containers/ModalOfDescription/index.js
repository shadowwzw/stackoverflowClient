import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {push} from 'react-router-redux'
import {parseSearch} from '../../utils'
import {Button, Modal} from 'react-bootstrap'
import {selectorForModalOfDescription} from '../../selectors'
import {fetchFullQuestion, fetchAnswersByQuestionId} from '../../actions'
import ResultSpinner from '../../components/ResultSpinner'
import DescriptionOfQuestion from '../../components/DescriptionOfQuestion'
import ListOfAnswers from '../../components/ListOfAnswers'

const ModalOfDescription = ({fullQuestion, onHide, answers, fullQuestionIsLoading, answersIsLoading}) => {
    const DescriptionOfQuestionOrSpinner = fullQuestionIsLoading ?
        <ResultSpinner/> : <DescriptionOfQuestion author={fullQuestion.author} body={fullQuestion.body}/>
    const ListOfAnswersOrSpinner = answersIsLoading ? <ResultSpinner/> : <ListOfAnswers answers={answers}/>
    return (
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
                {DescriptionOfQuestionOrSpinner}
                {ListOfAnswersOrSpinner}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapDispatchToProps = {
    fetchAnswersByQuestionId,
    fetchFullQuestion,
    push
}

export default compose(
    connect(selectorForModalOfDescription, mapDispatchToProps),
    withHandlers({
        onHide: ({push, search}) => () => {
            push(`/result?search=${encodeURI(search)}`)
        }
    }),
    lifecycle({
        componentDidMount() {
            const {fetchFullQuestion,fetchAnswersByQuestionId, location, useFixtures} = this.props
            const question_id = parseSearch(location.search).question_id
            fetchFullQuestion(question_id, useFixtures)
            fetchAnswersByQuestionId(question_id, useFixtures)
        }
    })
)(ModalOfDescription)