import React ,{ useState } from 'react'
import Moment from 'moment'
import { withSnackbar } from 'notistack'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateIcon from '@material-ui/icons/Update'
import CancelIcon from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'
import { useDispatch } from 'react-redux'
import findPlanillaUpdate from '../../../Redux/Actions/findPlanillaUpdate'
import MyComponent from '../../AAprimary/misComponentes'

const PlanillaProduccion = ( props ) => {
    const [ modeDelete , setModeDelete ] = useState ( false )
    const dispatch = useDispatch (  )
    const deletePlanillaProduccion = ( idPlanilla ) => {
        const deletePlaPro = (  ) => {
            fetch ( `${process.env.REACT_APP_URL_API}/api/planillasProduccion/delete`  , {
                method : 'POST' ,
                body : JSON.stringify ( { idPlanilla } ) ,
                headers : new Headers ({
                    'Accept' : 'Application/json' ,
                    'Content-Type' : 'Application/json' ,
                    authorization : `Bearer ${window.sessionStorage.getItem('token')}`
                })
            })
            .then ( dato => { return dato.json (  ) } )
            .then ( json => {
                props.enqueueSnackbar (`${json.mensaje}`,
                    {
                        variant: 'success',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                    props.actualizaListaPlanillas (  )
                    setModeDelete( false )
            } )
            .catch ( e => {
                props.enqueueSnackbar(`${e.mensaje}`,
                    {
                        variant: 'error',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
            } )
        }
        deletePlaPro (  )
    }
    const calculaProduccion = (  ) => {
        var totalRechazo = 0
        var totalScrap = 0
        var totalProduccion = 0
        props.planilla.vecOperarios.forEach( op => {
            totalProduccion += parseInt ( op.produccion )
            op.vecRechazo.forEach ( re => {
                if( re.tipo ) {
                    totalScrap += parseInt ( re.cantidadRechazo )
                }
                else {
                    totalRechazo += parseInt ( re.cantidadRechazo )
                }
            })
        })
        return { totalProduccion , totalRechazo , totalScrap }
    }
    return (
        <tr style = { { padding : 20 , cursor : 'pointer' , background : props.fondo } } onClick = { e => { props.filtraPlanilla ( props.planilla.idPlanilla ) } } >
            {
                ! modeDelete ?
                    <>
                        <td> {`${ new Moment ( props.planilla.fechaFundicion ).add ( 1 , 'd' ).format( "DD/MM/YYYY") }`} </td>
                        <td> {`${ new Moment ( props.planilla.fechaProduccion ).add ( 1 , 'd' ).format( "DD/MM/YYYY") }`} </td>
                        <td> { props.planilla.nombreMaquina } </td>
                        <td> { props.planilla.nombrePieza  } </td>
                        <td> { props.planilla.nombreMolde } </td>
                        <td> { calculaProduccion(  ).totalProduccion } </td>
                        <td> { calculaProduccion(  ).totalRechazo } </td>
                        <td> { calculaProduccion(  ).totalScrap } </td>
                        <td>
                        <Tooltip title="Update">
                            <IconButton id = { `btn_update ${props.planilla.idPlanilla}` } style ={ { padding : 0 , margin : 0 } } onClick={ e => { dispatch ( findPlanillaUpdate ( props.planilla ) ) ; props.showModalUpdate (  ) } } aria-label="update" >
                                <UpdateIcon />
                            </IconButton>
                        </Tooltip>
                        </td>
                        <td>
                        <Tooltip title="Delete">
                            <IconButton style ={ { padding : 0 , margin : 0 } } onClick={ e => setModeDelete( true ) } aria-label="delete" >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        </td>
                        <td><MyComponent.botonImprimir  onClick = { e => props.generatePDF (  ) } /></td>
                    </>
                    :
                    <td colSpan = { 11 }>
                        ¿ Esta seguro de eliminar esta planilla ?
                        <Tooltip title="Delete">
                            <IconButton onClick={ e => deletePlanillaProduccion( props.planilla.idPlanilla ) } aria-label="delete" >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <IconButton onClick={ e => setModeDelete ( false ) } aria-label="cancel" >
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </td>
            }
        </tr>
    )
}
export default  withSnackbar ( PlanillaProduccion )