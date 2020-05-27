import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FormAltaArea from './formAltaArea'
import noFound from '../../../Imagenes/noFound.png'
import Area from './area'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaAreas = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecAreas , setVecAreas] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [areaSeleccionada , setAreaSeleccionada] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecAre= await Servicios.listaAreas (  )
            if ( vecAre ) {
                setLoading ( false )
                setVecAreas ( vecAre )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , area ) => {
        setModo ( modo )
        setAreaSeleccionada ( area )
        var formAltaArea= $( '#formAltaArea' )
        formAltaArea.slideUp (  )
    }
    const actualizaListaAreas = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaArea = $( '#formAltaArea' )
        formAltaArea.slideToggle ( )
        setModo ( 'normal' )
        setAreaSeleccionada ( undefined )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Lista de Areas</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add area' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaArea' style = { { display : 'none' } }>
                    <FormAltaArea methodAdd = { methodAdd } actualizaListaAreas = { actualizaListaAreas } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Area</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                <tr>
                                    <td colSpan = { 4 } >
                                        <Loading />
                                    </td>
                                </tr>
                                :
                                ( Array.isArray ( vecAreas ) && vecAreas.length > 0 ) ?
                                vecAreas.map ( ( a , i ) => {
                                    return ( <Area actualizaListaAreas = { actualizaListaAreas }  modo = { areaSeleccionada === a ? modo : 'normal' } area = { a } key = { i } cambiaModo = { cambiaModo } /> )
                                } )
                                :
                                <tr>
                                    <td colSpan = { 4 } >
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

export default ListaAreas