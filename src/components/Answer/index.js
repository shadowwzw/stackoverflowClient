import React from 'react'
import {Panel} from 'react-bootstrap'
import PropTypes from 'prop-types'

const Answer = ({author, body}) => (
    <Panel>
        <Panel.Heading>answer from {author}</Panel.Heading>
        <Panel.Body>
            <div dangerouslySetInnerHTML={{__html: body}}/>
        </Panel.Body>
    </Panel>
)

Answer.propTypes = {
    author: PropTypes.string,
    body: PropTypes.string
}

export default Answer