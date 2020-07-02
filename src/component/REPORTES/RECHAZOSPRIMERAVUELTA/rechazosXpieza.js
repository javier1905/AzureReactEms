import  React , {useEffect , useState , useRef} from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Servicios from '../serviceReportes'
import {Bar} from 'react-chartjs-2'
import chartPlugin from 'chartjs-plugin-datalabels'
import Fechas from '../../AAprimary/fechas'
import './styleGraficoRechazosXpz.css'

const RechazosXpiezas = (props) => {
    const abortController = new AbortController()
    const [fechaFundicionDesde, setfechaFundicionDesde] = useState(Fechas.DD_MM_YYYY_a_DataTimePicker('01/01/2020')  )
    const [fechaFundicionHasta, setfechaFundicionHasta] = useState(new Date())
    const [idMaquina, setidMaquina] = useState('')
    const [idPieza, setidPieza] = useState('')
    const [idMolde, setidMolde] = useState('')
    const [vecMaquinas, setvecMaquinas] = useState([])
    const [vecPiezas, setVecPiezas] = useState([])
    const [vecMoldes, setvecMoldes] = useState([])
    const [vecPiezasGrafico, setvecPiezasGrafico] = useState([])
    const [vecProduccionGrafico, setvecProduccionGrafico] = useState([])
    const [vecRechazosGrafico, setvecRechazosGrafico] = useState([])
    const [vecPorcentagesGrafico, setvecPorcentagesGrafico] = useState([])
    const grafico = useRef()
    useEffect(() => {
        try {
            grafico.current.chartInstance.plugins.unregister(chartPlugin)
            grafico.current.chartInstance.update({
                duration: 800,
                easing: 'easeOutBounce'
            })
            grafico.current.chartInstance.render({
                duration: 800,
                lazy: false,
                easing: 'easeOutBounce'
            })
        }
        catch(e){

        }
        return () => {
            try { grafico.curren.chartInstance.destroy() } catch(e){}
        }
    })
    useEffect(() => {
        Servicios.listaRechazosXpieza( fechaFundicionDesde , fechaFundicionHasta , idMaquina === ''? null : idMaquina , idPieza === ''? null : idPieza  , idMolde === ''? null : idMolde  , abortController , 
            (vecPiezas ,vecProduccion , vecRechazos , vecProcentages) => {
                setvecPiezasGrafico(vecPiezas)
                setvecProduccionGrafico(vecProduccion)
                setvecRechazosGrafico(vecRechazos)
                setvecPorcentagesGrafico(vecProcentages)
            }
        )
        Servicios.listaMaquinas( abortController , vec => {
            vec.unshift({idMaquina : '' , nombreMaquina : 'none'})
            setvecMaquinas(vec)
        })
        Servicios.listaPiezas( abortController , vec => {
            vec.unshift({idPieza : '' , nombrePieza : 'none'})
            setidMolde('')
            setVecPiezas(vec)
        })
        return () =>   abortController.abort()
    }, [props])
    useEffect(() => {
        Servicios.listaMoldes(idPieza , abortController , vec => {
            vec.unshift({idMolde : '' , nombreMolde : 'none'})
            setvecMoldes(vec)
        })
        return () => abortController.abort()
    }, [idPieza])
    useEffect(() => {
        Servicios.listaRechazosXpieza( fechaFundicionDesde , fechaFundicionHasta , idMaquina === ''? null : idMaquina , idPieza === ''? null : idPieza  , idMolde === ''? null : idMolde  , abortController , 
            (vecPiezas ,vecProduccion , vecRechazos , vecProcentages) => {
                setvecPiezasGrafico(vecPiezas)
                setvecProduccionGrafico(vecProduccion)
                setvecRechazosGrafico(vecRechazos)
                setvecPorcentagesGrafico(vecProcentages)
            }
        )
        return () => abortController.abort()
    }, [fechaFundicionDesde , fechaFundicionHasta , idMaquina , idPieza , idMolde])
    const data = {
        labels : vecPiezasGrafico ,
        datasets : [
            {
                data : vecPorcentagesGrafico ,
                type : 'line' ,
                label : 'porcentage de Rechazo' ,
                backgroundColor : ' green' ,
                borderColor : 'green' ,
                borderWidth : 2 ,
                yAxisID : 'ejeDerecho' ,
                fill : false ,
                datalabels : {
                    color : 'white' ,
                    display : true ,
                    backgroundColor : '#34B84E' ,
                    borderColor : '#34B84E' ,
                    formatter : value => `${value} %` ,
                    padding : 10 ,
                    font : {
                        size : 16
                    }
                }
            } ,
            {
                data : vecProduccionGrafico ,
                label : 'produccion' ,
                backgroundColor: 'rgb(55, 49, 138)' ,
                borderColor : 'rgb(55, 49, 138)',
                borderWidth : 3 ,
                yAxisID : 'ejeIzquierdo'
            } ,
            {
                data : vecRechazosGrafico ,
                label : 'rechazos' ,
                backgroundColor: '#C42722' ,
                borderColor : '#C42722',
                borderWidth : 3 ,
                yAxisID : 'ejeIzquierdo'
            }
        ]
    }
    const eventoClick = e => { console.log('evento andando')
        var firstPoint = grafico.current.chartInstance.getElementAtEvent(e)[0]
        if (firstPoint) {
            var label = grafico.current.chartInstance.data.labels[firstPoint._index]
            var value = grafico.current.chartInstance.data.datasets[firstPoint._datasetIndex].data[firstPoint._index]
        }
    }
    const options = {
        // maintainAspectRatio: false,
        onClick : eventoClick ,
        responsive : true ,
        tooltips : {
            mode : 'label'
        } ,
        scales : {
            yAxes : [
                {
                    id: 'ejeIzquierdo',
                    position: 'left' ,
                    ticks : {
                        beginAtZero : true
                    } ,
                    gridLines : {
                        offsetGridLines : false
                    } ,
                    scaleLabel : {
                        display : true ,
                        labelString : 'Cantidad de piezas' ,
                        fontColor : 'black'
                    }
                } ,
                {
                    id : 'ejeDerecho' ,
                    position : 'right' ,
                    gridLines :  {
                        display : false
                    } ,
                    type : 'linear' ,
                    ticks : {
                        callback : value => `${value} %`
                    } ,
                    scaleLabel : {
                        display : true ,
                        labelString : 'Procentaje de rechazos' ,
                        fontColor : 'balck'
                    }
                }
            ] ,
            xAxes : [
                {
                    gridLines : {
                        display : false
                    }
                }
            ]
        } ,
        elements : {
            line : {
                tension : 0
            }
        } ,
        title : {
            display : true ,
            text : 'Rechazos primera vuelta por pieza' ,
            fontSize : 30
        } ,
        legend : {
            display : true ,
            position : 'bottom' ,
            align : 'center' ,
            labels : {
                fontSize : 16 ,
                fontColor : 'black' ,
                padding : 30
            }
        } ,
        plugins : {
            datalabels : {
                // color : contex => {
                //     const index = contex.dataIndex
                //     var value = contex.dataset.data[index]
                //     console.log(value , 'value')
                //     if(value > 10) {
                //         return 'black'
                //     }
                //     else {
                //         return 'white'
                //     }
                // } ,
                color : 'white' ,
                display : true ,

            }
        }

    }
    const plugin = [{chartPlugin}]

    return (
        <div className = 'containerRxP'>
            <div className='container-filtros'>
                <MyComponent.fecha id ='fechaDesdeFundicion' label = 'desde' value = {fechaFundicionDesde}  onChange = {e => setfechaFundicionDesde (e)} />
                <MyComponent.fecha id='fechaHastaFundicion' label = 'hasta' value = {fechaFundicionHasta}  onChange = { e => setfechaFundicionHasta (e)} />
                <MyComponent.listaDesplegable
                    array = {vecMaquinas}
                    value = {idMaquina}
                    onChange = { e => setidMaquina(e.target.value)}
                    label ='maquinas'
                    member = {{valueMember : 'idMaquina' , displayMember : 'nombreMaquina'}}
                />
                <MyComponent.listaDesplegable
                    array = {vecPiezas}
                    value = {idPieza}
                    onChange = { e => setidPieza(e.target.value)}
                    label ='piezas'
                    member = {{valueMember : 'idPieza' , displayMember : 'nombrePieza'}}
                />
                <MyComponent.listaDesplegable
                    array = {vecMoldes}
                    value = {idMolde}
                    onChange = { e => setidMolde(e.target.value)}
                    label ='moldes'
                    member = {{valueMember : 'idMolde' , displayMember : 'nombreMolde'}}
                />
            </div>
            <div className ='containerGrafico'>
                <Bar
                    ref = {grafico}
                    plugins = {plugin}
                    data = {data}
                    options = {options}
                />
            </div>
        </div>
    )
}

export default RechazosXpiezas