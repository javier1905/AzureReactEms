import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FromAltaTrabajador from './formAltaTrabajador'
import noFound from '../../../Imagenes/noFound.png'
import Trabajador from './trabajador'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaTrabajadores = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecTrabajadores , setVecTrabajadores] = useState ( [  ] )
    const [vecPuestos , setVecPuestos] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [trabajadorSeleccionado , setTrabajadorSeleccionado] = useState ( true )

    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecTra = await Servicios.listaTrabajadores (  )
            const vecPue = await Servicios.listaPuestos (  )
            if ( vecTra ) {
                setLoading ( false )
                setVecTrabajadores ( vecTra )
            }
            if ( vecPue ) {
                setVecPuestos ( vecPue )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , trabajador ) => {
        setModo ( modo )
        setTrabajadorSeleccionado ( trabajador )
        var formAltaTrabajador = $( '#formAltaTrabajador' )
        formAltaTrabajador.slideUp (  )
    }
    const actualizaListaTrabajadores = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaTrabajador = $( '#formAltaTrabajador' )
        formAltaTrabajador.slideToggle ( )
        setModo ( 'normal' )
        setTrabajadorSeleccionado ( undefined )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Lista de Trabajadores</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add trabajador' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaTrabajador' style = { { display : 'none' } }>
                    <FromAltaTrabajador methodAdd = { methodAdd } actualizaListaTrabajadores = { actualizaListaTrabajadores }  vecPuestos = { vecPuestos } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Nacimiento</th>
                                <th>Ingreso</th>
                                <th>Puesto</th>
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
                                ( Array.isArray ( vecTrabajadores ) && vecTrabajadores.length > 0 ) ?
                                vecTrabajadores.map ( ( t , i ) => {
                                    return ( <Trabajador vecPuestos = { vecPuestos }  actualizaListaTrabajadores = { actualizaListaTrabajadores }  modo = { trabajadorSeleccionado === t ? modo : 'normal' } trabajador = { t } key = { i } cambiaModo = { cambiaModo } /> )
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

export default ListaTrabajadores