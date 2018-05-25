import React from 'react'
import {Panel} from 'react-bootstrap'

const DescriptionOfQuestion = ({author, body}) => (
    <Panel className="animated fadeIn">
        <Panel.Heading>Question from {author}</Panel.Heading>
        <Panel.Body>
            <div dangerouslySetInnerHTML={{__html: body}} />
        </Panel.Body>
    </Panel>
)

export default DescriptionOfQuestion