import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {FormGroup, FormControl, Form, Col, Button, Row, Modal} from 'react-bootstrap'
import {selectorForModalOfDescription} from '../../selectors'
import {fetchFullQuestion} from '../../actions'

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

const mapDispatchToProps = {
    fetchFullQuestion
}

export default compose(
    connect(selectorForModalOfDescription, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const {fetchFullQuestion, location} = this.props
            console.log('location = ', location)
        }
    })
)(ModalOfDescription)