import React ,{ useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'
import FormAltaTipoMaquina from './formAltaTipoMaquina'
import noFound from '../../../Imagenes/noFound.png'
import TipoMaquina from './tipoMaquina'
import Loading from '@material-ui/core/CircularProgress'
import { SnackbarProvider } from 'notistack'
import $ from 'jquery'

const ListaTiposMaquina = ( props ) => {
    const [loading , setLoading] = useState ( true )
    const [vecTiposMaquina , setVecTiposMaquina] = useState ( [  ] )
    const [vecOperaciones , setVecOperaciones] = useState ( [  ] )
    const [modo , setModo] = useState ( 'normal' )
    const [tipoMaquinaSeleccionada , setTipoMaquinaSeleccionada] = useState ( true )
    const [limpiaCampos , setLimpiaCampos] = useState ( true )
    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecTipoMaq = await Servicios.listaTiposMaquina (  )
            const vecOper = await Servicios.listaOperaciones (  )
            if ( vecOper ) {
                setVecOperaciones ( vecOper )
            }
            if ( vecTipoMaq ) {
                setLoading ( false )
                setVecTiposMaquina ( vecTipoMaq )
            }
        }
        getServicios (  )
    } , [ loading ] )
    const cambiaModo = ( modo , tipoMaquina ) => {
        setModo ( modo )
        setTipoMaquinaSeleccionada ( tipoMaquina )
        var formAltaTipoMaquina= $( '#formAltaTipoMaquina' )
        formAltaTipoMaquina.slideUp (  )
    }
    const actualizaListaTiposMaquina = (  ) => {
        setLoading ( true )
    }
    const methodAdd = (  ) => {
        var formAltaTipoMaquina = $( '#formAltaTipoMaquina' )
        formAltaTipoMaquina.slideToggle ( )
        setModo ( 'normal' )
        setTipoMaquinaSeleccionada ( undefined )
        setLimpiaCampos(!limpiaCampos)
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h4'>Lista de Tipos de Maquina</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 40 } texto = 'Add tipo de maquina' onClick = { e => methodAdd (  ) } />
                </div>
                <div id = 'formAltaTipoMaquina' style = { { display : 'none' } }>
                    <FormAltaTipoMaquina limpiaCampos = {limpiaCampos} methodAdd = { methodAdd } actualizaListaTiposMaquina = { actualizaListaTiposMaquina } vecOperaciones = { vecOperaciones } />
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
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
                                ( Array.isArray ( vecTiposMaquina ) && vecTiposMaquina.length > 0 ) ?
                                vecTiposMaquina.map ( ( tm , i ) => {
                                    return ( <TipoMaquina actualizaListaTiposMaquina = { actualizaListaTiposMaquina }  modo = { tipoMaquinaSeleccionada === tm ? modo : 'normal' } tipoMaquina = { tm } key = { i } cambiaModo = { cambiaModo } vecOperaciones = { vecOperaciones } /> )
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

export default ListaTiposMaquina