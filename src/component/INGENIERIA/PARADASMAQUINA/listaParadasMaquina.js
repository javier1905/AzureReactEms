import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FromAltaParadaMaquina from './formAltaParadaMaquina'
import noFound from '../../../Imagenes/noFound.png'
import ParadaMaquina from './ParadaMaquina'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaParadasMaquina = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecParadasMaquina , setVecParadasMaquina] = useState ( [  ] )
    const [vecAreas , setVecAreas] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [paradaMaquinaSeleccionada , setParadaMaquinaSeleccionada] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecParadasMaq = await Servicios.listaParadasMaquina (  )
            const vecAre = await Servicios.listaAreas (  )
            if ( vecParadasMaq ) {
                setLoading ( false )
                setVecParadasMaquina ( vecParadasMaq )
            }
            if ( vecAre ) {
                setVecAreas ( vecAre )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , paradaMaquina ) => {
        setModo ( modo )
        setParadaMaquinaSeleccionada ( paradaMaquina )
        var formAltaParadaMaquina = $( '#formAltaParadaMaquina' )
        formAltaParadaMaquina.slideUp (  )
    }
    const actualizaListaParadasMaquina = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaParadaMaquina = $( '#formAltaParadaMaquina' )
        formAltaParadaMaquina.slideToggle ( )
        setModo ( 'normal' )
        setParadaMaquinaSeleccionada ( undefined )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Lista de Paradas de Maquina</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add parada maquina' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaParadaMaquina' style = { { display : 'none' } }>
                    <FromAltaParadaMaquina methodAdd = { methodAdd } actualizaListaParadasMaquina = { actualizaListaParadasMaquina } vecAreas = { vecAreas } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Para Maquina</th>
                                <th>Tipo</th>
                                <th>Area</th>
                                <th>SetUp</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                <tr>
                                    <td colSpan = { 6 } >
                                        <Loading />
                                    </td>
                                </tr>
                                :
                                ( Array.isArray ( vecParadasMaquina ) && vecParadasMaquina.length > 0 ) ?
                                vecParadasMaquina.map ( ( pm , i ) => {
                                    return ( <ParadaMaquina vecAreas = { vecAreas } actualizaListaParadasMaquina = { actualizaListaParadasMaquina }  modo = { paradaMaquinaSeleccionada === pm ? modo : 'normal' } paradaMaquina = { pm } key = { i } cambiaModo = { cambiaModo } /> )
                                } )
                                :
                                <tr>
                                    <td colSpan = { 6 } >
                                        <img src = { noFound } alt = 'No found' ></img>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </SnackbarProvider>
        </div>
    )
}

export default ListaParadasMaquina