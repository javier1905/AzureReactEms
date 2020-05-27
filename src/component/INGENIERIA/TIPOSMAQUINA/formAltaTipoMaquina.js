import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'
import Servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'

const FormAltaTipoMaquina = ( props ) => {
    const [nombreTipoMaquina , setNombreTipoMaquina] = useState ( '' )
    const [idOperacion , setIdOperacion] = useState ( '' )
    const [vecOperaciones , setVecOperaciones] = useState ( [  ] )
    useEffect ( (  ) => {
        setVecOperaciones ( props.vecOperaciones )
    }  , [ props ] )
    const miSubmit = e => {
        if ( nombreTipoMaquina === '' ||  idOperacion === ''   ) {
            var myAlert2 = $( '#myAlert2' )
            myAlert2.html ( `Complete todos los campos` )
            setTimeout ( (  ) => {
                myAlert2.slideUp (  )
            } , 3000 )
            myAlert2.slideDown (  )
        }
        else {
            const insertTipoMaq = async (  ) => {
                const result = await Servicios.insertTipoMaquina ( nombreTipoMaquina  , idOperacion )
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
                        props.actualizaListaTiposMaquina (  )
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
            insertTipoMaq (  )
        }
        e.preventDefault (  )
    }
    return (
        <div>
            <Form onSubmit = { miSubmit } >
                <MyComponent.texto label = 'Nombre' value = { nombreTipoMaquina } onChange = { e => setNombreTipoMaquina ( e.target.value ) } />
                <MyComponent.listaDesplegable label = 'Operaciones'  value = { idOperacion } onChange = { e => setIdOperacion ( e.target.value ) } array =  { vecOperaciones }  member = { { valueMember : 'idOperacion' , displayMember : 'nombreOperacion' } } />
                <MyComponent.botonSave/>
                <Alert id = 'myAlert2' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </Form>
        </div>
    )
}
export default  withSnackbar ( FormAltaTipoMaquina )