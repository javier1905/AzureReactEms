import React, { useState, useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
// import Typography from '@material-ui/core/Typography'
import Moment from 'moment'
import Loading from '@material-ui/core/CircularProgress'
import Servicios from '../serviceReportes'
import MyComponent from '../../AAprimary/misComponentes'
import Fechas from '../../AAprimary/fechas'
import './styleOeeFun.css'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const GraficoOeeFun = props => {
	const [idMaquina, setIdMaquina] = useState('')
	const [idPieza, setIdPieza] = useState('')
	const [idMolde, setIdMolde] = useState('')
	const [fechaFundicionDesde, setFechaFundicionDesde] = useState(
		new Moment(new Date()).add(-1, 'months').format('YYYY-MM-DDTHH:MM:ss.sss')
	)
	const [fechaFundicionHasta, setFechaFundicionHasta] = useState(new Date())
	const [vecMaquinas, setVecMaquinas] = useState('')
	const [vecPiezas, setVecPiezas] = useState('')
	const [vecMoldes, setVecMoldes] = useState('')
	const [loading, setLoading] = useState(false)
	const [vecFechass, setVecFechass] = useState([])
	const [vecDis, setVecDis] = useState([])
	const [vecRen, setVecRen] = useState([])
	const [vecQal, setVecQal] = useState([])
	const [vecOee, setVecOee] = useState([])
	const [vecColores, setVecColores] = useState([])
	const [vecObjetivoMin, setVecObjetivoMin] = useState([])
	const [vecObjetivoMax, setVecObjetivoMax] = useState([])
	const [idAgrupar, setIdAgrupar] = useState(1)
	const grafico = useRef()

	const abortController = new AbortController()
	useEffect(() => {
		Servicios.listaOeeFundicionGrafico(
			idMaquina === '' ? null : idMaquina,
			idPieza === '' ? null : idPieza,
			idMolde === '' ? null : idMolde,
			fechaFundicionDesde,
			fechaFundicionHasta,
			idAgrupar ,
			abortController ,
			( vecFech ,vecD	, vecR , vecQ , vecOEE	, vecColoress , vecObjetivoMinn	, vecObjetivoMaxx ) => {
				setVecFechass(vecFech)
				setVecDis(vecD)
				setVecRen(vecR)
				setVecQal(vecQ)
				setVecOee(vecOEE)
				setVecColores(vecColoress)
				setVecObjetivoMin(vecObjetivoMinn)
				setVecObjetivoMax(vecObjetivoMaxx)
			}
		)
		Servicios.listaMaquinas(abortController , vec => {
			vec.unshift({ idMaquina: '', nombreMaquina: 'NONE' })
			setVecMaquinas(vec)
		})
		Servicios.listaPiezas(abortController , vec => {
			vec.unshift({ idPieza: '', nombrePieza: 'NONE' })
			setVecPiezas(vec)
		})
		try {
			grafico.current.chartInstance.plugins.unregister(ChartDataLabels)
		} catch (e) {}
		return () => abortController.abort()
	}, [props])
	useEffect(() => {
		Servicios.listaMoldes(idPieza , abortController , vec => {
			vec.unshift({ idMolde: '', nombreMolde: 'NONE' })
			setIdMolde('')
			setVecMoldes(vec)
		})
		return ()=> abortController.abort()
	}, [idPieza])
	useEffect(() => {
		Servicios.listaOeeFundicionGrafico(
			idMaquina === '' ? null : idMaquina,
			idPieza === '' ? null : idPieza,
			idMolde === '' ? null : idMolde,
			fechaFundicionDesde,
			fechaFundicionHasta,
			idAgrupar ,
			abortController ,
			( vecFech ,vecD	, vecR , vecQ , vecOEE	, vecColoress , vecObjetivoMinn	, vecObjetivoMaxx ) => {
				setVecFechass(vecFech)
				setVecDis(vecD)
				setVecRen(vecR)
				setVecQal(vecQ)
				setVecOee(vecOEE)
				setVecColores(vecColoress)
				setVecObjetivoMin(vecObjetivoMinn)
				setVecObjetivoMax(vecObjetivoMaxx)
			}
		)
		return () => abortController.abort()
	}, [
		fechaFundicionDesde,
		fechaFundicionHasta,
		idMaquina,
		idPieza,
		idMolde,
		idAgrupar
	])
	const vecAgrupar = [
		{ idAgrupar: 1, nombreAgrupar: 'DIA' },
		{ idAgrupar: 2, nombreAgrupar: 'SEMANA' },
		{ idAgrupar: 3, nombreAgrupar: 'MES' },
		{ idAgrupar: 4, nombreAgrupar: 'AÑO' }
	]
	const data = {
		labels: vecFechass,
		datasets: [
			{
				datalabels: {
					color: 'black',
					display: false
				},
				pointRadius: 1,
				pointHitRadius: 10,
				label: 'Objetivo Min',
				data: vecObjetivoMin,
				type: 'line',
				fill: false,
				backgroundColor: '#17202A',
				borderColor: '#17202A',
				yAxisID: 'escalaIzquierda'
			},
			{
				datalabels: {
					color: 'black',
					display: false
				},
				pointRadius: 1,
				pointHitRadius: 10,
				label: 'Objetivo Max',
				data: vecObjetivoMax,
				type: 'line',
				fill: false,
				backgroundColor: '#17202A',
				borderColor: '#17202A',
				yAxisID: 'escalaIzquierda'
			},
			{
				datalabels: {
					color: 'black',
					display: true
				},
				label: 'Disponibilidad',
				data: vecDis,
				type: 'line',
				fill: false,
				backgroundColor: 'blue',
				borderColor: 'blue',
				yAxisID: 'escalaIzquierda'
			},
			{
				datalabels: {
					color: 'black',
					display: true
				},
				label: 'Rendimiento',
				data: vecRen,
				type: 'line',
				fill: false,
				backgroundColor: '#C42722',
				borderColor: '#C42722',
				yAxisID: 'escalaIzquierda'
			},
			{
				datalabels: {
					color: 'black',
					display: true
				},
				label: 'Calidad',
				data: vecQal,
				type: 'line',
				fill: false,
				backgroundColor: '#34CC32',
				borderColor: '#34CC32',
				yAxisID: 'escalaIzquierda'
			},
			{
				datalabels: {
					color: 'white',
					display: true,
					font: {
						size: 16
					}
				},
				type: 'bar',
				label: 'OEE',
				data: vecOee,
				backgroundColor: vecColores,
				fill: false,
				yAxisID: 'escalaIzquierda',
				pointBackgroundColor: vecColores,
				hoverBackgroundColor: vecColores,
				borderWidth: 3,
				hoverBorderColor: vecColores
			}
		]
	}
	const option = {
		onClick: clickHandler,
		plugins: {
			datalabels: {
				color: 'black',
				display: false ,
				formatter : (value , context) => {
					return `${value}%`
				}
			}
		},
		title: {
			text: 'OEE fundicion',
			display: true,
			fontSize: 30
		},
		legend: {
			display: true,
			position: 'bottom',
			labels: {
				padding: 30,
				fontColor: 'black'
			}
		},
		responsive: true,
		tooltips: {
			mode: 'label'
		},
		elements: {
			line: {
				tension: 0,
				cubicInterpolationMode: 'default',
				fill: false
			},
			point: {
				radius: 3
			}
		},
		scales: {
			xAxes: [
				{
					display: true,
					ticks: {
						// max: 5,
						// min: 0,
						stepSize: 4
					},
					gridLines: {
						display: false
					}
				}
			],
			yAxes: [
				{
					type: 'linear',
					display: true,
					position: 'left',
					id: 'escalaIzquierda',
					gridLines: {
						display: true
					},
					labels: {
						show: true
					},
					ticks: {
						min: 0
					}
				}
			]
		}
	}
	// const plugins = [
	//     {
	//         afterDraw: (chartInstance , easing) => {
	//             const ctx = chartInstance.chart.ctx
	//             ctx.fillText ( "This text drawn by a plugin" , 1000 , 100 )
	//         }
	//     }
	// ];
	const plugins = [
		{
			ChartDataLabels
		}
	]
	function clickHandler(evt) {
		var firstPoint = grafico.current.chartInstance.getElementAtEvent(evt)[0]
		if (firstPoint) {
			var fecha = grafico.current.chartInstance.data.labels[firstPoint._index]
			// var value = grafico.current.chartInstance.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
			if (fecha !== 'Acumulado') {
				props.onClickGrafico(fecha, idMaquina, idPieza, idMolde, idAgrupar)
			}
		}
	}
	return (
		<div>
			<div>
				<MyComponent.fecha
					id='fechaDesdeGraf'
					label='Fecha Fundicion Desde'
					value={fechaFundicionDesde}
					onChange={e => setFechaFundicionDesde(Fechas.DataTimePicker_a_SQL(e))}
				/>
				<MyComponent.fecha
					id='fechaHastaGraf'
					label='Fecha Fundicion Hasta'
					value={fechaFundicionHasta}
					onChange={e => setFechaFundicionHasta(Fechas.DataTimePicker_a_SQL(e))}
				/>
				<MyComponent.listaDesplegable
					label='Maquina'
					value={idMaquina}
					onChange={e => setIdMaquina(e.target.value)}
					array={vecMaquinas}
					member={{ valueMember: 'idMaquina', displayMember: 'nombreMaquina' }}
				/>
				<MyComponent.listaDesplegable
					label='Pieza'
					value={idPieza}
					onChange={e => setIdPieza(e.target.value)}
					array={vecPiezas}
					member={{ valueMember: 'idPieza', displayMember: 'nombrePieza' }}
				/>
				<MyComponent.listaDesplegable
					label='Molde'
					value={idMolde}
					onChange={e => setIdMolde(e.target.value)}
					array={vecMoldes}
					member={{ valueMember: 'idMolde', displayMember: 'nombreMolde' }}
				/>
				<MyComponent.listaDesplegable
					label='Agrupar'
					value={idAgrupar}
					onChange={e => setIdAgrupar(e.target.value)}
					array={vecAgrupar}
					member={{ valueMember: 'idAgrupar', displayMember: 'nombreAgrupar' }}
				/>
			</div>
			{loading ? (
				<Loading />
			) : (
				<div className='containerGraf'>
					<Bar
						ref={grafico}
						data={data}
						width={100}
						height={50}
						options={option}
						plugins={plugins}
					/>
				</div>
			)}
		</div>
	)
}
export default GraficoOeeFun
