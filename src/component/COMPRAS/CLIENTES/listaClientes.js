import React , { useState , useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Servicios from './serviceClientes'
import Cliente from './cliente'
import NoFounf from '../../../Imagenes/noFound.png'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormAltaCliente from './FormAltaCliente'
import $ from 'jquery'

const ListaClientes = ( props ) => {
    const [ busqueda , setBusqueda ] = useState ('')
    const [ vecClientes , setVecClientes ] = useState ([])
    const [ banderaVec , setBanderaVec ] = useState ( true )
    const [ loading , setLoading ] = useState (true)
    const [ modo , setModo ] = useState ('normal')
    const [ clienteSeleccionado , setClienteSeleccionado ] = useState (undefined)
    const [limpiaCampos , setLimpiaCampos] = useState(true)
    const formAltaCliente = $('#formInserCliente')
    const actualizaLista = (  ) => {
        setLoading (true)
        setBanderaVec ( false )
    }
    const actualizaListaAalta  = (  ) => {
        formAltaCliente.slideToggle()
        setLoading (true)
        setBanderaVec ( false )
    }
    useEffect ( ( ) => {
        const getListClient = async (  ) => {
            const vec =  await Servicios.listaClientes ( )
            if ( vec ) {
                setLoading ( false )
                setVecClientes ( vec )
            }
        }
        getListClient (  )
        return ( ) =>  setBanderaVec ( true )
    } , [ banderaVec ] )
    const updateSection = ( modo , cliente ) => {
        formAltaCliente.slideUp (  )
        setModo ( modo )
        setClienteSeleccionado ( cliente )
        setLimpiaCampos(!limpiaCampos)
    }
    return (
    <div style = { { padding : 20 } }>
        <Typography variant = 'h4' >ListaClientes</Typography>
        <MyComponent.botonAdd
            texto = 'Add new client'
            fontSize = 'large'
            size = { 50 }
            onClick = { ( info , e ) =>{
                const formAltaCliente = $('#formInserCliente')
                formAltaCliente.slideToggle ( )
                setModo ( 'normal' )
                setClienteSeleccionado ( undefined )
                setLimpiaCampos(!limpiaCampos)
            } }
        />
        <div id = 'formInserCliente' style = { { display : 'none'  } }>
            <FormAltaCliente actualizaListaAalta = { actualizaListaAalta } limpiaCampos={limpiaCampos}/>
        </div>
        <div>
            <MyComponent.texto
                width = '100%'
                label ='buscar'
                value = { busqueda }
                onChange = { e => { setBusqueda ( e.target.value ) }}
            />
        </div>
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Razon Social</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading === true ?
                        <tr><td colSpan = { 5 }><CircularProgress style = { { marginTop : 30 } }/></td></tr>
                        :
                        ( banderaVec === true && Array.isArray ( vecClientes ) && vecClientes.length > 0 ) ?
                        vecClientes.map ( ( c , i )  => {
                            return(<Cliente modo = { clienteSeleccionado === c ? modo : 'normal' }  updateSection = { updateSection }  actualizaLista = { actualizaLista } cliente = { c }  key = { i } /> ) } )
                        :
                        <tr><td colSpan = { 5 }><img alt = 'No Found' src = { NoFounf }></img></td></tr>
                    }
                </tbody>
            </Table>
        </div>
    </div>)
}

export default ListaClientes