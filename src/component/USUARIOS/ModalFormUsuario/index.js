import React from 'react'
import FormUsuarios from '../FormUsuarios/FormUsuarios'
import {Modal,Button} from 'react-bootstrap'

class index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false,
            aceptarSalir:false
        }
        this.controller = new AbortController()
    }
    static getDerivedStateFromProps(nextProps,nextState){
        return{
            show:nextProps.show
        }
    }
    componentWillUnmount(){
        this.controller.abort()
    }
    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onHide={()=>{this.setState({aceptarSalir:true})}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.aceptarSalir === false?
                            <FormUsuarios
                                ocultarModal={this.props.ocultarModal}
                                user={this.props.user}
                            />
                            :
                            <div>Esta seguro de Salir</div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            this.state.aceptarSalir === false?
                            <Button variant="secondary" onClick={()=>{this.setState({aceptarSalir:true})}}>
                                Cancelar
                            </Button>
                            :
                            <div>
                                <Button
                                    variant="primary"
                                    style={{marginRight:'10px'}}
                                    onClick={()=>{ setTimeout(this.setState({aceptarSalir:false}),3000);this.props.ocultarModal()}}
                                >
                                    Salir
                                </Button>
                                <Button variant="secondary" onClick={()=>{this.setState({aceptarSalir:false})}}>
                                    Cancelar
                                </Button>
                            </div>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default index;