import React, { useState, useEffect , useRef } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Servicios from '../servicesIngenieria'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'
import { withSnackbar } from 'notistack'

const Pieza = ( props ) => {
    const [modo , setModo ] = useState ( '' )
    const [idPieza] = useState ( props.pieza.idPieza )
    const [nombrePieza , setNombrePieza ] = useState ( '' )
    const [idCliente , setIdCliente ] = useState ( '' )
    const [nombreCliente , setNombreCliente ] = useState ( '' )
    const [idTipoMaterial , setIdTipoMaterial ] = useState ( '' )
    const [nombreTipoMaterial , setNombreTipoMaterial ] = useState ( '' )
    const [vecClientes , setVecClientes ] = useState ( [ ] )
    const [vecTiposMaterial , setVecTiposMaterial ] = useState ( [ ] )
    const cbx_cliente_update = useRef (  )

    useEffect ( (  ) => {
        setModo ( props.modo )
        setNombrePieza ( props.pieza.nombrePieza )
        setNombreCliente ( props.pieza.nombreCliente )
        setNombreTipoMaterial ( props.pieza.nombreTipoMaterial )
        setIdCliente ( props.pieza.idCliente )
        setIdTipoMaterial (  props.pieza.idTipoMaterial)
        setVecClientes ( props.vecClientes )
        setVecTiposMaterial ( props.vecTiposMaterial )
    },[ props ] )
    const calcelUpdate = e => {
        setNombrePieza ( props.pieza.nombrePieza )
        setIdCliente ( props.pieza.idCliente )
        setIdTipoMaterial ( props.pieza.idTipoMaterial )
        props.actualizaModo ( undefined , props.pieza  )
        setModo ( 'normal' )
    }
    const updatePieza = ( info , e ) => {
        const updatePie = async (  ) => {
            const resultMensaje = await Servicios.updatePieza ( parseInt ( idPieza ) , nombrePieza , parseInt ( idCliente ) , parseInt ( idTipoMaterial ) )
            if ( resultMensaje ) {
                    if ( resultMensaje.exito ) {
                        props.enqueueSnackbar( resultMensaje.exito ,
                            {
                                variant: 'success',
                                preventDuplicate: true,
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }
                            })
                            props.actualizaVecPiezas (  )
                    }
                    else {
                        props.enqueueSnackbar( resultMensaje.fracaso ,
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
        }
        if ( nombrePieza === '' || idCliente === '' || idTipoMaterial === '' ) {
            const myAlert = $( '#alertPiezaUpdate' )
            setTimeout ( (  ) => {
                myAlert.slideToggle()
            } , 3000 )
            myAlert.slideToggle()
            myAlert.html ( `Complete Los campos ${nombrePieza === '' ? 'nombre' : ''} ${idCliente === '' ? 'cliente' : ''} ${idTipoMaterial === '' ? 'tipo material' : ''}` )
        }
        else{
            updatePie (  )
            setModo ( 'normal' )
        }
    }
    const deletePieza = ( info , e ) => {
        const deletePie = async (  ) => {
            const result = await Servicios.deletPieza ( idPieza )
            if (  result ) {
                if ( result.exito ) {
                    props.enqueueSnackbar( result.exito ,
                        {
                            variant: 'success',
                            preventDuplicate: true,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            }
                        })
                    setModo ( 'normal' )
                }
                else {
                    props.enqueueSnackbar( result.fracaso ,
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
        }
        deletePie (  )
    }
    return (
        modo === 'normal' ?
        <tr >
            <td>{ idPieza }</td>
            <td>{ nombrePieza }</td>
            <td>{ nombreCliente }</td>
            <td>{ nombreTipoMaterial }</td>
            <td><MyComponent.botonUpdate onClick = { e => { props.actualizaModo ( 'update' , props.pieza  ) } } /></td>
            <td><MyComponent.botonDelete onClick = { e => { props.actualizaModo ( 'delete' , props.pieza  ) } } /></td>
        </tr>
        :
            modo === 'update' ?
            <tr >
                <td colSpan = { 6 }>
                    <>
                        <MyComponent.texto
                            label = 'Nombre'
                            id = { `txt_pieza ${idPieza}` }
                            value = { nombrePieza }
                            onChange = { e => setNombrePieza ( e.target.value )}
                        />
                        <MyComponent.listaDesplegable
                            label = 'Clientes'
                            ref = { cbx_cliente_update }
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
                        <MyComponent.botonAcept onClick = { updatePieza } />
                        <MyComponent.botonCancel onClick = { calcelUpdate } />
                        <div>
                            <Alert style = { { display : 'none' , marginTop : 15 } } variant = 'danger' id = 'alertPiezaUpdate' />
                        </div>
                    </>
                </td>
            </tr>
            :
            <tr >
                <td colSpan = { 6 }>
                    { `Estas seguro de eliminar la pieza  ${nombrePieza}` }
                    <MyComponent.botonAcept onClick = { deletePieza } />
                    <MyComponent.botonCancel onClick = { e => { setModo ( 'normal' ) ; props.actualizaModo ( 'delete' , props.pieza  ) }  } />
                </td>
            </tr>
    )
}
export default withSnackbar ( Pieza )