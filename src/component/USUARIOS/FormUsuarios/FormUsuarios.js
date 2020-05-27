import React from 'react'
import {Col,Row,Form,Button,Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import FindListaUSUARIOS from '../../../Redux/Actions/findListaUSUARIOS'

class FormUsuarios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listadoPeriles:[],
            validacion:false,
            muestraMensaje:false,
            mensaje:'',
            showModal:false,
            mensajeModal:'',
            id:undefined,
            nombre:undefined,
            apellido:undefined,
            userName:undefined,
            email:undefined,
            perfil:undefined,
            password1:undefined,
            password2:undefined
        }
        this.controller = new AbortController()
    }
    componentDidMount(){
        fetch(`${process.env.REACT_APP_URL_API}/api/usuarios/perfiles`,{
            method:'GET',
            headers: new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${window.sessionStorage.getItem('token')}`
            } )
        })
        .then(dato=>{
            return dato.json()
        })
        .then(json=>{
            this.setState({listadoPeriles:json},()=>{
                if(this.props.user){
                    const {_id,nombre,apellido,userName,email,perfil} = this.props.user
                    this.setState({id:_id,nombre,apellido,userName,email,perfil,password1:undefined})
                }
            })
        })
        .catch(err=>{
            if(err.name === 'AbortError'){
                throw Error
            }
        })
    }
    validacionForm = () =>{
        if(this.state.password1 !== this.state.password2){ return false }
        else{ return true }
    }
    miOnChange = e =>{
        if(e.target.name === 'nombre'){
            this.setState({nombre:e.target.value})
        }else if(e.target.name === 'apellido'){
            this.setState({apellido:e.target.value})
        }else if(e.target.name === 'userName'){
            this.setState({userName:e.target.value})
        }else if(e.target.name === 'perfil'){
            this.setState({perfil:e.target.value})
        }else if(e.target.name === 'email'){
            this.setState({email:e.target.value})
        }else if(e.target.name === 'password1'){
            this.setState({password1:e.target.value})
        }else if(e.target.name === 'password2'){
            this.setState({password2:e.target.value})
        }
    }
    miSubmit = e =>{
        if(this.validacionForm() === true){
            if(this.props.user === undefined){
                // INSERT
                const {nombre,apellido,userName,email,perfil,password1} = this.state
                fetch(`${process.env.REACT_APP_URL_API}/api/usuarios` , {
                    method:'POST',
                    body:JSON.stringify({nombre,apellido,userName,perfil,email,password:password1 }),
                    headers:new Headers ({
                        'Accept': 'Application/json',
                        'Content-Type': 'Application/json' ,
                        authorization : `Bearer ${window.sessionStorage.getItem('token')}`
                    })
                })
                .then(mensaje =>{
                    return mensaje.json()
                })
                .then(json=>{
                    if(json.mensaje){
                        // GUARDADO CORRECTAMENTE
                        setTimeout(()=>{this.props.ocultarModal()},4000)
                        this.setState({showModal:true,mensajeModal:json.mensaje},()=>{
                        this.props.FindListaUSUARIOS()
                    })
                    }else{
                        //ERROR AL GUARDAR
                        setTimeout(()=>{this.setState({showModal:false})},4000)
                        this.setState({showModal:true,mensajeModal:json.error})
                    }
                })
                .catch(err=>{
                    if(err.name === 'AbortError'){
                        throw Error
                    }
                })
            }
            else{
                //UPDATE
                const {id,nombre,apellido,userName,email,perfil,password1} = this.state
                fetch(`${process.env.REACT_APP_URL_API}/api/usuarios/${id}` , {
                    method:'PUT',
                    body:JSON.stringify({nombre,apellido,email,userName,perfil,password:password1}),
                    headers:new Headers ({
                        'Accept': 'Application/json',
                        'Content-Type': 'Application/json' ,
                        authorization : `Bearer ${window.sessionStorage.getItem('token')}`
                    })
                })
                .then(response=>{return response.json()})
                .then(json=>{
                    if(json.mensaje){
                        setTimeout(()=>{this.props.ocultarModal()},4000)
                        this.setState({showModal:true,mensajeModal:json.mensaje},()=>{
                        this.props.FindListaUSUARIOS()})
                    }
                    else{
                        setTimeout(()=>{this.setState({showModal:false})},4000)
                        this.setState({showModal:true,mensajeModal:json.error})
                    }
                })
                .catch(err => {
                    if(err.name === 'AbortError'){
                        throw Error
                    }
                })
            }
        }
        else{
            setTimeout(()=>{this.setState({muestraMensaje:false})},4000)
            this.setState({muestraMensaje:true})
        }
        e.preventDefault()
    }
    cerrarModal = () =>{
        this.setState({showModal:false})
    }
    componentWillUnmount(){
        this.controller.abort()
    }
    render() {
        return (
            <div>
                { this.state.showModal===false?
                    <Form onSubmit={this.miSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        onChange={this.miOnChange}
                                        name='nombre'
                                        defaultValue={this.state.nombre}
                                        type="text"
                                        placeholder="Ingrese el nombre"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formBasicApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        onChange={this.miOnChange}
                                        name='apellido'
                                        defaultValue={this.state.apellido}
                                        type="text"
                                        placeholder="Ingrese el apellido"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formBasicUserName2">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                onChange={this.miOnChange}
                                name='userName'
                                defaultValue={this.state.userName}
                                type="text"
                                placeholder="Ingrese el userName"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Perfil</Form.Label>
                            <Form.Control
                                value={this.state.perfil}
                                as="select"
                                name='perfil'
                                onChange={this.miOnChange}
                            >
                                {
                                    Array.isArray(this.state.listadoPeriles) ?
                                    this.state.listadoPeriles.map((p,i)=>{
                                    return <option key={i}>{p.perfil}</option>
                                    })
                                    :
                                    <option></option>
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={this.miOnChange}
                                name='email'
                                defaultValue={this.state.email}
                                type="email"
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={this.miOnChange}
                                name='password1'
                                defaultValue={this.state.password1}
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={this.miOnChange}
                                name='password2'
                                defaultValue={this.state.password2}
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{width:'100%',height:'60px'}}>
                            Aceptar
                        </Button>
                        {
                            this.state.muestraMensaje &&
                            <Alert id='mensaje' variant='danger'>Verifique que coincidan las password</Alert>
                        }
                    </Form>
                    :
                    <Alert id='mensaje' variant='danger'>{this.state.mensajeModal}</Alert>
                }
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        ListaUsuarios:state.ListaUsuarios
    }
}
const mapDispatchToProps = {
    FindListaUSUARIOS
}
const wrapper = connect(mapStateToProps,mapDispatchToProps)
const component = wrapper(FormUsuarios)

export default component;