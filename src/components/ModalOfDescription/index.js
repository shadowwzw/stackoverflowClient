import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal} from 'react-bootstrap'
import ResultSpinner from '../ResultSpinner'
import DescriptionOfQuestion from '../DescriptionOfQuestion'
import ListOfAnswers from '../ListOfAnswers'

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

ModalOfDescription.propTypes = {
    fullQuestion: PropTypes.shape({
        author: PropTypes.string,
        body: PropTypes.string,
        title: PropTypes.string
    }),
    onHide: PropTypes.func.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        body: PropTypes.string
    })),
    fullQuestionIsLoading: PropTypes.bool.isRequired,
    answersIsLoading: PropTypes.bool.isRequired
}

export default ModalOfDescription