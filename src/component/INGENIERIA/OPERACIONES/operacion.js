import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const Operacion = ( props ) => {
    const [idOperacion , setIdOperacion] = useState ( '' )
    const [nombreOperacion , setNombreOperacion] = useState ( '' )
    useEffect ( (  ) => {
        if ( props.operacion ) {
            setIdOperacion ( props.operacion.idOperacion )
            setNombreOperacion ( props.operacion.nombreOperacion )
        }
    } , [ props ] )
    const updateOperacion = (  ) => {
        if ( nombreOperacion === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete el campo nombre' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updateOper = async (  ) => {
                const result = await Servicios.updateOperacion ( nombreOperacion , idOperacion )
                if ( result ) {
                    if ( result.status === 200 ) {
                        props.enqueueSnackbar( result.mensaje,
                        {
                            variant: 'success',
                            preventDuplicate: true,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            }
                        })
                        props.cambiaModo ( 'normal'  , undefined )
                        props.actualizaListaOperaciones (  )
                    }
                    else {
                        props.enqueueSnackbar( result.mensaje,
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
            updateOper (  )
        }
    }
    const deleteOperacion= (  ) => {
        const deleteOpera = async (  ) => {
            const result = await Servicios.deleteOperacion ( parseInt ( idOperacion ) )
            if (  result ) {
                if ( result.status === 200 ) {
                    props.enqueueSnackbar( result.mensaje,
                    {
                        variant: 'success',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                    props.cambiaModo ( 'normal'  , undefined )
                    props.actualizaListaOperaciones (  )
                }
                else {
                    props.enqueueSnackbar( result.mensaje,
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
        deleteOpera (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idOperacion}</td>
            <td>{nombreOperacion}</td>
            <td><MyComponent.botonUpdate texto = 'Update Operacion'  onClick = { e => props.cambiaModo ( 'update' , props.operacion ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete Operacion' onClick = { e => props.cambiaModo ( 'delete' , props.operacion ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 4 } >
                <MyComponent.texto label = 'Nombre' value = { nombreOperacion } onChange = { e => setNombreOperacion ( e.target.value ) } />
                <MyComponent.botonAcept texto = 'Update operacion'  onClick = { e=> updateOperacion (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 4 } >
                ¿Esta seguro de eliminar la operacion { nombreOperacion }
                <MyComponent.botonDelete texto = 'Delete operacion'  onClick = { e=> deleteOperacion (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( Operacion )