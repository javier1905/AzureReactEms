import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'
import Servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'

const FormAltaMolde = ( props ) => {
    const [vecPiezas , setVecPiezas] = useState ( [  ] )
    const [nombreMolde , setNombreMolde] = useState ( '' )
    const [idPieza , setIdPieza] = useState ( '' )

    useEffect ( (  ) => {
        setVecPiezas ( props.vecPiezas )
    } , [ props.vecPiezas ] )
    useEffect (() => {
        setNombreMolde('')
        setIdPieza('')
    } , [props.limpiaCampos])

    const miSubmit = e => {
        if ( nombreMolde === '' || idPieza === '' ) {
            var myAlert2 = $( '#myAlert2' )
            myAlert2.html ( `Complete todos los campos` )
            setTimeout ( (  ) => {
                myAlert2.slideUp (  )
            } , 3000 )
            myAlert2.slideDown (  )
        }
        else {
            const insertMolde = async (  ) => {
                const result = await Servicios.insertMolde ( nombreMolde , parseInt ( idPieza ) )
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
                        props.actualizaListaMoldes (  )
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
            insertMolde (  )
        }
        e.preventDefault (  )
    }
    return (
        <div>
            <Form onSubmit = { miSubmit } >
                <MyComponent.texto label = 'Nombre' value = { nombreMolde } onChange = { e => setNombreMolde ( e.target.value ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdPieza ( e.target.value ) } value = { idPieza }  array = { vecPiezas } member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza' } } label = 'Pieza' />
                <MyComponent.botonSave/>
                <Alert id = 'myAlert2' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </Form>
        </div>
    )
}
export default  withSnackbar ( FormAltaMolde )