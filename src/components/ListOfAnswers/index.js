import React from 'react'
import {Panel} from 'react-bootstrap'

const ListOfAnswers = ({answers}) => (
    answers.map(answer => (
        <div key={answer.answer_id}>
            <Panel>
                <Panel.Heading>answer from {answer.author}</Panel.Heading>
                <Panel.Body>
                    <div dangerouslySetInnerHTML={{__html: answer.body}}/>
                </Panel.Body>
            </Panel>
        </div>
    ))
)

export default ListOfAnswers