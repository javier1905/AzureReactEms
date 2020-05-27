import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FormAltaPuesto from './formAltaPuesto'
import noFound from '../../../Imagenes/noFound.png'
import Puesto from './puesto'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaPuestos = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecPuestos , setVecPuestos] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [puestoSeleccionado , setPuestoSeleccionado] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecPue= await Servicios.listaPuestos (  )
            if ( vecPue ) {
                setLoading ( false )
                setVecPuestos ( vecPue )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , puesto ) => {
        setModo ( modo )
        setPuestoSeleccionado ( puesto )
        var formAltaPuesto= $( '#formAltaPuesto' )
        formAltaPuesto.slideUp (  )
    }
    const actualizaListaPuestos = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaPuesto = $( '#formAltaPuesto' )
        formAltaPuesto.slideToggle ( )
        setModo ( 'normal' )
        setPuestoSeleccionado ( undefined )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Lista de Puestos</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add area' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaPuesto' style = { { display : 'none' } }>
                    <FormAltaPuesto methodAdd = { methodAdd } actualizaListaPuestos = { actualizaListaPuestos } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Puesto</th>
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
                                ( Array.isArray ( vecPuestos ) && vecPuestos.length > 0 ) ?
                                vecPuestos.map ( ( p , i ) => {
                                    return ( <Puesto actualizaListaPuestos = { actualizaListaPuestos }  modo = { puestoSeleccionado === p ? modo : 'normal' } puesto = { p } key = { i } cambiaModo = { cambiaModo } /> )
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

export default ListaPuestos