import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const Puesto = ( props ) => {
    const [idPuesto , setIdPuesto] = useState ( '' )
    const [nombrePuesto , setNombrePuesto] = useState ( '' )
    useEffect ( (  ) => {
        if ( props.puesto ) {
            setIdPuesto ( props.puesto.idPuesto )
            setNombrePuesto ( props.puesto.nombrePuesto )
        }
    } , [ props ] )
    const updatePuesto = (  ) => {
        if ( nombrePuesto === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete el campo nombre' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updatePue = async (  ) => {
                const result = await Servicios.updatePuesto ( idPuesto , nombrePuesto )
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
                        props.actualizaListaPuestos (  )
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
            updatePue (  )
        }
    }
    const deletePuesto= (  ) => {
        const deletePue = async (  ) => {
            const result = await Servicios.deletePuestos ( parseInt ( idPuesto ) )
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
                    props.actualizaListaPuestos (  )
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
        deletePue (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idPuesto}</td>
            <td>{nombrePuesto}</td>
            <td><MyComponent.botonUpdate texto = 'Update Puesto'  onClick = { e => props.cambiaModo ( 'update' , props.puesto ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete Puesto' onClick = { e => props.cambiaModo ( 'delete' , props.puesto ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 4 } >
                <MyComponent.texto label = 'Nombre' value = { nombrePuesto } onChange = { e => setNombrePuesto ( e.target.value ) } />
                <MyComponent.botonAcept texto = 'Update puesto'  onClick = { e=> updatePuesto (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 4 } >
                ¿Esta seguro de eliminar la puesto { nombrePuesto }
                <MyComponent.botonDelete texto = 'Delete puesto'  onClick = { e=> deletePuesto (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( Puesto )