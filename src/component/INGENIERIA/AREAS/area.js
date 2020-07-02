import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const Area = ( props ) => {
    const [idArea , setIdArea] = useState ( '' )
    const [nombreArea , setNombreArea] = useState ( '' )
    useEffect ( (  ) => {
        if ( props.area ) {
            setIdArea ( props.area.idArea )
            setNombreArea ( props.area.nombreArea )
        }
    } , [ props ] )
    const updateArea = (  ) => {
        if ( nombreArea === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete el campo nombre' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updateAre = async (  ) => {
                const result = await Servicios.updateArea ( idArea , nombreArea )
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
                        props.actualizaListaAreas (  )
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
            updateAre (  )
        }
    }
    const deleteArea= (  ) => {
        const deleteAre = async (  ) => {
            const result = await Servicios.deleteArea ( parseInt ( idArea ) )
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
                    props.actualizaListaAreas (  )
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
        deleteAre (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idArea}</td>
            <td>{nombreArea}</td>
            <td><MyComponent.botonUpdate texto = 'Update Area'  onClick = { e => props.cambiaModo ( 'update' , props.area ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete Area' onClick = { e => props.cambiaModo ( 'delete' , props.area ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 4 } >
                <MyComponent.texto width = {300}  label = 'Nombre' value = { nombreArea } onChange = { e => setNombreArea ( e.target.value ) } />
                <MyComponent.botonAcept texto = 'Update area'  onClick = { e=> updateArea (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 4 } >
                ¿Esta seguro de eliminar la area { nombreArea }
                <MyComponent.botonDelete texto = 'Delete area'  onClick = { e=> deleteArea (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( Area )