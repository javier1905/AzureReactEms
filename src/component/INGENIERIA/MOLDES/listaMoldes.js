import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FromAltaMolde from './formAltaMolde'
import noFound from '../../../Imagenes/noFound.png'
import Molde from './molde'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaMoldes = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecMoldes , setVecMoldes] = useState ( [  ] )
    const [vecPiezas , setVecPiezas] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [moldeSeleccionado , setMoldeSeleccionado] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecMoldes = await Servicios.listaMoldes (  )
            const vecPie = await Servicios.listPiezas (  )
            if ( vecMoldes ) {
                setLoading ( false )
                setVecMoldes ( vecMoldes )
            }
            if ( vecPie ) {
                setVecPiezas ( vecPie )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , molde ) => {
        setModo ( modo )
        setMoldeSeleccionado ( molde )
        var formAltaMolde = $( '#formAltaMolde' )
        formAltaMolde.slideUp (  )
    }
    const actualizaListaMoldes = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaMolde = $( '#formAltaMolde' )
        formAltaMolde.slideToggle ( )
        setModo ( 'normal' )
        setMoldeSeleccionado ( undefined )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Lista de Moldes</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add molde' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaMolde' style = { { display : 'none' } }>
                    <FromAltaMolde methodAdd = { methodAdd } actualizaListaMoldes = { actualizaListaMoldes } vecPiezas = { vecPiezas } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Molde</th>
                                <th>Pieza</th>
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
                                ( Array.isArray ( vecMoldes ) && vecMoldes.length > 0 ) ?
                                vecMoldes.map ( ( m , i ) => {
                                    return ( <Molde vecPiezas = { vecPiezas } actualizaListaMoldes = { actualizaListaMoldes } vecMoldes = { vecMoldes } modo = { moldeSeleccionado === m ? modo : 'normal' } molde = { m } key = { i } cambiaModo = { cambiaModo } /> )
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

export default ListaMoldes