import React , { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import FormAltaPiezas from './formAltaPieza'
import { SnackbarProvider } from 'notistack'
import { Table } from 'react-bootstrap'
import Pieza from './pieza'
import CircularProgress from '@material-ui/core/CircularProgress'
import noFound from '../../../Imagenes/noFound.png'
import Servicios from '../servicesIngenieria'
import MyComponent from '../../AAprimary/misComponentes'
import $ from 'jquery'

const ListaPiezas = ( props ) => {
    const [loadingVpiezas , setLoadingVpiezas] = useState ( true )
    const [vecPiezas , setVecPiezas] = useState ( [  ] )
    const [vecClientes , setVecClientes ] = useState ( [ ] )
    const [vecTiposMaterial , setVecTiposMaterial ] = useState ( [ ] )
    const [ pieza , setPieza] = useState ( undefined )
    const [ mode , setMode] = useState ( undefined )
    const [  limpiaFormAlta, setLimpiaFormAlta] = useState ( true )

    const actualizaVecPiezas = (  ) => {
        setLoadingVpiezas ( true )
    }
    const actualizaModo = ( modo , pieza ) => {
        const formAltaPiezaa = $('#formAltaPi')
        formAltaPiezaa.slideUp()
        setMode ( modo )
        setPieza ( pieza )
    }
    useEffect ( (  ) => {
        const getListPiezas = async (  ) => {
            const response = await Servicios.listPiezas (  )
            if ( response ) {
                setVecPiezas ( response )
                setLoadingVpiezas ( false )
            }
        }
        const vecC = async (  ) => {
            const responseCli  = await Servicios.listaClientes (  )
            const responseTmat  = await Servicios.listaTtiposMaterial (  )
            if ( responseCli )  { setVecClientes ( responseCli ) }
            if ( responseTmat ) { setVecTiposMaterial ( responseTmat ) }
        }
        vecC (   )
        getListPiezas (  )
    } ,  [ loadingVpiezas  ])
    const addPieza  = (  ) => {
        setMode ( undefined )
        setPieza ( undefined )
        setLimpiaFormAlta(!limpiaFormAlta)
        const formAltaPiezaa = $('#formAltaPi')
        formAltaPiezaa.slideToggle()
    }
    return (
        <div>
            <Typography variant = 'h4'>Listado Piezas</Typography>
            <MyComponent.botonAdd texto = 'Add Pieza' onClick = { addPieza } fontSize = 'large' size = { 60  } />
            <div className = 'altaPiezas'>
                <div style = { { display : 'none' } } id = 'formAltaPi' >
                    <SnackbarProvider maxSnack = { 3 } >
                        <FormAltaPiezas
                            addPieza = { addPieza }
                            actualizaVecPiezas = { actualizaVecPiezas }
                            vecTiposMaterial = {vecTiposMaterial}
                            vecClientes = {vecClientes}
                            limpiaFormAlta = {limpiaFormAlta}
                        />
                    </SnackbarProvider>
                </div>
                <div id = 'listadoPiezas'>
                    <SnackbarProvider  maxSnack = { 3 } >
                        <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Cliente</th>
                                    <th>TipoMaterial</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loadingVpiezas === true ?
                                        <tr style = { { width : '100%' , marginLeft : 'auto' , marginRight : 'auto ' , padding : 30} } >
                                            <td colSpan = { 6 }  >
                                                <CircularProgress  />
                                                </td>
                                        </tr>
                                        :
                                        Array.isArray ( vecPiezas  ) && vecPiezas.length > 0 ?
                                        vecPiezas.map ( ( p , i ) => {
                                            return (<Pieza modo = { pieza === p && mode !== undefined ? mode : 'normal' } actualizaModo = { actualizaModo }   actualizaVecPiezas = { actualizaVecPiezas }  vecTiposMaterial =  { vecTiposMaterial }  vecClientes = { vecClientes } key = { i }  pieza = { p } vecPiezas = { vecPiezas }/>)
                                        } )
                                            :
                                            <tr >
                                                <td colSpan = { 6 }  >
                                                    <img style = { { width : '100%' , padding : 30 } } src = { noFound } alt = 'No foung ' ></img>
                                                </td>
                                            </tr>
                                }
                            </tbody>
                        </Table>
                    </SnackbarProvider>
                </div>
            </div>

        </div>
    )
}
export default ListaPiezas