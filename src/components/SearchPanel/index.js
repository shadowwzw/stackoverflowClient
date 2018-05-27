import React from 'react'
import {FormGroup, FormControl, Form, Col, Button, Row} from 'react-bootstrap'
import PropTypes from 'prop-types'

const SearchPanel = ({onChange, onSubmit, search}) => (
    <Row>
        <Col smOffset={3} mdOffset={3} lgOffset={3} sm={6} md={6} lg={5}>
            <Form horizontal className="animated fadeIn">
                <FormGroup controlId="formHorizontalEmail">
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            value={search}
                            onChange={onChange}
                            placeholder="enter text"
                        />
                    </Col>
                    <Col sm={2}>
                        <Button
                            disabled={!search}
                            type="submit"
                            onClick={onSubmit}
                        >search</Button>
                    </Col>
                </FormGroup>
            </Form>
        </Col>
    </Row>
)

SearchPanel.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired
}

export default SearchPanel