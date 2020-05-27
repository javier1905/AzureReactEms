import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FormAltaPlanta from './formAltaPlanta'
import noFound from '../../../Imagenes/noFound.png'
import Planta from './planta'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaPlantas = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecPlantas , setVecPlantas] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [plantaSeleccionada , setPlantaSeleccionada] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecPla= await Servicios.listaPlantas (  )
            if ( vecPla ) {
                setLoading ( false )
                setVecPlantas ( vecPla )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , planta ) => {
        setModo ( modo )
        setPlantaSeleccionada ( planta )
        var formAltaPlanta= $( '#formAltaPlanta' )
        formAltaPlanta.slideUp (  )
    }
    const actualizaListaPlantas = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaPlanta = $( '#formAltaPlanta' )
        formAltaPlanta.slideToggle ( )
        setModo ( 'normal' )
        setPlantaSeleccionada ( undefined )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Lista de Plantas</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add planta' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaPlanta' style = { { display : 'none' } }>
                    <FormAltaPlanta methodAdd = { methodAdd } actualizaListaPlantas = { actualizaListaPlantas } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Barrio</th>
                                <th>CP</th>
                                <th>Calle</th>
                                <th>Altura</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                <tr>
                                    <td colSpan = { 8 } >
                                        <Loading />
                                    </td>
                                </tr>
                                :
                                ( Array.isArray ( vecPlantas ) && vecPlantas.length > 0 ) ?
                                vecPlantas.map ( ( p , i ) => {
                                    return ( <Planta actualizaListaPlantas = { actualizaListaPlantas }  modo = { plantaSeleccionada === p ? modo : 'normal' } planta = { p } key = { i } cambiaModo = { cambiaModo } /> )
                                } )
                                :
                                <tr>
                                    <td colSpan = { 8 } >
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

export default ListaPlantas