import React from 'react'
import {Panel} from 'react-bootstrap'
import './index.css'

const MainPanel = ({children}) => (
    <Panel bsStyle="primary">
        <Panel.Heading>stackoverflow client</Panel.Heading>
        <Panel.Body>
            {children}
        </Panel.Body>
    </Panel>
)

export default MainPanel