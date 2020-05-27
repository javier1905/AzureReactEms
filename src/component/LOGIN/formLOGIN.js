import React  from 'react'
import { findDOMNode } from 'react-dom'
import {Form,Alert} from 'react-bootstrap'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import MyComponent from '../AAprimary/misComponentes'
import Typography from '@material-ui/core/Typography'
import $ from 'jquery'
import './styleLOGIN.css'

class FormLOGIN extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName:undefined,
            password:undefined,
            bandera : false,
            mensaje : ''
        }
        this.MyAlert = React.createRef (  )
    }
    caturaUser = e =>{
        if(e.target.name ==='userName'){
            this.setState({userName:e.target.value})
        }
        if(e.target.name === 'password'){
            this.setState ( { password : e.target.value } )
        }
    }
    miSubmit = e => {
        const {userName,password} = this.state
        const d = {userName,password}
        fetch ( `${process.env.REACT_APP_URL_API}/api/logueo` , {
            method : 'POST',
            body : JSON.stringify( d ) ,
            headers : {
                'Accept' : 'Application/json',
                'Content-Type' : 'Application/json'
            }
        })
        .then ( json => json.json (  ) )
        .then ( dato => {
            if(dato.token) {
                sessionStorage.removeItem('token')
                sessionStorage.setItem('token',dato.token)
                this.props.history.push('/home')
            }
            else if (dato.mensaje) {
                const  alert = findDOMNode ( this.refs.alert )
                $(alert).slideToggle (  )
                setTimeout ( (  ) => {
                    this.setState ( { mensaje : '' } )
                    $(alert).slideToggle (  )
                } , 4000 )
                this.setState({ mensaje:dato.mensaje})
            }
        })
        e.preventDefault (  )
    }
    render() {
        return (
            <div>
                <Form onSubmit = { this.miSubmit }  >
                    <Typography style = { { marginBottom : 30 } } variant = 'h2' >Inicio de Sesion</Typography>
                    <MyComponent.texto
                        id = 'user'
                        name="userName"
                        onChange = { this.caturaUser }
                        required
                        value = { this.state.userName }
                        label = 'Nombre de Usuario'
                        width = '100%'
                    />
                    <MyComponent.password
                        id = 'pass'
                        required
                        name = "password"
                        value = { this.state.password }
                        onChange = { this.caturaUser }
                    />
                    <Button variant="contained" color="primary" style = { { marginTop : 25 , width : '100%' , padding : 20 } }  type = 'submit'>
                        <Typography variant = 'h5'>Iniciar Sesion</Typography>
                    </Button>
                </Form>
                <div>
                </div>
                <Alert ref = 'alert' id='mensaje' variant='danger' style = { { display : 'none' } }>
                    {this.state.mensaje}
                </Alert>
            </div>
        )
    }
}
export default withRouter(FormLOGIN);