import React , { useState, useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Moment from 'moment'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'

const FormAltaPiezaXhora = ( props ) => {
    const [idPiezasXhs , setIdPiezasXhs ] = useState ( '' )
    const [cantidadPiezasXhs , setCantidadPiezasXhs] = useState ( '' )
    const [desdePiezasXhs , setDesdePiezasXhs ] = useState ( null )
    const [idProceso , setIdProceso ] = useState ( null )
    const [hastaPiezasXhs , setHastaPiezasXhs ] = useState ( null )

    useEffect ( (  ) => {
        if ( props.piezaXhora ) {
            setHastaPiezasXhs ( new Moment ( props.piezaXhora.hastaPiezasXhs ).add ( 20 , 'y' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) )
            setIdPiezasXhs ( parseInt ( props.piezaXhora.idPiezasXhs ) )
            setIdProceso ( parseInt ( props.piezaXhora.idProceso ) )
            setDesdePiezasXhs ( props.piezaXhora.hastaPiezasXhs ?  new Moment ( props.piezaXhora.hastaPiezasXhs ).add ( 1 , 'd' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) : null  )
        }
        else{
            setDesdePiezasXhs ( null )
        }
    } , [ props ] )
    useEffect ( () => {
        setCantidadPiezasXhs('')
    } , [ props.limpiaCampos])
    const validaciones = (  ) => {
        var Alert = $( '#myAlert' )
        if ( !props.piezaXhora ) {
            if ( cantidadPiezasXhs === ''|| desdePiezasXhs === null || desdePiezasXhs === undefined ) {
                setTimeout ( (  ) => {
                    Alert.slideToggle (  )
                } , 3000 )
                Alert.html ( ` Complete con la ${cantidadPiezasXhs === '' ? 'cantidad' : ''} ${desdePiezasXhs === null ? 'Fecha desde' : ''} ` )
                Alert.slideToggle (  )
            }
            else {
                props.MethodInsertPiezaXhora ( { idPiezasXhs , cantidadPiezasXhs , desdePiezasXhs , hastaPiezasXhs , idProceso } )
                props.showFormAltaPiezaXhora (  )
            }
        }
        else {
            if ( cantidadPiezasXhs === ''|| desdePiezasXhs === null || desdePiezasXhs === undefined ||        new Moment ( props.piezaXhora.desdePiezasXhs ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) >=   new Moment ( desdePiezasXhs ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) ) {
                setTimeout ( (  ) => {
                    Alert.slideToggle (  )
                } , 3000 )
                Alert.html ( ` Complete con la ${cantidadPiezasXhs === '' ? 'cantidad' : ''} ${desdePiezasXhs === null ? 'Fecha desde' : ''} ` )
                Alert.slideToggle (  )
            }
            else {
                props.MethodInsertPiezaXhora ( { idPiezasXhs , cantidadPiezasXhs , desdePiezasXhs , hastaPiezasXhs , idProceso } )
                props.showFormAltaPiezaXhora (  )
            }
        }
    }
    return (
        <div>
            <MyComponent.numero value ={ parseInt ( cantidadPiezasXhs ) } onChange = { e => setCantidadPiezasXhs ( parseInt ( e.target.value ) ) }  label = 'Cantidad'/>
            <MyComponent.fecha  value ={ desdePiezasXhs ? desdePiezasXhs : null  } onChange = { e => { setDesdePiezasXhs ( e ) ; setHastaPiezasXhs ( new Moment ( e ).add ( 20 , 'y' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) )} } label = 'Desde' />
            <MyComponent.fecha disabled = { true } value ={ hastaPiezasXhs }  label = 'Hasta' />
            <MyComponent.botonAcept onClick = { e => validaciones (  ) } />
            <Alert variant = 'danger' style = { { display : 'none' , marginTop : 20 } } id ='myAlert' />
        </div>
    )
}

export default FormAltaPiezaXhora