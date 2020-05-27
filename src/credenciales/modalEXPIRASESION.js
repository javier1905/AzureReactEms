import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

class ModalEXPIRASESION extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={e=>this.props.esconderModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Prohibido el acceso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Sesion expirada !</Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={e=>this.props.esconderModal()}>
                                Close
                            </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ModalEXPIRASESION);