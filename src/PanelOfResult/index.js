import React from 'react'
import {Panel, Row, Col} from 'react-bootstrap'
import TableOfResult from '../TableOfResult'

const PanelOfResult = () => (
    <Row>
        <Col sm={12} md={12} lg={6}>
            <Panel>
                <Panel.Heading>search results</Panel.Heading>
                <Panel.Body>
                    <TableOfResult data={[{}]} />
                </Panel.Body>
            </Panel>
        </Col>
    </Row>
)

export default PanelOfResult