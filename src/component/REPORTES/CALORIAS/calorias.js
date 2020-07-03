import React , {useState , useEffect} from 'react'
import { Table } from 'react-bootstrap'
import './styleCalorias.css'
import Servicios from '../serviceReportes'
import MyComponent from  '../../AAprimary/misComponentes'
import Fechas from '../../AAprimary/fechas'
import Loading from '@material-ui/core/CircularProgress'
import Trabajador from './trabajador'
import Nofound from '../../../Imagenes/noFound.png'

const Calorias = ( props ) => {
    const [vecCalorias, setvecCalorias] = useState( [] )
    const [fechaProduccionDesde, setfechaProduccionDesde] = useState(Fechas.DD_MM_YYYY_a_DataTimePicker('01/01/2019'))
    const [fechaProduccionHasta, setfechaProduccionHasta] = useState(new Date () )
    const [detalle, setdetalle] = useState(undefined)
    const [loading, setloading] = useState(true)
    const [loadingDetalle, setloadingDetalle] = useState(false)
    const abortController = new AbortController ()
    useEffect(() => {
        setloading(true)
        Servicios.listaCalorias (fechaProduccionDesde , fechaProduccionHasta , abortController , vec => {
            setloading(false)
            setvecCalorias(vec)
        })
        return () => abortController.abort()
    }, [props])
    useEffect(() => {
        setloading(true)
        Servicios.listaCalorias (fechaProduccionDesde , fechaProduccionHasta , abortController , vec => {
            setloading(false)
            setvecCalorias(vec)
        })
        return () => abortController.abort()
    }, [fechaProduccionDesde , fechaProduccionHasta])
    const onClickTrabajador = t => {
        setloadingDetalle(true)
        Servicios.listaDetalleCalorias(fechaProduccionDesde , fechaProduccionHasta , t.idTrabajador , abortController , vec => {
            setloadingDetalle(false)
            setdetalle(
                {
                    trabajador : t ,
                    vecDetalle : vec
                }
            )
        })
    }
    return(
        <div className='container-calorias'>
            <h4>Calorias</h4>
            <div className ='container-filtros'>
                <MyComponent.fecha
                    id = 'dtp_fechaDesdeCalorias'
                    label = 'fecha desde'
                    value = {fechaProduccionDesde}
                    onChange = { e => setfechaProduccionDesde ( e ) }
                />
                <MyComponent.fecha
                    id = 'dtp_fechaHastaCalorias'
                    label = 'fecha hasta'
                    value = {fechaProduccionHasta}
                    onChange = { e => setfechaProduccionHasta ( e ) }
                />
            </div>
            <div className='container-tabla'>
                <Table responsive className='tabla'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Calorias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan = {3} ><Loading/></td>
                            </tr>
                            :
                            Array.isArray(vecCalorias) && vecCalorias.length> 0 ?
                            vecCalorias.map ( ( t , i ) => {
                                return (<tr key = {i} onClick = { e => onClickTrabajador (t) } className = 'tdCalorias'>
                                    <td>{t.apellidoTrabajador}</td>
                                    <td>{t.nombreTrabajador}</td>
                                    <td>{t.calorias}</td>
                                </tr>)
                            } )
                            :
                            <tr>
                                <td colSpan={3} className='container-img'><img  src={Nofound} /></td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
        {
            loadingDetalle?
            <div id='container-loading'  className ='container-detalle'>
                <Loading/>
            </div>
            :
            detalle ?
                <Trabajador
                    detalle = {detalle}
                />
                :
                <div className ='container-detalle'>
                    <img  src={Nofound} />
                </div>
        }
    </div>)
}

export default Calorias