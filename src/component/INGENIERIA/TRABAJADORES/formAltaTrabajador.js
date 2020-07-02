import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'
import Servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'
import Fechas from '../../AAprimary/fechas'

const FormAltaTrabajador = ( props ) => {
    const [vecPuestos , setVecPuestos] = useState ( [  ] )
    const [nombreTrabajador , setNombreTrabajador] = useState ( '' )
    const [apellidoTrabajador , setApellidoTrabajador] = useState ( '' )
    const [nacimientoTrabajador , setNacimientoTrabajador] = useState ( null )
    const [ingresoTrabajador , setIngresoTrabajador] = useState ( null )
    const [idPuesto , setIdPuesto] = useState ( '' )

    useEffect ( (  ) => {
        setVecPuestos ( props.vecPuestos )
    } , [ props.vecPuestos ] )
    useEffect ( ()=> {
        setNombreTrabajador('')
        setApellidoTrabajador('')
        setNacimientoTrabajador(null)
        setIngresoTrabajador(null)
        setIdPuesto('')
    } , [props.limpiaCampos])
    const miSubmit = e => {
        if ( nombreTrabajador === ''  || apellidoTrabajador === '' || nacimientoTrabajador === null || ingresoTrabajador === null || idPuesto === '' ) {
            var myAlert2 = $( '#myAlert2' )
            myAlert2.html ( `Complete todos los campos` )
            setTimeout ( (  ) => {
                myAlert2.slideUp (  )
            } , 3000 )
            myAlert2.slideDown (  )
        }
        else {
            const insertTrabajador = async (  ) => {
                const result = await Servicios.insertTrabajador ( nombreTrabajador , apellidoTrabajador ,  nacimientoTrabajador  , ingresoTrabajador  , idPuesto )
                if (  result ) {
                    if ( result.status === 200 ) {
                        props.enqueueSnackbar ( result.mensaje,
                        {
                            variant: 'success',
                            preventDuplicate: true,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            }
                        })
                        props.actualizaListaTrabajadores (  )
                        props.methodAdd (  )
                    }
                    else {
                        props.enqueueSnackbar ( result.mensaje,
                        {
                            variant: 'error',
                            preventDuplicate: true,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            }
                        } )
                    }
                }
            }
            insertTrabajador (  )
        }
        e.preventDefault (  )
    }
    return (
        <div>
            <Form onSubmit = { miSubmit } >
                <MyComponent.texto id = 'nombre' label = 'Nombre' value = { nombreTrabajador } onChange = { e => setNombreTrabajador ( e.target.value ) } />
                <MyComponent.texto id = 'apellido' label = 'Apellido' value = { apellidoTrabajador } onChange = { e => setApellidoTrabajador ( e.target.value ) } />
                <MyComponent.fecha id = 'nacimiento' label = 'Nacimiento' value = { nacimientoTrabajador } onChange = { e => setNacimientoTrabajador ( Fechas.DataTimePicker_a_SQL( e ) ) } />
                <MyComponent.fecha id = 'ingreso'  label = 'Ingreso' value = { ingresoTrabajador } onChange = { e => setIngresoTrabajador ( Fechas.DataTimePicker_a_SQL( e ) ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdPuesto ( e.target.value ) } value = { idPuesto }  array = { vecPuestos } member = { { valueMember : 'idPuesto' , displayMember : 'nombrePuesto' } } label = 'Puesto' />
                <MyComponent.botonSave/>
                <Alert id = 'myAlert2' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </Form>
        </div>
    )
}
export default  withSnackbar ( FormAltaTrabajador )