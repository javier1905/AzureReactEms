import React from 'react'
import {Button} from 'react-bootstrap'

class Usuario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <tr>
                <td>{this.props.numero+1}</td>
                <td>{this.props.usuario.nombre}</td>
                <td>{this.props.usuario.apellido}</td>
                <td>{this.props.usuario.userName}</td>
                <td>{this.props.usuario.perfil}</td>
                <td>{this.props.usuario.email}</td>
                <td>
                    <Button
                        variant="outline-success"
                        onClick={e=>{this.props.mostrarModal(this.props.usuario)}}
                    >
                        EDITAR
                    </Button>
                </td>
                <td><Button variant="outline-danger">ELIMINAR</Button></td>
            </tr>
        );
    }
}

export default Usuario;