import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FromAltaOperacion from './formAltaOperacion'
import noFound from '../../../Imagenes/noFound.png'
import Operacion from './operacion'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaOperaciones = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecOperaciones , setVecOperaciones] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [operacionSeleccionada , setOperacionSeleccionada] = useState ( true )
    const [limpiaCampos , setLimpiaCampos] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecOpera = await Servicios.listaOperaciones (  )
            if ( vecOpera ) {
                setLoading ( false )
                setVecOperaciones ( vecOpera )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , operacion ) => {
        setModo ( modo )
        setOperacionSeleccionada ( operacion )
        var formAltaOperacion = $( '#formAltaOperacion' )
        formAltaOperacion.slideUp (  )
    }
    const actualizaListaOperaciones = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaOperacion = $( '#formAltaOperacion' )
        formAltaOperacion.slideToggle ( )
        setModo ( 'normal' )
        setOperacionSeleccionada ( undefined )
        setLimpiaCampos(!limpiaCampos)
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h4'>Lista de Operaciones</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add defect' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaOperacion' style = { { display : 'none' } }>
                    <FromAltaOperacion limpiaCampos ={limpiaCampos} methodAdd = { methodAdd } actualizaListaOperaciones = { actualizaListaOperaciones } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Operacion</th>
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
                                ( Array.isArray ( vecOperaciones ) && vecOperaciones.length > 0 ) ?
                                vecOperaciones.map ( ( o , i ) => {
                                    return ( <Operacion actualizaListaOperaciones = { actualizaListaOperaciones }  modo = { operacionSeleccionada === o ? modo : 'normal' } operacion = { o } key = { i } cambiaModo = { cambiaModo } /> )
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

export default ListaOperaciones