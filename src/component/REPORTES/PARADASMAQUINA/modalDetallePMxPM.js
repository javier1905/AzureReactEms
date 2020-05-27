import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
// import DialogTitle from '@material-ui/core/DialogTitle'
import Loading from '@material-ui/core/CircularProgress'
import {Table} from 'react-bootstrap'
import DialogContent from '@material-ui/core/DialogContent'
import Moment from 'moment'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

const ModalDetallePMxPM = (props) => {
    const [vecDetalleXpm,setVecDetalleXpm] = useState([])
    const [loading,setLoading] = useState(props.loadingModalDetallexpm)
    useEffect (()=> {
        setLoading(props.loadingModalDetallexpm)
        setVecDetalleXpm(props.vecDetalleXpm)
    },[props])
    const useStyles = makeStyles ( ( theme ) => ( {
        appBar: {
        position: 'relative',
        },
        title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        }
    }))
    const classes = useStyles ( )
    return (
        <Dialog
            open = {props.openDetalleXpm}
            onClose = {props.closeDetalleXpm}
            fullScreen = {true}
            // maxWidth ='lg'
        >
            <AppBar className = { classes.appBar } >
                <Toolbar>
                    <Typography variant="h4" className = { classes.title } >
                        {`${props.pmSeleccionada}
                        desde ${Moment(props.fechaDesdeFundicion2).format('DD/MM/YYYY')}
                        hasta ${Moment(props.fechaHastaFundicion2).format('DD/MM/YYYY')} ` }
                    </Typography>
                    <IconButton  edge="start" color="inherit" onClick = {  e => props.closeDetalleXpm() } aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div>
                <DialogContent>
                    <Table responsive={true}>
                        <thead>
                            <tr>
                                <th>Fecha Fundicion</th>
                                <th>Maquina</th>
                                <th>Area</th>
                                <th>Hora Inicio</th>
                                <th>Hora Fin</th>
                                <th>Duracion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                <tr>
                                    <td colSpan ={6}><Loading/></td>
                                </tr>
                                :
                                Array.isArray(vecDetalleXpm) && vecDetalleXpm.length > 0   ?
                                vecDetalleXpm.map((pm,i)=>{
                                        return( <tr key={i}>
                                                <td>{Moment(pm.fechaFundicion).utc().hour(3).format('DD/MM/YYYY')}</td>
                                                <td>{pm.nombreMaquina}</td>
                                                <td>{pm.nombreArea}</td>
                                                <td>{Moment(pm.horaInicio).format('HH:mm')}</td>
                                                <td>{Moment(pm.horaFin).format('HH:mm')}</td>
                                                <td>{`${pm.duracion} min`}</td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr>
                                    <td colSpan ={6}>
                                        nofound
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </DialogContent>
            </div>
        </Dialog>
    )
}
export default ModalDetallePMxPM