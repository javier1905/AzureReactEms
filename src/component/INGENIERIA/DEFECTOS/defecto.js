import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const Defecto = ( props ) => {
    const [idDefecto , setIdDefecto] = useState ( '' )
    const [nombreDefecto , setNombreDefecto] = useState ( '' )
    const [idOperacion , setIdOperacion] = useState ( '' )
    const [nombreOperacion , setNombreOperacion] = useState ( '' )
    const [vecOperaciones , setVecOperaciones] = useState ( [  ] )

    useEffect ( (  ) => {
        if ( props.defecto ) {
            setIdDefecto ( props.defecto.idDefecto )
            setNombreDefecto ( props.defecto.nombreDefecto )
            setIdOperacion ( props.defecto.idOperacion )
            setNombreOperacion ( props.defecto.nombreOperacion )
            setVecOperaciones ( props.vecOperaciones )
        }
    } , [ props ] )
    const updateDefecto = (  ) => {
        if ( nombreDefecto === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete el campo nombre' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updateDefec = async (  ) => {
                const result = await Servicios.updateDefecto ( parseInt ( idDefecto ) , nombreDefecto , parseInt ( idOperacion ) )
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
                        props.actualizaListaDefectos (  )
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
            updateDefec (  )
        }
    }
    const deleteDefecto = (  ) => {
        const deleteDefec = async (  ) => {
            const result = await Servicios.deleteDefecto ( parseInt ( idDefecto ) )
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
                    props.actualizaListaDefectos (  )
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
        deleteDefec (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idDefecto}</td>
            <td>{nombreDefecto}</td>
            <td>{nombreOperacion}</td>
            <td><MyComponent.botonUpdate texto = 'Update defect'  onClick = { e => props.cambiaModo ( 'update' , props.defecto ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete defect' onClick = { e => props.cambiaModo ( 'delete' , props.defecto ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 5 } >
                <MyComponent.texto label = 'Nombre' value = { nombreDefecto } onChange = { e => setNombreDefecto ( e.target.value ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdOperacion ( e.target.value ) } value = { idOperacion }  array = { vecOperaciones } member = { { valueMember : 'idOperacion' , displayMember : 'nombreOperacion' } } label = 'Operacion' />
                <MyComponent.botonAcept texto = 'Update defecto'  onClick = { e=> updateDefecto (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 5 } >
                ¿Esta seguro de eliminar el defecto { nombreDefecto }
                <MyComponent.botonDelete texto = 'Delete defecto'  onClick = { e=> deleteDefecto (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( Defecto )