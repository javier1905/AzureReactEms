import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import Moment from 'moment'

const Trabajador = ( props ) => {
    const [vecPuestos , setVecPuestos] = useState ( [  ] )
    const [nombreTrabajador , setNombreTrabajador] = useState ( '' )
    const [apellidoTrabajador , setApellidoTrabajador] = useState ( '' )
    const [nacimientoTrabajador , setNacimientoTrabajador] = useState ( null )
    const [ingresoTrabajador , setIngresoTrabajador] = useState ( null )
    const [idPuesto , setIdPuesto] = useState ( '' )
    const [nombrePuesto , setNombrePuesto] = useState ( '' )
    const [idTrabajador , setIdTrabajador] = useState ( '' )

    useEffect ( (  ) => {
        if ( props.trabajador ) {
            setIdTrabajador ( props.trabajador.idTrabajador )
            setNombreTrabajador ( props.trabajador.nombreTrabajador )
            setApellidoTrabajador ( props.trabajador.apellidoTrabajador )
            setNacimientoTrabajador ( props.trabajador.nacimientoTrabajador )
            setIngresoTrabajador ( props.trabajador.ingresoTrabajador)
            setIdPuesto ( props.trabajador.idPuesto )
            setNombrePuesto ( props.trabajador.nombrePuesto )
            setVecPuestos ( props.vecPuestos )
        }
    } , [ props ] )
    const updateTrabajador = (  ) => {
        if ( nombreTrabajador === ''  || apellidoTrabajador === '' || nacimientoTrabajador === null || ingresoTrabajador === null  ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete todos los campos' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updateTra = async (  ) => {
                const result = await Servicios.updateTrabajador ( idTrabajador , nombreTrabajador , apellidoTrabajador , nacimientoTrabajador , ingresoTrabajador , idPuesto )
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
                        props.actualizaListaTrabajadores (  )
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
            updateTra (  )
        }
    }
    const deleteTrabajador = (  ) => {
        const deleteTra= async (  ) => {
            const result = await Servicios.deleteTrabajador ( parseInt ( idTrabajador ) )
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
                    props.actualizaListaTrabajadores (  )
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
        deleteTra (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idTrabajador}</td>
            <td>{nombreTrabajador}</td>
            <td>{apellidoTrabajador}</td>
            <td>{ new Moment (nacimientoTrabajador).format ( 'DD/MM/YYYY' ) }</td>
            <td>{ new Moment (ingresoTrabajador).format ( 'DD/MM/YYYY' ) }</td>
            <td>{nombrePuesto}</td>
            <td><MyComponent.botonUpdate texto = 'Update trabajador'  onClick = { e => props.cambiaModo ( 'update' , props.trabajador ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete trabajador' onClick = { e => props.cambiaModo ( 'delete' , props.trabajador ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 8 } >
                <MyComponent.texto id = {`nombre${idTrabajador}`} label = 'Nombre' value = { nombreTrabajador } onChange = { e => setNombreTrabajador ( e.target.value ) } />
                <MyComponent.texto id = {`apellido${idTrabajador}`} label = 'Apellido' value = { apellidoTrabajador } onChange = { e => setApellidoTrabajador ( e.target.value ) } />
                <MyComponent.fecha id = {`nacimiento${idTrabajador}`} label = 'Nacimiento' value = { nacimientoTrabajador } onChange = { e => setNacimientoTrabajador ( e ) } />
                <MyComponent.fecha id = {`ingreso${idTrabajador}`}  label = 'Ingreso' value = { ingresoTrabajador } onChange = { e => setIngresoTrabajador ( e ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdPuesto ( e.target.value ) } value = { idPuesto }  array = { vecPuestos } member = { { valueMember : 'idPuesto' , displayMember : 'nombrePuesto' } } label = 'Puesto' />
                <MyComponent.botonAcept id = {`btn_update${idTrabajador}`} texto = 'Update Trabajador'  onClick = { e=> updateTrabajador (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 8 } >
                ¿Esta seguro de eliminar el trabajador { nombreTrabajador }
                <MyComponent.botonDelete texto = 'Delete trabajador'  onClick = { e=> deleteTrabajador (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( Trabajador )