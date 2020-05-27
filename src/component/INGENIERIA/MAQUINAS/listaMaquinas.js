import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FromAltaMaquina from './formAltaMaquina'
import noFound from '../../../Imagenes/noFound.png'
import Maquina from './maquina'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaMaquinas = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecMaquinas , setVecMaquinas] = useState ( [  ] )
    const [vecTiposMaquina , setVecTiposMaquina] = useState ( [  ] )
    const [vecPlantas , setVecPlantas] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [maquinaSeleccionada , setMaquinaSeleccionada] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecMaq = await Servicios.listaMaquinas (  )
            const vecTipoMaq = await Servicios.listaTiposMaquina (  )
            const vecPlan = await Servicios.listaPlantas (  )
            if ( vecMaq ) {
                setLoading ( false )
                setVecMaquinas ( vecMaq )
            }
            if ( vecTipoMaq ) {
                setVecTiposMaquina ( vecTipoMaq )
            }
            if ( vecPlan ) {
                setVecPlantas ( vecPlan )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , maquina ) => {
        setModo ( modo )
        setMaquinaSeleccionada ( maquina )
        var formAltaMaquina = $( '#formAltaMaquina' )
        formAltaMaquina.slideUp (  )
    }
    const actualizaListaMaquinas = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaMaquina = $( '#formAltaMaquina' )
        formAltaMaquina.slideToggle ( )
        setModo ( 'normal' )
        setMaquinaSeleccionada ( undefined )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Lista de Maquinas</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add molde' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaMaquina' style = { { display : 'none' } }>
                    <FromAltaMaquina methodAdd = { methodAdd } actualizaListaMaquinas = { actualizaListaMaquinas } vecTiposMaquina = { vecTiposMaquina } vecPlantas = { vecPlantas } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Maquina</th>
                                <th>Descripcion</th>
                                <th>Tipo</th>
                                <th>Planta</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                <tr>
                                    <td colSpan = { 7 } >
                                        <Loading />
                                    </td>
                                </tr>
                                :
                                ( Array.isArray ( vecMaquinas ) && vecMaquinas.length > 0 ) ?
                                vecMaquinas.map ( ( m , i ) => {
                                    return ( <Maquina vecTiposMaquina = { vecTiposMaquina } vecPlantas = { vecPlantas } actualizaListaMaquinas = { actualizaListaMaquinas }  modo = { maquinaSeleccionada === m ? modo : 'normal' } maquina = { m } key = { i } cambiaModo = { cambiaModo } /> )
                                } )
                                :
                                <tr>
                                    <td colSpan = { 7 } >
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

export default ListaMaquinas