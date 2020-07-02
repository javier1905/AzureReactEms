import React, { useState , useEffect } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'
import Servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'

const FormAltaPlanta = ( props ) => {
    const [nombrePlanta , setNombrePlanta] = useState ( '' )
    const [barrioPlanta , setBarrioPlanta] = useState ( '' )
    const [codigoPostalPlanta , setCodigoPostalPlanta] = useState ( '' )
    const [callePlanta , setCallePlanta] = useState ( '' )
    const [alturaCallePlanta , setAlturaCallePlanta] = useState ( '' )
    useEffect ( ()=> {
        setNombrePlanta('')
        setBarrioPlanta('')
        setCodigoPostalPlanta('')
        setCallePlanta('')
        setAlturaCallePlanta('')
    } , [props.limpiaCampos])
    const miSubmit = e => {
        if ( nombrePlanta === '' ||  barrioPlanta === ''  || codigoPostalPlanta === '' || callePlanta === '' || alturaCallePlanta === ''  ) {
            var myAlert2 = $( '#myAlert2' )
            myAlert2.html ( `Complete todos los campos` )
            setTimeout ( (  ) => {
                myAlert2.slideUp (  )
            } , 3000 )
            myAlert2.slideDown (  )
        }
        else {
            const insertPla = async (  ) => {
                const result = await Servicios.insertPlanta ( nombrePlanta , barrioPlanta , codigoPostalPlanta , callePlanta , alturaCallePlanta )
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
                        props.actualizaListaPlantas (  )
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
            insertPla (  )
        }
        e.preventDefault (  )
    }
    return (
        <div>
            <Form onSubmit = { miSubmit } >
            <MyComponent.texto label = 'Nombre' value = { nombrePlanta } onChange = { e => setNombrePlanta ( e.target.value ) } />
                <MyComponent.texto label = 'Barrio' value = { barrioPlanta } onChange = { e => setBarrioPlanta ( e.target.value ) } />
                <MyComponent.numero label = 'CP' value = { codigoPostalPlanta } onChange = { e => setCodigoPostalPlanta ( e.target.value ) } />
                <MyComponent.texto label = 'Calle' value = { callePlanta } onChange = { e => setCallePlanta ( e.target.value ) } />
                <MyComponent.numero label = 'Altura' value = { alturaCallePlanta } onChange = { e => setAlturaCallePlanta ( e.target.value ) } />
                <MyComponent.botonSave/>
                <Alert id = 'myAlert2' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </Form>
        </div>
    )
}
export default  withSnackbar ( FormAltaPlanta )