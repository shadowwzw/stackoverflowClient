import React from 'react'
import {Col, Row} from 'react-bootstrap'
import { GridLoader } from 'react-spinners';

const ResultSpinner = () => (
    <Row>
        <Col smOffset={5} mdOffset={5} lgOffset={5} sm={3} md={3} lg={3}>
            <GridLoader color='#F87100'/>
        </Col>
    </Row>
)

export default ResultSpinner