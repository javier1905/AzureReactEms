import React, { useState, useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Moment from 'moment'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
//import Fechas from '../../AAprimary/fechas'

const PiezaxHora = ( props ) => {
    const [idPiezasXhs , setIdPiezasXhs] = useState ( '' )
    const [cantidadPiezasXhs , setCantidadPiezasXhs] = useState ( '' )
    const [desdePiezasXhs , setDesdePiezasXhs] = useState ( null )
    const [hastaPiezasXhs , setHastaPiezasXhs] = useState ( null )
    const [idProceso , setIdProceso] = useState ( '' )
    const [index , setIndex] = useState ( '' )
    useEffect ( (  ) => {
        setIdPiezasXhs ( props.piezaXhora.idPiezasXhs )
        setCantidadPiezasXhs ( props.piezaXhora.cantidadPiezasXhs )
        setDesdePiezasXhs ( props.piezaXhora.desdePiezasXhs )
        setHastaPiezasXhs ( props.piezaXhora.hastaPiezasXhs )
        setIdProceso (props.piezaXhora.idProceso )
        setIndex ( props.index )
    } , [ props ] )
    const validacion = (  ) => {

        var Alert = $( '#myAlert2' )
        if ( props.fechaDesdeAnteriror !== undefined &&  new Moment ( props.fechaDesdeAnteriror ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) >=   new Moment ( desdePiezasXhs ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) ) {
            setTimeout ( (  ) => {
                Alert.slideToggle (  )
            } , 3000 )
            Alert.html ( ` Verifique que la fecha desde sea superior a ${new Moment ( props.fechaDesdeAnteriror ).format ( 'DD-MM-YYYY' )}` )
            Alert.slideToggle (  )
        }
        else if ( props.fechaHastaPosterior !== undefined &&  new Moment ( props.fechaHastaPosterior ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) <=   new Moment ( hastaPiezasXhs ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) ) {
            setTimeout ( (  ) => {
                Alert.slideToggle (  )
            } , 3000 )
            Alert.html ( ` Verifique que la fecha hasta sea sea inferior a ${new Moment ( props.fechaHastaPosterior ).format ( 'DD-MM-YYYY' )}` )
            Alert.slideToggle (  )
        }
        else if ( new Moment ( desdePiezasXhs ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) >   new Moment ( hastaPiezasXhs ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) ) {
            setTimeout ( (  ) => {
                Alert.slideToggle (  )
            } , 3000 )
            Alert.html ( ` Verifique que la fecha hasta sea mayor o igual a la fecha desde` )
            Alert.slideToggle (  )
        }
        else {
            props.MethodVecPiezaXhoras ( { idPiezasXhs , cantidadPiezasXhs , desdePiezasXhs , hastaPiezasXhs , idProceso } , index  ) ; props.actualizaModo ( 'normal' , undefined )
        }
    }
    return (
        props.modo === 'normal'  ?
        <tr>
            <td>{cantidadPiezasXhs}</td>
            <td>{new Moment ( desdePiezasXhs ).utc().hour(0).format ( 'DD/MM/YYYY' )}</td>
            <td>{new Moment ( hastaPiezasXhs ).utc().hour(0).format ( 'DD/MM/YYYY' )}</td>
            {/* <td>{String(desdePiezasXhs).length === 24 ? Fechas.SQL_a_DD_MM_YYYY(desdePiezasXhs) : desdePiezasXhs }</td>
            <td>{String(hastaPiezasXhs).length === 24 ? Fechas.SQL_a_DD_MM_YYYY(hastaPiezasXhs):hastaPiezasXhs}</td> */}
            <td><MyComponent.botonUpdate texto = 'Editar pieza x hora'  onClick = { e => props.actualizaModo ( 'update' , props.piezaXhora ) } /></td>
            <td><MyComponent.botonDelete texto = 'Eliminar pieza x hora'  onClick = { e => props.actualizaModo ( 'delete' , props.piezaXhora ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 5 } >
                <MyComponent.numero value ={ parseInt ( cantidadPiezasXhs ) } onChange = { e => setCantidadPiezasXhs ( parseInt ( e.target.value ) ) }  label = 'Cantidad'/>
                <MyComponent.fecha value ={ new Moment(desdePiezasXhs).utc().hour(3) } onChange = { e => setDesdePiezasXhs ( e) } label = 'Desde' />
                <MyComponent.fecha value ={ new Moment(hastaPiezasXhs).utc().hour(3) } onChange = { e => setHastaPiezasXhs ( e ) } label = 'Hasta' />
                <MyComponent.botonAcept texto = 'Update time' onClick = { e => { validacion (  ) } } />
                <MyComponent.botonCancel texto = 'Cancel update ' onClick = { e => props.actualizaModo ( 'normal' , undefined ) }/>
                <Alert variant = 'danger' style = { { display : 'none' , marginTop : 20 } } id ='myAlert2' />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 5 } >
                ¿Esta seguro de eliminar ese Tiempo ?
                <MyComponent.botonAcept texto = 'Eliminar Tiempo' onClick = { e => { props.MethodDeletePiezaXhora ( idPiezasXhs , index ) ; props.actualizaModo ( 'normal' , undefined ) } } />
                <MyComponent.botonCancel texto = 'Cancelar eliminacion '  onClick = { e => props.actualizaModo ( 'normal' , undefined ) }/>
            </td>
        </tr>
    )
}

export default PiezaxHora