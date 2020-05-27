import React from 'react'
import {Modal,Button} from 'react-bootstrap'

class ModalMensaje extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal:false,
            mensaje:''
        }
    }

    static getDerivedStateFromProps(nextProps,NextState){
        return {
            showModal:nextProps.showModal,
            mensaje:nextProps.mensaje
        }
    }
    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.props.cerrarModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Resultado de la operacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.mensaje}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.cerrarModal()}>
                            Aceptar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalMensaje;