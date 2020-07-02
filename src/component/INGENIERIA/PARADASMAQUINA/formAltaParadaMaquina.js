import React, { useState, useEffect   } from 'react'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'
import Servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'

const FormAltaParadaMaquina = ( props ) => {
    const [vecAreas , setVecAreas] = useState ( [  ] )
    const [nombreParadaMaquina , setNombreParadaMaquina] = useState ( '' )
    const [tipoParadaMaquina , setTipoParadaMaquina] = useState ( false )
    const [idArea , setIdArea] = useState ( '' )
    const [setupParadaMaquina , setSetupParadaMaquina] = useState ( '' )
    useEffect ( (  ) => {
        setVecAreas ( props.vecAreas )
    } , [ props.vecAreas ] )
    useEffect(()=> {
        setNombreParadaMaquina('')
        setTipoParadaMaquina(false)
        setIdArea('')
        setSetupParadaMaquina('')
    },[props.limpiaCampos])

    const miSubmit = e => {
        if ( nombreParadaMaquina === '' || idArea === '' ) {
            var myAlert2 = $( '#myAlert2' )
            myAlert2.html ( `Complete todos los campos` )
            setTimeout ( (  ) => {
                myAlert2.slideUp (  )
            } , 3000 )
            myAlert2.slideDown (  )
        }
        else {
            const insertParadaMaquinia = async (  ) => {
                const result = await Servicios.insertParadaMaquina ( nombreParadaMaquina , tipoParadaMaquina , parseInt ( idArea ) , setupParadaMaquina === '' || setupParadaMaquina === 0 ? null : parseInt ( setupParadaMaquina ) )
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
                        props.actualizaListaParadasMaquina (  )
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
            insertParadaMaquinia (  )
        }
        e.preventDefault (  )
    }
    const onChangeTipo = e =>{
        const txt_setUp = $('#txt_setUp')
        setTipoParadaMaquina ( e.target.checked )
        if(e.target.checked) {
            setSetupParadaMaquina('')
            txt_setUp.prop('disabled' , true)
        }
        else {
            txt_setUp.prop('disabled' , false )
        }

    }
    return (
        <div>
            <Form onSubmit = { miSubmit } >
                <MyComponent.texto width = {500 } label = 'Nombre' value = { nombreParadaMaquina } onChange = { e => setNombreParadaMaquina ( e.target.value ) } />
                <MyComponent.boolean label = 'No programada' checked = { tipoParadaMaquina } onChange = { e => onChangeTipo(e) } />
                <MyComponent.listaDesplegable onChange = { e => setIdArea ( e.target.value ) } value = { idArea }  array = { vecAreas } member = { { valueMember : 'idArea' , displayMember : 'nombreArea' } } label = 'Area' />
                <MyComponent.numero id='txt_setUp' label = 'setUp' value = { setupParadaMaquina } onChange = { e => setSetupParadaMaquina ( e.target.value ) } />
                <MyComponent.botonSave/>
                <Alert id = 'myAlert2' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </Form>
        </div>
    )
}
export default  withSnackbar ( FormAltaParadaMaquina )