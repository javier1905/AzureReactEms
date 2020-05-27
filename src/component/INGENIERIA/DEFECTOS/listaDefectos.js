import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FromAltaDefecto from './formAltaDefecto'
import noFound from '../../../Imagenes/noFound.png'
import Defecto from './defecto'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaDefectos = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecDefectos , setVecDefectos] = useState ( [  ] )
    const [vecOperaciones , setVecOperaciones] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [defectoSeleccionado , setDefectoSeleccionado] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecDefect = await Servicios.listaDefectos (  )
            const vecOpera = await Servicios.listaOperaciones (  )
            if ( vecDefect ) {
                setLoading ( false )
                setVecDefectos ( vecDefect )
            }
            if ( vecOpera ) {
                setVecOperaciones ( vecOpera )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , defecto ) => {
        setModo ( modo )
        setDefectoSeleccionado ( defecto )
        var formAltaDefecto = $( '#formAltaDefecto' )
        formAltaDefecto.slideUp (  )
    }
    const actualizaListaDefectos = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaDefecto = $( '#formAltaDefecto' )
        formAltaDefecto.slideToggle ( )
        setModo ( 'normal' )
        setDefectoSeleccionado ( undefined )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Lista de Defectos</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add defect' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaDefecto' style = { { display : 'none' } }>
                    <FromAltaDefecto methodAdd = { methodAdd } actualizaListaDefectos = { actualizaListaDefectos } vecOperaciones = { vecOperaciones } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Defecto</th>
                                <th>Operacion</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                <tr>
                                    <td colSpan = { 5 } >
                                        <Loading />
                                    </td>
                                </tr>
                                :
                                ( Array.isArray ( vecDefectos ) && vecDefectos.length > 0 ) ?
                                vecDefectos.map ( ( d , i ) => {
                                    return ( <Defecto actualizaListaDefectos = { actualizaListaDefectos } vecOperaciones = { vecOperaciones } modo = { defectoSeleccionado === d ? modo : 'normal' } defecto = { d } key = { i } cambiaModo = { cambiaModo } /> )
                                } )
                                :
                                <tr>
                                    <td colSpan = { 5 } >
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

export default ListaDefectos