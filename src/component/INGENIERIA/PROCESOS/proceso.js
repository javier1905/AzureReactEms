import React, { useState, useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import FormProceso from './formAltaProceso'
import servicios from '../servicesIngenieria'
import { withSnackbar } from 'notistack'

const Proceso1 = ( props ) => {
    const [idProceso , setIdProceso] = useState ( '' )
    const [descipcionProceso , setDescipcionProceso] = useState ( '' )
    const [nombrePieza , setNombrePieza] = useState ( '' )
    const [nombreMaquina , setNombreMaquina] = useState ( '' )
    const [nombreTipoProceso , setNombreTipoProceso] = useState ( '' )
    const [open , setOpen] = useState ( false )
    useEffect ( (  ) => {
        setIdProceso ( props.proceso.idProceso )
        setDescipcionProceso ( props.proceso.descipcionProceso )
        setNombrePieza ( props.proceso.nombrePieza )
        setNombreMaquina ( props.proceso.nombreMaquina )
        setNombreTipoProceso ( props.proceso.nombreTipoProceso )
    } , [ props ] )
    const handleClose = (  ) => {  setOpen ( false ) }
    const deletePoceso = (  ) => {
        const deletPro = async (  ) => {
            var result = await servicios.deleteProceso ( parseInt ( idProceso ) )
            if ( result ) {
                props.enqueueSnackbar( result ,
                    {
                        variant: 'success',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                    props.actualizaModo ( 'normal' ,  undefined )
                props.actualizaLista (  )
            }
        }
        deletPro (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idProceso}</td>
            <td>{descipcionProceso}</td>
            <td>{nombrePieza}</td>
            <td>{nombreMaquina}</td>
            <td>{nombreTipoProceso}</td>
            <td>
                <>
                    <MyComponent.botonUpdate texto = 'Update proceso' onClick = { e => setOpen ( true ) }/>
                    <FormProceso listasCombos = { props.listasCombos } actualizaLista = { props.actualizaLista } proceso = { props.proceso } handleClose = { handleClose } open = { open } />
                </>
            </td>
            <td><MyComponent.botonDelete texto = 'Delete proceso'  onClick = { e => props.actualizaModo ( 'delete' ,  props.proceso) } /></td>
        </tr>
        :
        <tr>
            <td colSpan = { 7 }>
                    ¿ Esta seguro de eliminar a  { descipcionProceso }  ?
                    <MyComponent.botonAcept texto =  'Delete procesos' onClick = { e => deletePoceso (  ) } />
                    <MyComponent.botonCancel texto =  'Cancel delete' onClick = { e => props.actualizaModo ( 'normal' ,  props.proceso ) }/>
            </td>
        </tr>
    )
}

export default withSnackbar ( Proceso1 )