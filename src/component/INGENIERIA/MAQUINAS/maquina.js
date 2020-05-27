import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const Maquina = ( props ) => {
    const [vecTiposMaquina , setVecTiposMaquina] = useState ( [  ] )
    const [vecPlantas , setVecPlantas] = useState ( [  ] )
    const [nombreMaquina , setNombreMaquina] = useState ( '' )
    const [descripcionMaquina , setDescripcionMaquina] = useState ( '' )
    const [idTipoMaquina , setIdTipoMaquina] = useState ( '' )
    const [nombreTipoMaquina , setNombreTipoMaquina] = useState ( '' )
    const [idPlanta , setIdPlanta] = useState ( '' )
    const [nombrePlanta , setNombrePlanta] = useState ( '' )
    const [idMaquina , setIdMaquina] = useState ( '' )

    useEffect ( (  ) => {
        if ( props.maquina ) {
            setIdMaquina ( props.maquina.idMaquina )
            setNombreMaquina ( props.maquina.nombreMaquina )
            setDescripcionMaquina ( props.maquina.descripcionMaquina )
            setIdTipoMaquina ( props.maquina.idTipoMaquina )
            setNombreTipoMaquina ( props.maquina.nombreTipoMaquina)
            setIdPlanta ( props.maquina.idPlanta )
            setNombrePlanta ( props.maquina.nombrePlanta )
            setVecTiposMaquina ( props.vecTiposMaquina )
            setVecPlantas ( props.vecPlantas )
        }
    } , [ props ] )
    const updateMaquina = (  ) => {
        if ( nombreMaquina === ''  || descripcionMaquina === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete todos los campos' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updateMaq = async (  ) => {
                const result = await Servicios.updateMaquina ( idMaquina , nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta )
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
                        props.actualizaListaMaquinas (  )
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
            updateMaq (  )
        }
    }
    const deleteMaquina = (  ) => {
        const deleteMaq= async (  ) => {
            const result = await Servicios.deleteMaquina ( parseInt ( idMaquina ) )
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
                    props.actualizaListaMaquinas (  )
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
        deleteMaq (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idMaquina}</td>
            <td>{nombreMaquina}</td>
            <td>{descripcionMaquina}</td>
            <td>{nombreTipoMaquina}</td>
            <td>{nombrePlanta}</td>
            <td><MyComponent.botonUpdate texto = 'Update maquina'  onClick = { e => props.cambiaModo ( 'update' , props.maquina ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete maquina' onClick = { e => props.cambiaModo ( 'delete' , props.maquina ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 7 } >
            <MyComponent.texto id = {`nombre${idMaquina}`} label = 'Nombre' value = { nombreMaquina } onChange = { e => setNombreMaquina ( e.target.value ) } />
                <MyComponent.texto id = {`descripcion${idMaquina}`} label = 'Descripcion' value = { descripcionMaquina } onChange = { e => setDescripcionMaquina ( e.target.value ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdTipoMaquina ( e.target.value ) } value = { idTipoMaquina }  array = { vecTiposMaquina } member = { { valueMember : 'idTipoMaquina' , displayMember : 'nombreTipoMaquina' } } label = 'Tipo' />
                <MyComponent.listaDesplegable onChange = { e => setIdPlanta ( e.target.value ) } value = { idPlanta }  array = { vecPlantas } member = { { valueMember : 'idPlanta' , displayMember : 'nombrePlanta' } } label = 'Planta' />
                <MyComponent.botonAcept id = {`btn_update${idMaquina}`} texto = 'Update Maquina'  onClick = { e=> updateMaquina (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 5 } >
                ¿Esta seguro de eliminar el molde { nombreMaquina }
                <MyComponent.botonDelete texto = 'Delete molde'  onClick = { e=> deleteMaquina (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( Maquina )