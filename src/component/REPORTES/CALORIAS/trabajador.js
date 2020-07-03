import React from 'react'
import {Table} from 'react-bootstrap'
import Fechas from '../../AAprimary/fechas'
import Moment from 'moment'

const Trabajador = ({detalle} )=> {

    return (<div className = 'contanier-trabajador'>
        <h6>{`${detalle.trabajador.nombreTrabajador} ${detalle.trabajador.apellidoTrabajador}`}</h6>
        <Table responsive className='tabla'>
            <thead>
                <tr>
                    <td>Fecha</td>
                    <td>Hora Inicio</td>
                    <td>Hora Fin</td>
                    <td>Calorias</td>
                </tr>
            </thead>
            <tbody>
                {
                    detalle.vecDetalle.map( (e , i ) => {
                        return (
                            <tr key = {i}>
                                <td>{Fechas.SQL_a_DD_MM_YYYY(e.fechaProduccion)}</td>
                                <td>{new Moment (e.horaInicio).utc().format('HH:mm')}</td>
                                <td>{new Moment (e.horaFin).utc().format('HH:mm')}</td>
                                <td>{e.calorias}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </div>)
}

export default Trabajador