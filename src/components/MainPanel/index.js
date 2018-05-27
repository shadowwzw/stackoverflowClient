import React from 'react'
import {Panel} from 'react-bootstrap'
import PropTypes from 'prop-types'
import './index.css'
import ListOfAnswers from "../ListOfAnswers"

const MainPanel = ({children}) => (
    <Panel bsStyle="primary">
        <Panel.Heading>stackoverflow client</Panel.Heading>
        <Panel.Body>
            {children}
        </Panel.Body>
    </Panel>
)

ListOfAnswers.propTypes = {
    children: PropTypes.element
}

export default MainPanel