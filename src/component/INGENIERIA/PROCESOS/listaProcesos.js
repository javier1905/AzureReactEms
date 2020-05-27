import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Loading from '@material-ui/core/CircularProgress'
import noFound from '../../../Imagenes/noFound.png'
import Proceso from './proceso'
import Servicios from '../servicesIngenieria'
import { SnackbarProvider } from 'notistack'
import FormProceso from './formAltaProceso'

const ListaProcesos= (  ) => {
    const [vecProcesos,setVecProcesos] = useState ( [  ] )
    const [loading,setLoading] = useState ( true )
    const [open , setOpen] = useState ( false )
    const [modo , setModo] = useState ( 'normal' )
    const [procesosSeleccionado , setProcesoSeleccionado] = useState ( undefined )
    const [vecTipoPro,setVecTipoPro] = useState ( [ ] )
    const [vecMaq,setVecMaq] = useState ( [ ] )
    const [vecPie,setVecPie] = useState ( [ ] )

    useEffect ( (  ) => {
        const getListaProcesos = async (  ) => {
            const vecPro = await Servicios.listaProcesos (  )
            if ( vecPro ) {
                setVecProcesos ( vecPro )
                setLoading ( false )
            }
        }
        getListaProcesos (  )
        const getCombos = async () => {
            const resTipoPro = await Servicios.listaTiposProceso (  )
            const resMaq = await Servicios.listaMaquinas (  )
            const resPie = await Servicios.listPiezas (  )
            if(resTipoPro) {
                setVecTipoPro(resTipoPro)
            }
            if(resMaq) {
                setVecMaq(resMaq)
            }
            if(resPie) {
                setVecPie(resPie)
            }
        }
        getCombos()
    } , [ loading ] )
    const actualizaLista = (  ) => {
        setLoading ( true )
    }
    const handleClose = (  ) => {  setOpen ( false ) }
    const actualizaModo = ( modo , pro ) => {
        setProcesoSeleccionado ( pro )
        setModo ( modo )
    }
    return (
        <div>
            <SnackbarProvider maxSnack = { 3 } >
                <Typography variant = 'h1'>Listado Procesos</Typography>
                <div>
                    <MyComponent.botonAdd fontSize = 'large' size = { 60 } texto = 'Add proceso'  onClick = { e => setOpen ( true ) } />
                    <FormProceso actualizaLista =  { actualizaLista } proceso = { undefined } handleClose = { handleClose } open = { open } />
                </div>
                <div id = 'containerTablaProcesos'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Descripcion</th>
                                <th>Pieza</th>
                                <th>Maquina</th>
                                <th>Tipo</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                <tr>
                                    <td colSpan = { 7 }>
                                        <div>
                                            <Loading/>
                                        </div>
                                    </td>
                                </tr>
                                :
                                Array.isArray ( vecProcesos ) && vecProcesos.length > 0 ?
                                    vecProcesos.map ( ( p , i ) => {
                                        return (<Proceso
                                                        listasCombos = { {listaTiposProceso : vecTipoPro , listaMaquinas : vecMaq , listaPiezas : vecPie}}
                                                        actualizaModo = { actualizaModo }
                                                        modo = { p === procesosSeleccionado ? modo : 'normal' }
                                                        actualizaLista = { actualizaLista } proceso = { p }  key = { i }
                                                    />)
                                    } )
                                    :
                                    <tr>
                                        <td colSpan = { 7 }>
                                            <div>
                                                <img src = { noFound } alt = 'img no found '></img>
                                            </div>
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

export default ListaProcesos