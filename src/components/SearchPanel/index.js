import React from 'react'
import {FormGroup, FormControl, Form, Col, Button, Row} from 'react-bootstrap'

const SearchPanel = () => (
    <Row>
        <Col smOffset={3} mdOffset={3} lgOffset={3} sm={6} md={6} lg={5}>
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col sm={10}>
                        <FormControl placeholder="enter text" />
                    </Col>
                    <Col sm={2}>
                        <Button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault()
                            }}
                        >search</Button>
                    </Col>
                </FormGroup>
            </Form>
        </Col>
    </Row>
)

export default SearchPanel