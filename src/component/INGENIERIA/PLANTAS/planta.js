import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const Planta = ( props ) => {
    const [idPlanta , setIdPlanta] = useState ( '' )
    const [nombrePlanta , setNombrePlanta] = useState ( '' )
    const [barrioPlanta , setBarrioPlanta] = useState ( '' )
    const [codigoPostalPlanta , setCodigoPostalPlanta] = useState ( '' )
    const [callePlanta , setCallePlanta] = useState ( '' )
    const [alturaCallePlanta , setAlturaCallePlanta] = useState ( '' )
    useEffect ( (  ) => {
        if ( props.planta ) {
            setIdPlanta ( props.planta.idPlanta )
            setNombrePlanta ( props.planta.nombrePlanta )
            setBarrioPlanta ( props.planta.barrioPlanta )
            setCodigoPostalPlanta ( props.planta.codigoPostalPlanta )
            setCallePlanta ( props.planta.callePlanta )
            setAlturaCallePlanta ( props.planta.alturaCallePlanta )
        }
    } , [ props ] )
    const updatePlanta = (  ) => {
        if ( nombrePlanta === '' ||  barrioPlanta === ''  || codigoPostalPlanta === '' || callePlanta === '' || alturaCallePlanta === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete el campo nombre' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updatePla = async (  ) => {
                const result = await Servicios.updatePlanta ( idPlanta , nombrePlanta , barrioPlanta , codigoPostalPlanta , callePlanta , alturaCallePlanta )
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
                        props.actualizaListaPlantas (  )
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
            updatePla (  )
        }
    }
    const deletePlanta = (  ) => {
        const deletePla = async (  ) => {
            const result = await Servicios.deletePlanta ( parseInt ( idPlanta ) )
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
                    props.actualizaListaPlantas (  )
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
        deletePla (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idPlanta}</td>
            <td>{nombrePlanta}</td>
            <td>{barrioPlanta}</td>
            <td>{codigoPostalPlanta}</td>
            <td>{callePlanta}</td>
            <td>{alturaCallePlanta}</td>
            <td><MyComponent.botonUpdate texto = 'Update planta'  onClick = { e => props.cambiaModo ( 'update' , props.planta ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete planta' onClick = { e => props.cambiaModo ( 'delete' , props.planta ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 8 } >
                <MyComponent.texto label = 'Nombre' value = { nombrePlanta } onChange = { e => setNombrePlanta ( e.target.value ) } />
                <MyComponent.texto label = 'Barrio' value = { barrioPlanta } onChange = { e => setBarrioPlanta ( e.target.value ) } />
                <MyComponent.numero label = 'CP' value = { codigoPostalPlanta } onChange = { e => setCodigoPostalPlanta ( e.target.value ) } />
                <MyComponent.texto label = 'Calle' value = { callePlanta } onChange = { e => setCallePlanta ( e.target.value ) } />
                <MyComponent.numero label = 'Altura' value = { alturaCallePlanta } onChange = { e => setAlturaCallePlanta ( e.target.value ) } />
                <MyComponent.botonAcept texto = 'Update planta'  onClick = { e=> updatePlanta (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 8 } >
                ¿Esta seguro de eliminar la planta { nombrePlanta }
                <MyComponent.botonDelete texto = 'Delete planta'  onClick = { e=> deletePlanta (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( Planta )