import React from 'react'
import {Panel} from 'react-bootstrap'
import PropTypes from 'prop-types'

const DescriptionOfQuestion = ({author, body}) => (
    <Panel className="animated fadeIn">
        <Panel.Heading>Question from {author}</Panel.Heading>
        <Panel.Body>
            <div dangerouslySetInnerHTML={{__html: body}} />
        </Panel.Body>
    </Panel>
)

DescriptionOfQuestion.propTypes = {
    author: PropTypes.string,
    body: PropTypes.string
}

export default DescriptionOfQuestion