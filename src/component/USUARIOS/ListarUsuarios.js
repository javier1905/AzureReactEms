import React from 'react'
import Usuario from './Usuario'
import {Table, Button} from 'react-bootstrap'
import ModalFormUsuario from './ModalFormUsuario/index'

class ListarUsuarios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listadoUser:[],
            show:false,
            userEDIT:undefined
        }
    }
    mostrarModal = user =>{ this.setState({show:true,userEDIT:user}) }
    ocultarModal = () =>{ this.setState({show:false}) }
    static getDerivedStateFromProps(props,state){
        var listado;
        if(props.listadoUser===[]){ listado=[] ; return listado}
        else{
            listado=props.listadoUser
            if(listado!==state.listadoUser){
                return { listadoUser:listado }
            }else{
                return { listado }
            }
        }
    }
    render() {
        return (
            <div style={{paddingLeft:'30px',paddingRight:'30px'}}>
                <h1 style={{paddingTop:'30px', paddingBottom:'30px'}}>MANAGEMENT USER</h1>
                <Button
                    onClick={e=>{this.mostrarModal(undefined)}}
                    variant="primary" size="lg"
                    block
                    style={{marginBottom:'15px'}}
                >
                    CREAR NUEVO USUARIO
                </Button>
                <ModalFormUsuario
                    show={this.state.show}
                    ocultarModal={this.ocultarModal}
                    user={this.state.userEDIT}
                />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>NOMBRE DE USUARIO</th>
                            <th>PERFIL</th>
                            <th>EMAIL</th>
                            <th>EDITAR</th>
                            <th>ELIMINAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(this.state.listadoUser) ?
                            this.state.listadoUser.map((u,i)=>{
                                return <Usuario
                                    key={i}
                                    usuario={u}
                                    numero={i}
                                    mostrarModal={this.mostrarModal}
                                />
                            })
                            :
                            <tr>
                                <td colSpan = {8}>No found</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListarUsuarios;