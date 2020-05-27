import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import Servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'

const FormAltaClientes = ( props ) => {
    const [nombrePieza , setNombrePieza] = useState ( '' )
    const [idCliente , setIdCliente] = useState ( '' )
    const [idTipoMaterial , setIdTipoMaterial] = useState ( '' )
    const [vecClientes , setVecClientes ] = useState ( [ ] )
    const [vecTiposMaterial , setVecTiposMaterial ] = useState ( [ ] )
    useEffect(()=> {
        setVecClientes(props.vecClientes)
        setVecTiposMaterial(props.vecTiposMaterial)
        setNombrePieza('')
        setIdCliente('')
        setIdTipoMaterial('')
    },[props])
    const miSubmit = e => {
        const SavePieza = async (  ) => {
            try {
                const response = await Servicios.savePieza ( nombrePieza , parseInt ( idCliente ) , parseInt ( idTipoMaterial ) )
                if ( response ) {
                    setNombrePieza ( '' )
                    setIdCliente ( '' )
                    setIdTipoMaterial ( '' )
                    props.enqueueSnackbar( response ,
                    {
                        variant: 'success',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                    props.addPieza (  )
                    props.actualizaVecPiezas (  )
                }
            }
            catch ( e ) {
                props.enqueueSnackbar( e.message ,
                    {
                        variant: 'error',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
            }
        }
        if ( nombrePieza === '' || idCliente === '' || idTipoMaterial === '' ) {
            const myAlert = $('#alertPieza')
            setTimeout ( (  ) => {
                myAlert.slideToggle()
            } , 3000 )
            myAlert.html ( `Complete el o los campos ${nombrePieza === '' ? 'nombre' : '' } , ${idCliente === '' ? 'cliente' : '' } , ${idTipoMaterial === '' ? 'TipoMaterial' : '' } ` )
            myAlert.slideToggle()
        }
        else { SavePieza (  )  }
        e.preventDefault (  )
    }
    return (
        <div>
            <Form onSubmit = { miSubmit }>
                <>
                    <MyComponent.texto
                        label = 'Nombre'
                        value = { nombrePieza }
                        onChange = { e => setNombrePieza ( e.target.value )}
                    />
                    <MyComponent.listaDesplegable
                        label = 'Clientes'
                        value = { idCliente }
                        array = { vecClientes }
                        onChange = {   e => setIdCliente ( e.target.value )}
                        member = {  {valueMember : 'idCliente' , displayMember : 'nombreCliente'} }
                    />
                    <MyComponent.listaDesplegable
                        label = 'Tipos Materiales'
                        value = { idTipoMaterial }
                        array = { vecTiposMaterial }
                        onChange = {   e => setIdTipoMaterial ( e.target.value )}
                        member = {  {valueMember : 'idTipoMaterial' , displayMember : 'nombreTipoMaterial'} }
                    />
                    <MyComponent.botonSave type = 'submit'/>
                    <div>
                        <Alert style = { { display : 'none' } } variant = 'danger' id = 'alertPieza' />
                    </div>
                </>
            </Form>
        </div>
    )
}

export default  withSnackbar ( FormAltaClientes )