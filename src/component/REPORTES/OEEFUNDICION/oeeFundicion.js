import React, { useEffect, useState } from 'react'
import Servicios from '../serviceReportes'
import MyComponent from '../../AAprimary/misComponentes'
import Fechas from '../../AAprimary/fechas'
import { Table } from 'react-bootstrap'
import './styleOeeFun.css'
import Loading from '@material-ui/core/CircularProgress'
import NoFound from '../../../Imagenes/noFound.png'
import Items from './items'
import Moment from 'moment'
import Typography from '@material-ui/core/Typography'
import GraficoOeeFun from './graficoOeeFun'
const OeeFundicion = props => {
	const [idMaquina, setIdMaquina] = useState('')
	const [idPieza, setIdPieza] = useState('')
	const [idMolde, setIdMolde] = useState('')
	const [fechaFundicionDesde, setFechaFundicionDesde] = useState(
		`${new Moment(new Date()).add(-1, 'months').format('ddd MMM DD YYYY')} 00:00:00 GMT-0300`
	)
	const [fechaFundicionHasta, setFechaFundicionHasta] = useState(new Date())
	const [vecMaquinas, setVecMaquinas] = useState('')
	const [vecPiezas, setVecPiezas] = useState('')
	const [vecMoldes, setVecMoldes] = useState('')
	const [loading, setLoading] = useState(true)
	const [vecDatosOee, setVecDatosOee] = useState([])
	const [idAgrupar, setIdAgrupar] = useState(1)
	const [bandera, setBandera] = useState(true)

	useEffect(() => {
		const getListas = async () => {
			const listaMaq = await Servicios.listaMaquinas()
			const listaPie = await Servicios.listaPiezas()
			if (listaMaq) {
				if( Array.isArray(listaMaq) ) {
					listaMaq.unshift({ idMaquina: '', nombreMaquina: 'NONE' })
					setVecMaquinas(listaMaq)
				}
			}
			if (listaPie) {
				if(Array.isArray(listaPie)) {
					listaPie.unshift({ idPieza: '', nombrePieza: 'NONE' })
					setVecPiezas(listaPie)
				}
			}
		}
		getListas()
	}, [props])
	useEffect(() => {
		const getMoldes = async () => {
			const listaMoldes = await Servicios.listaMoldes(idPieza)
			if (listaMoldes) {
				if (Array.isArray(listaMoldes)) {
					listaMoldes.unshift({ idMolde: '', nombreMolde: 'NONE' })
				}
				setIdMolde('')
				setVecMoldes(listaMoldes)
			}
		}
		getMoldes()
	}, [idPieza])
	useEffect(() => {
		const getListaOee = async () => {
			setLoading(true)
			const listaOee = await Servicios.listaOeeFundicion(
				idMaquina === '' ? null : idMaquina,
				idPieza === '' ? null : idPieza,
				idMolde === '' ? null : idMolde,
				Fechas.DataTimePicker_a_SQL(fechaFundicionDesde),
				Fechas.DataTimePicker_a_SQL(fechaFundicionHasta),
				idAgrupar
			)
			if (listaOee) {
				setVecDatosOee(listaOee.vecOeefundicion)
				setLoading(false)
			}
		}
		if(bandera === true) {
			getListaOee()
		}
			return ( )=> {
				setBandera(false)
			}
	}, [
		fechaFundicionDesde,
		fechaFundicionHasta,
		idMaquina,
		idPieza,
		idMolde,
		idAgrupar ,
		bandera
	])
	const vecAgrupar = [
		{ idAgrupar: 1, nombreAgrupar: 'DIA' },
		{ idAgrupar: 2, nombreAgrupar: 'SEMANA' },
		{ idAgrupar: 3, nombreAgrupar: 'MES' },
		{ idAgrupar: 4, nombreAgrupar: 'AÑO' }
	]
	const onClickGrafico = (fecha, idMaq, idPie, idMol, idFiltro) => {
		if (idFiltro === 1) {
			var bandera = true
			setIdAgrupar(idFiltro)
			setFechaFundicionDesde(Fechas.DD_MM_YYYY_a_DataTimePicker(fecha))
			setFechaFundicionHasta(Fechas.DD_MM_YYYY_a_DataTimePicker(fecha))
			setIdMaquina(idMaq)
			setIdPieza(idPie)
			setLoading(true)
			const getListaOee = async () => {
				if(bandera) {
					bandera = false
					const listaOee = await Servicios.listaOeeFundicion(
						idMaq === '' ? null : idMaq,
						idPie === '' ? null : idPie,
						idMol === '' ? null : idMol,
						Fechas.DD_MM_YYYY_a_DataTimePicker(fecha),
						Fechas.DD_MM_YYYY_a_DataTimePicker(fecha),
						idFiltro
					)
					if (listaOee) {
						setVecDatosOee(listaOee.vecOeefundicion)
						setLoading(false)
						setIdMolde(idMol)
					}
				}
			}
			getListaOee()
		}
		else if ( idFiltro === 2 ) {
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
			const fe = Fechas.numeroSemana_1reFecha_ultimaFecha( semana , anio )
			var barr = true
			setFechaFundicionDesde(fe.inicio)
					setFechaFundicionHasta(fe.fin)
					setIdMaquina(idMaq)
					setIdPieza(idPie)
					setIdAgrupar(idFiltro)
					setLoading(true)
					const getListaOee = async () => {
						if (barr) {
							barr = false
							const listaOee = await Servicios.listaOeeFundicion(
								idMaq === '' ? null : idMaq,
								idPie === '' ? null : idPie,
								idMol === '' ? null : idMol,
								fe.inicio,
								fe.fin,
								idFiltro
							)
							if (listaOee) {
								setVecDatosOee(listaOee.vecOeefundicion)
								setLoading(false)
								setIdMolde(idMol)
							}
						}
					}
					getListaOee()
		}
		else if (idFiltro === 3) {
			var barrera = true
            if ( fecha.length === 7 ) {
				const mes = parseInt(String (fecha).substring ( 0,2 ) ) -1
				const anio = parseInt(String (fecha).substring ( 3,7 ) )
                var desde = `${new Moment({ y: anio, M: mes , d:1 ,	h: 0 ,	m: 0 ,	s:0 , ms : 0 }).format( 'ddd MMM DD YYYY')} 00:00:00 GMT-0300`
				var hasta = `${new Moment({y:anio, M:mes , d:1 , h:0,m:0,s:0,ms:0}).endOf('month').format(
					'ddd MMM DD YYYY')} 00:00:00 GMT-0300`
					setFechaFundicionDesde(desde)
					setFechaFundicionHasta(hasta)
					setIdMaquina(idMaq)
					setIdPieza(idPie)
					setIdAgrupar(idFiltro)
					setLoading(true)
					const getListaOee = async () => {
						if (barrera) {
							barrera = false
							const listaOee = await Servicios.listaOeeFundicion(
								idMaq === '' ? null : idMaq,
								idPie === '' ? null : idPie,
								idMol === '' ? null : idMol,
								desde,
								hasta,
								idFiltro
							)
							if (listaOee) {
								setVecDatosOee(listaOee.vecOeefundicion)
								setLoading(false)
								setIdMolde(idMol)
							}
						}
					}
					getListaOee()
				}
		}
		else if ( idFiltro === 4 ) {
			var bb = true
			const a = parseInt ( fecha )
			var feInicio = `${new Moment( { y: a , M : 0 , d:1 , h:0 , m:0, s:0 } ).format('ddd MMM DD YYYY')} 00:00:00 GMT-0300`
			var feFin = `${new Moment( { y: a , M : 11 , d:31 , h:0 , m:0, s:0 } ).format('ddd MMM DD YYYY')} 00:00:00 GMT-0300`
			setFechaFundicionDesde(feInicio)
			setFechaFundicionHasta(feFin)
			setIdMaquina(idMaq)
			setIdPieza(idPie)
			setIdAgrupar(idFiltro)
			setLoading(true)
			const getListaOee = async () => {
				if (bb) {
					bb = false
					const listaOee = await Servicios.listaOeeFundicion(
						idMaq === '' ? null : idMaq,
						idPie === '' ? null : idPie,
						idMol === '' ? null : idMol,
						feInicio,
						feFin,
						idFiltro
					)
					if (listaOee) {
						setVecDatosOee(listaOee.vecOeefundicion)
						setLoading(false)
						setIdMolde(idMol)
					}
				}
			}
			getListaOee()
		}
	}
	return (
		<div>
			<Typography style={{ marginTop: 15, marginBottom: 20 }} variant='h3'>
				OEE Fundicion
			</Typography>
			<div>
				<MyComponent.fecha
					id='fechaDesde'
					label='Fecha Fundicion Desde'
					value={fechaFundicionDesde}
					onChange={e => {setBandera(true) ; setFechaFundicionDesde(Fechas.DataTimePicker_a_SQL(e))}}
				/>
				<MyComponent.fecha
					id='fechaHasta'
					label='Fecha Fundicion Hasta'
					value={fechaFundicionHasta}
					onChange={e => {setBandera(true) ; setFechaFundicionHasta(Fechas.DataTimePicker_a_SQL(e))}}
				/>
				<MyComponent.listaDesplegable
					label='Maquina'
					value={idMaquina}
					onChange={e => { setBandera(true) ; setIdMaquina(e.target.value)}}
					array={vecMaquinas}
					member={{ valueMember: 'idMaquina', displayMember: 'nombreMaquina' }}
				/>
				<MyComponent.listaDesplegable
					label='Pieza'
					value={idPieza}
					onChange={e => {setBandera(true) ; setIdPieza(e.target.value)}}
					array={vecPiezas}
					member={{ valueMember: 'idPieza', displayMember: 'nombrePieza' }}
				/>
				<MyComponent.listaDesplegable
					label='Molde'
					value={idMolde}
					onChange={e => {setBandera(true) ; setIdMolde(e.target.value)}}
					array={vecMoldes}
					member={{ valueMember: 'idMolde', displayMember: 'nombreMolde' }}
				/>
				<MyComponent.listaDesplegable
					label='Agrupar'
					value={idAgrupar}
					onChange={e =>{setBandera(true) ; setIdAgrupar(e.target.value)}}
					array={vecAgrupar}
					member={{ valueMember: 'idAgrupar', displayMember: 'nombreAgrupar' }}
				/>
			</div>
			<div id='containerTabla'>
				<Table responsive>
					<thead id='cabezera'>
						<tr
							style={{
								background: '#4141B3',
								color: 'white',
								boxShadow: '1px 1px  1px grey '
							}}
						>
							<th>Fecha</th>
							<th>Maquina</th>
							<th>Pieza</th>
							<th>Molde</th>
							<th>Pz x hs</th>
							<th>Produccion</th>
							<th>Rech P1</th>
							<th>Rech P2</th>
							<th>PM matri</th>
							<th>PM mante</th>
							<th>PM produc</th>
							<th>PM otros</th>
							<th>Total PNP</th>
							<th>Total PM prog</th>
							<th>Setup</th>
							<th>min dispon</th>
							<th>min prog</th>
							<th>min Totales</th>
							<th className='D'>D</th>
							<th className='R'>R</th>
							<th className='Q'>Q</th>
							<th className='OEE'>OEE</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={22}>
									<Loading />
								</td>
							</tr>
						) : Array.isArray(vecDatosOee) && vecDatosOee.length > 0 ? (
							vecDatosOee.map((items, i) => {
								return (
									<Items
										idAgrupar={idAgrupar}
										key={i}
										items={items}
										ultimo={vecDatosOee.length - 1 === i ? true : false}
									/>
								)
							})
						) : (
							<tr>
								<td colSpan={22}>
									<img src={NoFound} alt='imgNoFound' />
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
			<div className='contenedorGrafico'>
				<GraficoOeeFun onClickGrafico={onClickGrafico} />
			</div>
		</div>
	)
}

export default OeeFundicion
