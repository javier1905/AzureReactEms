import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'
import Servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'

const FormAltaDefecto = ( props ) => {
    const [vecOperaciones , setVecOperaciones] = useState ( [  ] )
    const [nombreDefecto , setNombreDefecto] = useState ( '' )
    const [idOperacion , setIdOperacion] = useState ( '' )

    useEffect ( (  ) => {
        setVecOperaciones ( props.vecOperaciones )
    } , [ props.vecOperaciones ] )
    useEffect( () => {
        setNombreDefecto('')
        setIdOperacion('')
    } , [props.limpiaCampos])

    const miSubmit = e => {
        if ( nombreDefecto === '' || idOperacion === '' ) {
            var myAlert2 = $( '#myAlert2' )
            myAlert2.html ( `Complete todos los campos` )
            setTimeout ( (  ) => {
                myAlert2.slideUp (  )
            } , 3000 )
            myAlert2.slideDown (  )
        }
        else {
            const insertDefecto = async (  ) => {
                const result = await Servicios.insertDefecto ( nombreDefecto , parseInt ( idOperacion ) )
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
                        props.actualizaListaDefectos (  )
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
            insertDefecto (  )
        }
        e.preventDefault (  )
    }
    return (
        <div>
            <Form onSubmit = { miSubmit } >
                <MyComponent.texto label = 'Nombre' value = { nombreDefecto } onChange = { e => setNombreDefecto ( e.target.value ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdOperacion ( e.target.value ) } value = { idOperacion }  array = { vecOperaciones } member = { { valueMember : 'idOperacion' , displayMember : 'nombreOperacion' } } label = 'Operacion' />
                <MyComponent.botonSave/>
                <Alert id = 'myAlert2' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </Form>
        </div>
    )
}
export default  withSnackbar ( FormAltaDefecto )