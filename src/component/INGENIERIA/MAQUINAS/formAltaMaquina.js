import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'
import Servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'

const FormAltaMaquina = ( props ) => {
    const [vecTiposMaquina , setVecTiposMaquina] = useState ( [  ] )
    const [vecPlantas , setVecPlantas] = useState ( [  ] )
    const [nombreMaquina , setNombreMaquina] = useState ( '' )
    const [descripcionMaquina , setDescripcionMaquina] = useState ( '' )
    const [idTipoMaquina , setIdTipoMaquina] = useState ( '' )
    const [idPlanta , setIdPlanta] = useState ( '' )

    useEffect ( (  ) => {
        setVecTiposMaquina ( props.vecTiposMaquina )
        setVecPlantas ( props.vecPlantas )
    } , [ props.vecTiposMaquina , props.vecPlantas ] )
    useEffect ( ()=> {
        setNombreMaquina('')
        setDescripcionMaquina('')
        setIdTipoMaquina('')
        setIdPlanta('')
    } , [props.limpiaCampos])
    const miSubmit = e => {
        if ( nombreMaquina === '' || descripcionMaquina === '' ) {
            var myAlert2 = $( '#myAlert2' )
            myAlert2.html ( `Complete todos los campos` )
            setTimeout ( (  ) => {
                myAlert2.slideUp (  )
            } , 3000 )
            myAlert2.slideDown (  )
        }
        else {
            const insertMaquina = async (  ) => {
                const result = await Servicios.insertMaquina ( nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta )
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
                        props.actualizaListaMaquinas (  )
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
                        })
                    }
                }
            }
            insertMaquina (  )
        }
        e.preventDefault (  )
    }
    return (
        <div>
            <Form onSubmit = { miSubmit } >
                <MyComponent.texto id = 'nombre_maquina' label = 'Nombre' value = { nombreMaquina } onChange = { e => setNombreMaquina ( e.target.value ) } />
                <MyComponent.texto id = 'descripcion maquina' label = 'Descripcion' value = { descripcionMaquina } onChange = { e => setDescripcionMaquina ( e.target.value ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdTipoMaquina ( e.target.value ) } value = { idTipoMaquina }  array = { vecTiposMaquina } member = { { valueMember : 'idTipoMaquina' , displayMember : 'nombreTipoMaquina' } } label = 'Tipo' />
                <MyComponent.listaDesplegable onChange = { e => setIdPlanta ( e.target.value ) } value = { idPlanta }  array = { vecPlantas } member = { { valueMember : 'idPlanta' , displayMember : 'nombrePlanta' } } label = 'Planta' />
                <MyComponent.botonSave/>
                <Alert id = 'myAlert2' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </Form>
        </div>
    )
}
export default  withSnackbar ( FormAltaMaquina )