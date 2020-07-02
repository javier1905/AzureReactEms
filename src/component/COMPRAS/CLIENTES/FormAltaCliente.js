import React , { useState , useEffect } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import Servicios from './serviceClientes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'

const FormAltalCliente = ( {actualizaListaAalta , limpiaCampos} ) => {
    const [nombre,setNombre] = useState ('')
    const [razonSocial,setRazonSocial] = useState ('')
    useEffect(() => {
        setNombre('')
        setRazonSocial('')
    }, [limpiaCampos])
    const mySubmit = e => {
        const altaCli = async (  ) => {
            const men  = await Servicios.altaCliente ( nombre , razonSocial )
            if ( men ) {
                setNombre ( '' )
                setRazonSocial ( '' )
                alert ( men.mensaje )
                actualizaListaAalta (  )
            }
        }
        if ( nombre !== '' && razonSocial !== '' ) {
        altaCli (  )
        }
        else {
            const alerAlta = $('#myAlertAlta')
            setTimeout ( (  ) => { alerAlta.slideToggle (  ) } , 3000 )
            alerAlta.html  ( ` Complete el campo ${nombre === '' ? 'nombre' : ''} ${razonSocial === '' ? 'Razon Social ' : ''}` )
            alerAlta.slideToggle (  )
        }
        e.preventDefault( )
    }
    return (
        <Form onSubmit = { mySubmit }>
            <MyComponent.texto id = 'nomCliAlt' style = { { marginRigth : 30 } } width = { 200  } value = {  nombre  } label = 'Nombre'  onChange = { e => { setNombre ( e.target.value ) } } />
            <MyComponent.texto id = 'raSoCliAlt' value = {  razonSocial  } label = 'Razon Social' onChange = { e => { setRazonSocial ( e.target.value ) } } />
            <MyComponent.botonSave/>
            <Alert id = 'myAlertAlta' style = { { display : 'none' , marginTop : 10 } } variant = 'danger' ></Alert>
        </Form>
    )
}
export default FormAltalCliente