import React , { useState , useEffect , useRef }  from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Servicios from '../serviceReportes'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import servicios from '../serviceReportes'
import Moment from 'moment'

const RechazosPrimeraVuelta = ( props ) => {
    const [fechaFundicionDesde , setFechaFundicionDesde] = useState ( new Moment (`${new Date (  ).getFullYear (  )}-01-01T00:00:00.000`).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) )
    const [fechaFundicionHasta , setFechaFundicionHasta] = useState ( new Date () )
    const [idMaquina , setIdMaquina] = useState ( '' )
    const [idPieza , setIdPieza] = useState ( '' )
    const [idMolde , setIdMolde] = useState ( '' )
    const [vecMaquinas , setVecMaquinas] = useState ( [  ] )
    const [vecPiezas , setVecPiezas] = useState ( [  ] )
    const [vecMoldes , setVecMoldes] = useState ( [  ] )
    const [vecFechas , setVecFechas] = useState ( [  ] )
    const [vecProduccion , setVecProduccion] = useState ( [  ] )
    const [vecRechazos , setVecRechazos] = useState ( [  ] )
    const [vecPorcentajes , setVecPorcentajes] = useState ( [  ] )
    const refGrafico = useRef (  )
    const abortController = new AbortController()
    useEffect ( (  ) => {
        Servicios.listaMaquinas ( abortController , vec => setVecMaquinas(vec) )
        Servicios.listaPiezas ( abortController , vec => setVecPiezas(vec) )
        try { refGrafico.plugins.unregister ( ChartDataLabels ) } catch ( e ) {  }
        return () => abortController.abort()
    } , [props] )
    useEffect ( (  ) => {
        Servicios.listaMoldes ( idPieza , abortController , vec =>  setVecMoldes(vec) )
        return () => abortController.abort()
    } , [ idPieza ] )
    useEffect ( (  ) => {
        servicios.listaReporteRechazosPrimeraVuelta ( fechaFundicionDesde , fechaFundicionHasta ,
            idMaquina === '' ? null : idMaquina , idPieza === '' ? null : idPieza ,
            idMolde === '' ? null : idMolde , abortController , (vecFechas , vecProduccion , vecRechazos , vecPorcentaje) => {
                setVecFechas ( vecFechas )
                setVecProduccion ( vecProduccion )
                setVecRechazos ( vecRechazos )
                setVecPorcentajes ( vecPorcentaje )
            }
        )
        return () => abortController.abort()
    } , [fechaFundicionDesde , fechaFundicionHasta , idMaquina , idPieza , idMolde] )
    const datos = {
        labels : vecFechas ,
        datasets : [
            {
                datalabels : {
                    color : 'white' ,
                    display : true ,
                    backgroundColor : '#34B84E',
                    borderColor : '#199215 ',
                    borderWidth : 2 ,
                    font : {
                        size : 18
                    }
                } ,
                type : 'line' ,
                data : vecPorcentajes ,
                yAxisID : 'id_escala_derecha' ,
                backgroundColor : '#34B84E' ,
                borderColor : '#34B84E' ,
                label : 'Prosentajes' ,
                fill : false ,
                formatter : (value , context) => {
                    return  `${value} %`
                }
            } ,
            {
                datalabels: {
                    color : 'white' ,
                    display : true ,
                    font : {
                        size : 18
                    } ,
                    formatter : (value , context) => {
                        return  value
                    }
                } ,
                type : 'bar' ,
                data : vecProduccion ,
                label : 'Producion' ,
                backgroundColor : 'rgb(55, 49, 138)' ,
                yAxisID : 'id_escala_izquierda' ,
                fill : false
            },
            {
                datalabels: {
                    color : 'black' ,
                    display : true ,
                    font : {
                        size : 18
                    } ,
                    formatter : (value , context) => {
                        return  value
                    }
                } ,
                type : 'bar' ,
                data : vecRechazos ,
                yAxisID : 'id_escala_izquierda' ,
                backgroundColor : '#C42722' ,
                label : 'Rechazos' ,
                fill : false
            }
        ]
    }
    const opciones = {
        plugins: {
            datalabels : {
                color : 'black' ,
                display : false ,
                formatter : (value , context) => {
                    return  `${value} %`
                }
            }
        } ,
        tooltips : {
            mode : 'label'
        } ,
        title : {
            text : 'Rechazos de primera vuelta' ,
            display : true ,
            fontSize : 30
        } ,
        responsive : true ,
        legend : {
            display : true ,
            position : 'bottom' ,
            labels : {
                padding : 30 ,
                fontColor : 'black'
            }
        } ,
        elements : {
            point : {
                radius : 3
            } ,
            line : {
                fill : false ,
                tension : 0
            }
        } ,
        scales : {
            xAxes : [
                {
                    display : true ,
                    ticks: {
                        // max: 5,
                        // min: 0,
                        stepSize: 4
                    } ,
                    gridLines : {
                        display : false
                    }
                }
            ] ,
            yAxes : [
                {
                    type : 'linear' ,
                    display : true ,
                    position : 'left' ,
                    id : 'id_escala_izquierda' ,
                    gridLines : {
                        display : true
                    } ,
                    labels : {
                        show : true
                    } ,
                    ticks : {
                        min : 0
                    }
                } ,
                {
                    type : 'linear' ,
                    display : true ,
                    position : 'right' ,
                    id : 'id_escala_derecha' ,
                    gridLines : {
                        display : true
                    } ,
                    labels : {
                        show : true
                    } ,
                    ticks : {
                        min : 0 ,
                        stepSize: 200
                    }
                }
            ]
        }
    }
    const plugins = [
        { ChartDataLabels }
    ]
    return (
        <div>
            <div className = 'containerFilter' >
                <MyComponent.fecha id = 'fechaFunDesde' label ='Fecha Fun Desde' value = { fechaFundicionDesde } onChange = { e => setFechaFundicionDesde ( e ) } />
                <MyComponent.fecha id = 'fechaFunHasta' label ='Fecha Fun Hasta' value = { fechaFundicionHasta } onChange = { e => setFechaFundicionHasta ( e ) } />
                <MyComponent.listaDesplegable
                    label = 'Maquina'
                    value = { idMaquina }
                    onChange = { e => setIdMaquina ( e.target.value ) }
                    array = { vecMaquinas }
                    member = { { valueMember : 'idMaquina' , displayMember : 'nombreMaquina' } }
                />
                <MyComponent.listaDesplegable
                    label = 'Pieza'
                    value = { idPieza }
                    onChange = { e => setIdPieza ( e.target.value ) }
                    array = { vecPiezas }
                    member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza' } }
                />
                <MyComponent.listaDesplegable
                    label = 'Molde'
                    value = { idMolde }
                    onChange = { e => setIdMolde ( e.target.value ) }
                    array = { vecMoldes }
                    member = { { valueMember : 'idMolde' , displayMember : 'nombreMolde' } }
                />
            </div>
            <div className = 'containerGrafico'>
                <Bar
                    ref = { refGrafico }
                    data = { datos }
                    options = { opciones }
                    plugins = { plugins }
                />
            </div>
        </div>
    )
}

export default RechazosPrimeraVuelta