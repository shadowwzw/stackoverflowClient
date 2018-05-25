import React from 'react'
import {FormGroup, FormControl, Form, Col, Button, Row, Modal} from 'react-bootstrap'

const ModalOfDescription = ({}) => (
    <Modal
        show={true}
        onHide={() => {}}
        dialogClassName="custom-modal"
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
                Description
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            123
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => {}}>Close</Button>
        </Modal.Footer>
    </Modal>
)

export default ModalOfDescription