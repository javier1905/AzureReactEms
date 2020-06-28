import React, { useEffect , useState } from 'react'
import Servicios from '../serviceReportes'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import './styleOeeMec.css'
import Loading from '@material-ui/core/CircularProgress'
import NoFound from '../../../Imagenes/noFound.png'
import Items from './items'
import Moment from 'moment'
import Typography from '@material-ui/core/Typography'
import GraficoOeeMec from './graficoOeeMec'
import Fechas from '../../AAprimary/fechas'

const OeeMecanizado = ( props ) => {
    const [idMaquina , setIdMaquina] = useState ( '' )
    const [idPieza , setIdPieza] = useState ( '' )
    const [idMolde , setIdMolde] = useState ( '' )
    const [fechaProduccionDesde , setFechaProduccionDesde] = useState ( new Moment ( new Date (  ) ).add (  -1 , 'months').format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) )
    const [fechaProduccionHasta , setFechaProduccionHasta] = useState ( new Date (  ) )
    const [vecMaquinas , setVecMaquinas] = useState ( '' )
    const [vecPiezas , setVecPiezas] = useState ( '' )
    const [vecMoldes , setVecMoldes] = useState ( '' )
    const [loading , setLoading] = useState ( true )
    const [vecDatosOee , setVecDatosOee] = useState ( [  ] )
    const [idAgrupar , setIdAgrupar] = useState( 1 )
    const abortController = new AbortController()
    useEffect ( (  ) => {
            Servicios.listaMaquinas ( abortController , vec =>{
                vec.unshift ( { idMaquina : '' , nombreMaquina : 'NONE' , idTipoMaquina : 1 } )
                setVecMaquinas ( vec.filter ( mq => mq.idTipoMaquina === 4 ) )
            } )
            Servicios.listaPiezas ( abortController , vec => {
                vec.unshift ( { idPieza : '' , nombrePieza : 'NONE' } )
                setVecPiezas ( vec ) 
            } )
            return () => abortController.abort()
    }  , [ props ]  )
    useEffect ( (  ) => {
        Servicios.listaMoldes ( idPieza , abortController , vec => {
            setIdMolde ( '' )
            setVecMoldes ( vec )
        } )
        return () => abortController.abort()
    } , [ idPieza ] )
    useEffect ( (  ) => {
        setLoading ( true )
            Servicios.listaOeeMecanizado (  idMaquina === '' ? null : idMaquina ,
            idPieza === '' ? null : idPieza ,  idMolde === '' ? null : idMolde , fechaProduccionDesde ,
            fechaProduccionHasta , idAgrupar , abortController , vec => {
                setVecDatosOee(vec)
                setLoading(false)
            }  )
        return () => abortController.abort()
    }  , [ fechaProduccionDesde , fechaProduccionHasta , idMaquina , idPieza ,  idMolde , idAgrupar ]  )

    const vecAgrupar = [
        { idAgrupar : 1 , nombreAgrupar : 'DIA'} ,
        { idAgrupar : 2 , nombreAgrupar : 'SEMANA'} ,
        { idAgrupar : 3 , nombreAgrupar : 'MES'} ,
        { idAgrupar : 4 , nombreAgrupar : 'AÑO'} ,
    ]
    const onClickGrafico = ( fecha , idMaq , idPie , idMol , idFiltro ) => {
        if (idFiltro === 1) {
            setLoading(true)
            var ban = true
            const fe = Fechas.DD_MM_YYYY_a_DataTimePicker(fecha)
            const getDatosOee =  () => {
                if(ban) {
                    ban = false
                    Servicios.listaOeeMecanizado (
                        idMaq === '' ? null : idMaq ,
                        idPie === '' ? null : idPie,
                        idMol === '' ? null : idMol,
                        Fechas.DD_MM_YYYY_a_DataTimePicker(fecha) ,
                        Fechas.DD_MM_YYYY_a_DataTimePicker(fecha) ,
                        idFiltro ,
                        abortController ,
                        vec => {
                            setVecDatosOee(vec)
                            setLoading(false)
                            setIdMolde (idMol)
                        }
                    )
                }
            }
                setIdAgrupar(idFiltro)
                setFechaProduccionDesde( fe )
                setFechaProduccionHasta ( fe )
                setIdMaquina(idMaq)
                setIdPieza(idPie)
                getDatosOee()
        }
        else if (idFiltro === 2 ) {
            var semana = undefined
			var anio = undefined
			if (String(fecha).length === 10) {
				semana = parseInt ( String (fecha).substring( 3,5 ) )
				anio = parseInt ( String (fecha).substring( 6,10 ) )
			}
			else {
				semana = parseInt ( String (fecha).substring( 3,4 ) )
				anio = parseInt ( String (fecha).substring( 5,9 ) )
			}
            const feSem = Fechas.numeroSemana_1reFecha_ultimaFecha( semana , anio )
            setLoading(true)
            var banSem = true
            setIdAgrupar(idFiltro)
            setFechaProduccionDesde( feSem.inicio)
            setFechaProduccionHasta ( feSem.fin )
            setIdMaquina(idMaq)
            setIdPieza(idPie)
            if(banSem) {
                banSem = false
                Servicios.listaOeeMecanizado (
                    idMaq === '' ? null : idMaq ,
                    idPie === '' ? null : idPie,
                    idMol === '' ? null : idMol,
                    feSem.inicio ,
                    feSem.fin ,
                    idFiltro ,
                    abortController ,
                    vec => {
                        setVecDatosOee(vec)
                        setLoading(false)
                        setIdMolde (idMol)
                    }
                )
            }
        }
        else if (idFiltro === 3 ) {
            setLoading(true)
            var ban3 = true
            const mes = parseInt(String(fecha).substring(0,3)) - 1
            const anio = parseInt(String(fecha).substring(3,7))
            var desde = `${new Moment({ y: anio, M: mes , d:1 ,	h: 0 ,	m: 0 ,	s:0 , ms : 0 }).format( 'ddd MMM DD YYYY')} 00:00:00 GMT-0300` ;
            var hasta = `${new Moment({y:anio, M:mes , d:1 , h:0,m:0,s:0,ms:0}).endOf('month').format('ddd MMM DD YYYY')} 00:00:00 GMT-0300` ;
            setIdAgrupar(idFiltro)
            setFechaProduccionDesde( desde )
            setFechaProduccionHasta ( hasta )
            setIdMaquina(idMaq)
            setIdPieza(idPie)
            if(ban3) {
                ban3 = false
                Servicios.listaOeeMecanizado (
                    idMaq === '' ? null : idMaq ,
                    idPie === '' ? null : idPie,
                    idMol === '' ? null : idMol,
                    desde ,
                    hasta ,
                    idFiltro ,
                    abortController ,
                    vec => {
                        setVecDatosOee(vec)
                        setLoading(false)
                        setIdMolde (idMol)
                    }
                )
            }
        }
        else if ( idFiltro === 4 ) {
            setLoading(true)
            var ban4 = true
			const a = parseInt ( fecha )
			var feInicio = `${new Moment( { y: a , M : 0 , d:1 , h:0 , m:0, s:0 } ).format('ddd MMM DD YYYY')} 00:00:00 GMT-0300`
			var feFin = `${new Moment( { y: a , M : 11 , d:31 , h:0 , m:0, s:0 } ).format('ddd MMM DD YYYY')} 00:00:00 GMT-0300`
            setIdAgrupar(idFiltro)
            setFechaProduccionDesde( feInicio )
            setFechaProduccionHasta ( feFin )
            setIdMaquina(idMaq)
            setIdPieza(idPie)
            if(ban4) {
                ban4 = false
                Servicios.listaOeeMecanizado (
                    idMaq === '' ? null : idMaq ,
                    idPie === '' ? null : idPie,
                    idMol === '' ? null : idMol,
                    feInicio ,
                    feFin ,
                    idFiltro ,
                    abortController ,
                    vec => {
                        setVecDatosOee(vec)
                        setLoading(false)
                        setIdMolde (idMol)
                    }
                )
            }
        }
    }
    return (
        <div>
            <Typography style = { { marginTop : 15 , marginBottom : 20 } }  variant ='h3'>OEE Mecanizado</Typography>
            <div>
                <MyComponent.fecha id = 'fechaDesde' label = 'Fecha Produccion Desde' value = { fechaProduccionDesde } onChange = { e => setFechaProduccionDesde ( e ) } />
                <MyComponent.fecha id = 'fechaHasta' label = 'Fecha Produccion Hasta' value = { fechaProduccionHasta } onChange = { e => setFechaProduccionHasta ( e ) } />
                <MyComponent.listaDesplegable label = 'Maquina' value = { idMaquina } onChange = { e => setIdMaquina ( e.target.value ) } array = { vecMaquinas } member = { { valueMember : 'idMaquina' , displayMember : 'nombreMaquina' } } />
                <MyComponent.listaDesplegable label = 'Pieza' value = { idPieza } onChange = { e => setIdPieza ( e.target.value ) } array = { vecPiezas } member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza' } } />
                <MyComponent.listaDesplegable label = 'Molde' value = { idMolde } onChange = { e => setIdMolde ( e.target.value ) } array = { vecMoldes } member = { { valueMember : 'idMolde' , displayMember : 'nombreMolde' } } />
                <MyComponent.listaDesplegable label = 'Agrupar' value = { idAgrupar } onChange = { e => setIdAgrupar ( e.target.value ) } array = { vecAgrupar } member = { { valueMember : 'idAgrupar' , displayMember : 'nombreAgrupar' } } />
            </div>
            <div id = 'containerTabla'>
                <Table responsive >
                    <thead id = 'cabezera' >
                        <tr style = { { background : '#4141B3' , color : 'white' , boxShadow : '1px 1px  1px grey ' } }>
                            <th >Fecha</th>
                            <th>Maquina</th>
                            <th>Pieza</th>
                            <th>Molde</th>
                            <th>Pz x hs</th>
                            <th>Produccion</th>
                            <th>Rech</th>
                            <th>PM matri</th>
                            <th>PM mante</th>
                            <th>PM produc</th>
                            <th>Total PNP</th>
                            <th>Total PM prog</th>
                            <th>min dispon</th>
                            <th>min prog</th>
                            <th>min Totales</th>
                            <th className = 'D' >D</th>
                            <th className = 'R' >R</th>
                            <th className = 'Q' >Q</th>
                            <th className = 'OEE' >OEE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan ={ 19 }  >
                                    <Loading/>
                                </td>
                            </tr>
                            :
                            Array.isArray ( vecDatosOee ) && vecDatosOee.length > 0 ?
                            vecDatosOee.map ( ( items , i ) => {
                                return (
                                    <Items idAgrupar = { idAgrupar } key = { i } items = { items } ultimo = { ( vecDatosOee.length -1 ) === i  ? true : false} />
                                )
                            } )
                            :
                            <tr>
                                <td colSpan ={ 19 }  >
                                    <img src = { NoFound } alt = 'imgNoFound' />
                                </td>
                        </tr>
                        }
                    </tbody>
                </Table>
            </div>
            <div>
                <GraficoOeeMec onClickGrafico = { onClickGrafico } />
            </div>
        </div>
    )
}

export default OeeMecanizado