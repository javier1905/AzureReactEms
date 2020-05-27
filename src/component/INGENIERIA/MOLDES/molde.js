import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const Molde = ( props ) => {
    const [idMolde , setIdMolde] = useState ( '' )
    const [nombreMolde , setNombreMolde] = useState ( '' )
    const [idPieza , setIdPieza] = useState ( '' )
    const [nombrePieza , setNombrePieza] = useState ( '' )
    const [vecPiezas , setVecPiezas] = useState ( [  ] )

    useEffect ( (  ) => {
        if ( props.molde ) {
            setIdMolde ( props.molde.idMolde )
            setNombreMolde ( props.molde.nombreMolde )
            setIdPieza ( props.molde.idPieza )
            setNombrePieza ( props.molde.nombrePieza )
            setVecPiezas ( props.vecPiezas )
        }
    } , [ props ] )
    const updateMolde = (  ) => {
        if ( nombreMolde === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete el campo nombre' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updateMol = async (  ) => {
                const result = await Servicios.updateMolde ( parseInt ( idMolde ) , nombreMolde , parseInt ( idPieza ) )
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
                        props.actualizaListaMoldes (  )
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
            updateMol (  )
        }
    }
    const deleteMolde = (  ) => {
        const deleteMol = async (  ) => {
            const result = await Servicios.deleteMolde ( parseInt ( idMolde ) )
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
                    props.actualizaListaMoldes (  )
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
        deleteMol (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idMolde}</td>
            <td>{nombreMolde}</td>
            <td>{nombrePieza}</td>
            <td><MyComponent.botonUpdate texto = 'Update defect'  onClick = { e => props.cambiaModo ( 'update' , props.molde ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete defect' onClick = { e => props.cambiaModo ( 'delete' , props.molde ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 5 } >
                <MyComponent.texto label = 'Nombre' value = { nombreMolde } onChange = { e => setNombreMolde ( e.target.value ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdPieza ( e.target.value ) } value = { idPieza }  array = { vecPiezas } member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza' } } label = 'Pieza' />
                <MyComponent.botonAcept texto = 'Update molde'  onClick = { e=> updateMolde (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 5 } >
                ¿Esta seguro de eliminar el molde { nombreMolde }
                <MyComponent.botonDelete texto = 'Delete molde'  onClick = { e=> deleteMolde (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( Molde )