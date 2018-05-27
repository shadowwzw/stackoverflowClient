import React from 'react'
import PropTypes from 'prop-types'
import Answer from '../Answer'

const ListOfAnswers = ({answers}) => (
    answers.map(answer => (
        <div key={answer.answer_id} className="animated fadeIn">
            <Answer author={answer.author} body={answer.body}/>
        </div>
    ))
)

ListOfAnswers.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        body: PropTypes.string
    }))
}

export default ListOfAnswers