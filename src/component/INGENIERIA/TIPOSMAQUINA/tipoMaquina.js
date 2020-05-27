import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const TipoMaquina = ( props ) => {
    const [idTipoMaquina , setIdTipoMaquina] = useState ( '' )
    const [nombreTipoMaquina , setNombreTipoMaquina] = useState ( '' )
    const [idOperacion , setIdOperacion] = useState ( '' )
    const [nombreOperacion , setNombreOperacion] = useState ( '' )
    const [vecOperaciones , setVecOperaciones] = useState ( [  ] )
    useEffect ( (  ) => {
        if ( props.tipoMaquina ) {
            setIdTipoMaquina ( props.tipoMaquina.idTipoMaquina )
            setNombreTipoMaquina ( props.tipoMaquina.nombreTipoMaquina )
            setIdOperacion ( props.tipoMaquina.idOperacion )
            setNombreOperacion ( props.tipoMaquina.nombreOperacion )
            setVecOperaciones ( props.vecOperaciones )
        }
    } , [ props ] )
    const updateTipoMaquina= (  ) => {
        if ( nombreTipoMaquina === '' ||  idOperacion === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete todos los campos ' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updateTipoMaq = async (  ) => {
                const result = await Servicios.updateTipoMaquina (  idTipoMaquina , nombreTipoMaquina , idOperacion )
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
                        props.actualizaListaTiposMaquina (  )
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
            updateTipoMaq (  )
        }
    }
    const deleteTipoMaquina = (  ) => {
        const deleteTiposMa = async (  ) => {
            const result = await Servicios.deleteTipoMaquina ( parseInt ( idTipoMaquina ) )
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
                    props.actualizaListaTiposMaquina (  )
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
        deleteTiposMa (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idTipoMaquina}</td>
            <td>{nombreTipoMaquina}</td>
            <td>{nombreOperacion}</td>
            <td><MyComponent.botonUpdate texto = 'Update tipo de maquina'  onClick = { e => props.cambiaModo ( 'update' , props.tipoMaquina ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete tipo de maquina' onClick = { e => props.cambiaModo ( 'delete' , props.tipoMaquina ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 5 } >
                <MyComponent.texto label = 'Nombre' value = { nombreTipoMaquina } onChange = { e => setNombreTipoMaquina ( e.target.value ) } />
                <MyComponent.listaDesplegable label = 'Operaciones' value = { idOperacion } onChange = { e => setIdOperacion ( e.target.value ) } array =  { vecOperaciones }  member = { { valueMember : 'idOperacion' , displayMember : 'nombreOperacion' } } />
                <MyComponent.botonAcept texto = 'Update tipo de maquina'  onClick = { e=> updateTipoMaquina (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 5 } >
                ¿Esta seguro de eliminar el tipo de maquina { nombreTipoMaquina }
                <MyComponent.botonDelete texto = 'Delete tipo de maquina'  onClick = { e=> deleteTipoMaquina (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( TipoMaquina )