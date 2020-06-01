import React, { useState, useEffect, useRef } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Moment from 'moment'
import Servicios from '../serviceReportes'
import {Bar} from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import ModalDetalleXMaquina from './modalDetallePMxMaq'
import ModalDetalleXpm from './modalDetallePMxPM'
const ReporteParadasMaquina = (props) => {
    const [fechaDesdeFundicion,setFechaDesdeFundicion] = useState(new Moment().month(0).date(1))
    const [fechaHastaFundicion,setFechaHastaFundicion] = useState(new Moment ())
    const [idArea,setIdArea] = useState(null)
    const [vecAreas,setVecAreas] = useState([])
    const [vecLabels,setVecLabels] = useState([])
    const [vecValues,setVecValues] = useState([])
    const [openDetalleXmaquina,setOpenDetalleXmaquina] = useState(false)
    const [vecDetalleXmaq,setVecDetalleXmaq] = useState([])
    const [loadingModalDetallexMaq , setLoadingModalDetallexMaq] = useState(true)
    const [maquinaSeleccionada , setMaquinaSeleccionada] = useState(undefined)

    const [fechaDesdeFundicion2,setFechaDesdeFundicion2] = useState(new Moment().month(0).date(1))
    const [fechaHastaFundicion2,setFechaHastaFundicion2] = useState(new Moment ())
    const [vecLabels2,setVecLabels2] = useState([])
    const [vecValues2,setVecValues2] = useState([])
    const [vecDetalleXpm,setVecDetalleXpm] = useState([])
    const [loadingModalDetallexpm , setLoadingModalDetallexpm] = useState(true)
    const [openDetalleXpm,setOpenDetalleXpm] = useState(false)
    const [pmSeleccionada , setPmSeleccionada] = useState(undefined)
    const grafico = useRef()
    const grafico2 = useRef()
    const abortController = new AbortController()
    const myCallback1 = vec => { if (Array.isArray(vec)){ vec.unshift({idArea : null , nombreArea : 'NONE '}) ; setVecAreas(vec)  } }
    const myCallback2 = (vecLabels , vecValues) => {
        if(Array.isArray(vecLabels)) {
            setVecLabels(vecLabels)
            setVecValues(vecValues)
        }
    }
    const myCallback3 = (vecLabels , vecValues) => {
        if(Array.isArray(vecLabels)) {
            setVecLabels2(vecLabels)
            setVecValues2(vecValues)
        }
    }
    useEffect( () => {
        Servicios.listaAreas2 (abortController,myCallback1)
        try { grafico2.current.chartInstance.plugins.unregister(ChartDataLabels) } catch(e) {}
        try { grafico.current.chartInstance.plugins.unregister(ChartDataLabels) } catch(e){}
        return () => { abortController.abort() }
    } , [] )
    useEffect(() => {
        Servicios.listaReporteParadasMaquina( idArea , fechaDesdeFundicion , fechaHastaFundicion , abortController , myCallback2  )
        return () => { abortController.abort() }
    } , [idArea,fechaDesdeFundicion , fechaHastaFundicion] )
    useEffect(() => {
        Servicios.listaReporteParadasMaquinaxPM(fechaDesdeFundicion2 , fechaHastaFundicion2 , abortController , myCallback3)
        return () => {abortController.abort()}
    } , [fechaDesdeFundicion2 , fechaHastaFundicion2] )
    const data = {
        labels : vecLabels ,
        datasets : [
            {
                type : 'bar' ,
                data : vecValues ,
                backgroundColor : 'rgb(55, 49, 138)' ,
                borderColor : 'rgb(55, 49, 138)' ,
                borderWidth : 2 ,
                label : 'Min paradas de maquina' ,
                yAxisID : 'ejeIzquierdo'
            }
        ]
    }
    const eventGraf = e => {
        var firstPoint = grafico.current.chartInstance.getElementAtEvent(e)[0];
        if (firstPoint) {
            var label = grafico.current.chartInstance.data.labels[firstPoint._index];
            var value = grafico.current.chartInstance.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        }
        if(label !== undefined && value !== undefined){
            setMaquinaSeleccionada(label)
            setOpenDetalleXmaquina(true)
            const getVecDetallexMaquina = async () => {
                const vecDetxMaq = await Servicios.listaDetallePMxMaquina (fechaDesdeFundicion , fechaHastaFundicion , label, idArea)
                if(vecDetxMaq) {
                    setVecDetalleXmaq(vecDetxMaq)
                    setLoadingModalDetallexMaq(false)
                }
            }
            getVecDetallexMaquina()
        }
    }
    const closeDetalleXmaquina = () => {
        setLoadingModalDetallexMaq(true)
        setOpenDetalleXmaquina(false)
    }
    const closeDetalleXpm = () => {
        setLoadingModalDetallexpm(true)
        setOpenDetalleXpm(false)
    }
    const options = {
        plugins : {
            datalabels : {
                color : 'white' ,
                font : {
                    size : '20'
                } ,
                formatter : (value , constext) => {
                    return `${value} min`
                }
                // borderColor : '#0C1863',
                // borderWidth : 2 ,
                // backgroundColor : 'red'
            }
        } ,
        responsive : true ,
        onClick : eventGraf ,
        tooltips : {
            mode : 'label' ,
            intersect : true
        } ,
        title : {
            text : 'Paradas de Maquina' ,
            display : true ,
            position : 'top' ,
            fontSize : 20
        },
        element : {
            line : {
                tension : 0 ,
                fill : false
            }
        } ,
        legend : {
            display : true ,
            position : 'bottom' ,
            align : 'center'
        } ,
        scales : {
            yAxes : [
                {
                    id : 'ejeIzquierdo' ,
                    position : 'left' ,
                    ticks : {
                        beginAtZero : true
                    } ,
                    gridLines : {
                        offsetGridLines: true
                    }
                }
            ] ,
            xAxes : [
                {
                    id : 'ejeMaquina' ,
                    position : 'bottom' ,
                    gridLines : {
                        display : false
                    }
                }
            ]
        }
    }
    const eventGraf2 = e => {
        var firstPoint = grafico2.current.chartInstance.getElementAtEvent(e)[0];
        if (firstPoint) {
            var label = grafico2.current.chartInstance.data.labels[firstPoint._index];
            var value = grafico2.current.chartInstance.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        }
        if(label !== undefined && value !== undefined){
            setPmSeleccionada(String(label).trim().split('--')[0])
            setOpenDetalleXpm(true)
            const getVecDetallexMaquina = async () => {
                const vecDetxPM = await Servicios.listaDetalleParadasMaquinaxPM (fechaDesdeFundicion , fechaHastaFundicion , String(label).trim().split('--')[0])
                if(vecDetxPM) {
                    setVecDetalleXpm(vecDetxPM)
                    setLoadingModalDetallexpm(false)
                }
            }
            getVecDetallexMaquina()
        }
    }
    const data2 = {
        labels : vecLabels2 ,
        datasets : [
            {
                type : 'bar' ,
                data : vecValues2 ,
                backgroundColor : 'rgb(55, 49, 138)' ,
                borderColor : 'rgb(55, 49, 138)' ,
                borderWidth : 2 ,
                label : 'Min paradas de maquina' ,
                yAxisID : 'ejeIzquierdo'
            }
        ]
    }
    const options2 = {
        plugins : {
            datalabels : {
                color : 'white' ,
                font : {
                    size : '20'
                } ,
                formatter : (value , constext) => {
                    return `${value} min`
                }
                // borderColor : '#0C1863',
                // borderWidth : 2 ,
                // backgroundColor : 'red'
            }
        } ,
        responsive : true ,
        onClick : eventGraf2 ,
        tooltips : {
            mode : 'label' ,
            intersect : true
        } ,
        title : {
            text : 'Paradas de Maquina' ,
            display : true ,
            position : 'top' ,
            fontSize : 20
        },
        element : {
            line : {
                tension : 0 ,
                fill : false
            }
        } ,
        legend : {
            display : true ,
            position : 'bottom' ,
            align : 'center'
        } ,
        scales : {
            yAxes : [
                {
                    id : 'ejeIzquierdo' ,
                    position : 'left' ,
                    ticks : {
                        beginAtZero : true
                    } ,
                    gridLines : {
                        offsetGridLines: true
                    }
                }
            ] ,
            xAxes : [
                {
                    id : 'ejeMaquina' ,
                    position : 'bottom' ,
                    gridLines : {
                        display : false
                    } ,
                    // scaleLabel: {
                    //     labelString: 'Paradas de Maquina',
                    //     display: true,
                    // }
                }
            ]
        }
    }
    const plugins = [
        ChartDataLabels
    ]
    return (
        <div className ='containerPM'>
            <div className = 'containerFiltros'>
                <MyComponent.fecha id = 'fechaDesde' label = 'Desde' value = {fechaDesdeFundicion} onChange = { e=> setFechaDesdeFundicion (new Moment(e).utc().hour(3).minute(0).second(0).format('YYYY-MM-DDTHH:MM:ss.sss'))}/>
                <MyComponent.fecha label = 'fechaHasta' value = {fechaHastaFundicion} onChange = { e=> setFechaHastaFundicion (new Moment(e).utc().hour(3).minute(0).second(0).format('YYYY-MM-DDTHH:MM:ss.sss'))}/>
                <MyComponent.listaDesplegable onChange = { e => setIdArea(e.target.value) } value = { idArea } label = 'Area' array = {vecAreas} member = {{displayMember : 'nombreArea' , valueMember : 'idArea'}} />
            </div>
            <div>
                <ModalDetalleXMaquina
                    closeDetalleXmaquina = {closeDetalleXmaquina}
                    openDetalleXmaquina = {openDetalleXmaquina}
                    vecDetalleXmaq = {vecDetalleXmaq}
                    loadingModalDetallexMaq = {loadingModalDetallexMaq}
                    maquinaSeleccionada = {maquinaSeleccionada}
                    fechaDesdeFundicion = {fechaDesdeFundicion}
                    fechaHastaFundicion = {fechaHastaFundicion}
                    area = {vecAreas.find(a => a.idArea === idArea)}
                />
            </div>
            <div className = 'containerGrafico'>
                <Bar
                    ref = {grafico}
                    height= {150}
                    data = {data}
                    plugins = {plugins}
                    options = { options}
                />
            </div>
            <div className = 'containerFiltros'>
                <MyComponent.fecha id = 'fechaDesde2' label = 'Desde' value = {fechaDesdeFundicion2} onChange = { e=> setFechaDesdeFundicion2 (new Moment(e).utc().hour(3).minute(0).second(0).format('YYYY-MM-DDTHH:MM:ss.sss'))}/>
                <MyComponent.fecha id = 'fechaHasta2' label = 'fechaHasta' value = {fechaHastaFundicion2} onChange = { e=> setFechaHastaFundicion2 (new Moment(e).utc().hour(3).minute(0).second(0).format('YYYY-MM-DDTHH:MM:ss.sss'))}/>
            </div>
            <div>
                <ModalDetalleXpm
                    closeDetalleXpm = {closeDetalleXpm}
                    openDetalleXpm = {openDetalleXpm}
                    vecDetalleXpm = {vecDetalleXpm}
                    loadingModalDetallexpm = {loadingModalDetallexpm}
                    pmSeleccionada = {pmSeleccionada}
                    fechaDesdeFundicion2 = {fechaDesdeFundicion2}
                    fechaHastaFundicion2 = {fechaHastaFundicion2}
                />
            </div>
            <div className = 'containerGrafico'>
                <Bar
                    ref = {grafico2}
                    height= {150}
                    data = {data2}
                    plugins = {plugins}
                    options = { options2}
                />
            </div>
        </div>
    )
}
export default React.memo( ReporteParadasMaquina )