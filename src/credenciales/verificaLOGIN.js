import React from 'react'
import {connect} from 'react-redux'
import findUsuarioLOGIN from '../Redux/Actions/findUsuarioLOGIN'
import IndexModalEXPIRASESION from './indexModalEXPIRASESION'

class VerificaLOGIN extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            user:{
                userName:undefined,
                nombre:undefined,
                apellido:undefined,
                perfil:undefined,
                email:undefined
            },
            comprobacion:true
        }
    }
    ve = () =>{
        const token = sessionStorage.getItem('token')
        fetch(`${process.env.REACT_APP_URL_API}/api/autentificasion`,{
            method:'GET',
            headers:new Headers({
                authorization:`Bearer ${token}`,
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
            })
        })
        .then(dato=>dato.json())
        .then(json=>{
            if(json.userName){
                this.setState({user:json,comprobacion:true},()=>{
                    this.props.findUsuarioLOGIN(json)
                })
            }
            else{ this.setState({comprobacion:false}) }
        }).catch( e=> this.setState ( {comprobacion:false } ) )
    }
    componentDidMount(){ this.ve() }
    componentDidUpdate(){ this.props.findUsuarioLOGIN(this.state.user) }
    render(){
        return(<div>
            { this.state.comprobacion===true? <div></div>: <IndexModalEXPIRASESION/>}
        </div>)
    }
}

const mapStateToProps = state => ({
    UsuarioLOGIN: state.UsuarioLOGIN
});
const mapDispatchToProps = {
    findUsuarioLOGIN
}

const wrapper = connect(mapStateToProps,mapDispatchToProps)
const component = wrapper(VerificaLOGIN)
export default  component;