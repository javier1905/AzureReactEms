import React , { useEffect , useState } from 'react'
import { useDispatch } from 'react-redux'
import PlanillaProduccion from './planillaProduccion'
import Moment from 'moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Table } from 'react-bootstrap'
import ModalAltaPlanilla from './modalALTAPLANILLA'
import AddlIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import imgNofound from '../../../Imagenes/noFound.png'
import Servicios from './serviceLista'
import estilos from './styleLista'
import findPlanillaUpdate from '../../../Redux/Actions/findPlanillaUpdate'
import jsPDF from 'jspdf'
import $ from 'jquery'
import 'jspdf-autotable'
import FilterListIcon from '@material-ui/icons/FilterList'
import Loading from '@material-ui/core/CircularProgress'

const ListaPlanilasProduccion = ( props ) => {
    var classes = estilos (  )
    const dispatch = useDispatch (  )
    const [ vecPlanillasProduccion , setVecPlanillasProduccion ] = useState ( [  ] )
    const [ vecOperaciones , setVecOperaciones ] = useState ( [  ] )
    const [ vecMaquinas , setVecMaquinas ] = useState ( [  ] )
    const [ vecPiezas , setVecPiezas ] = useState ( [  ] )
    const [ vecMoldes , setVecMoldes ] = useState ( [  ] )
    const [ vecTiposProceso , setVecTiposProceso ] = useState ( [  ] )
    const [ fechaDesdeProduccion , setFechaDesdeProduccion] = useState ( new Moment (  ).add ( -1 , 'month' ) )
    const [ fechaHastaProduccion , setFechaHastaProduccion] = useState ( new Date(  ) )
    const [ fechaDesdeFundicion , setFechaDesdeFundicion] = useState ( new Moment (  ).add ( -1 , 'month' ) )
    const [ fechaHastaFundicon , setFechaHastaFundicon] = useState ( new Date(  ) )
    const [ planillaSeleccionada , setPlanillaSeleccionada] = useState ( null )
    const [ show , setShow] = useState ( false )
    const [ showUpdate , setShowUpdate] = useState ( false )
    const [ idMaquina , setIdMaquina] = useState ( '' )
    const [ idPieza , setIdPieza] = useState ( '' )
    const [ idMolde , setIdMolde] = useState ( '' )
    const [ idTipoProceso , setIdTipoProceso] = useState ( '' )
    const [ idOperacion , setIdOperacion] = useState ( '' )
    const [ loading , setLoading] = useState ( true )
    useEffect ( (  ) => {
        setLoading(true)
        const planillasProduccion = async ( ) => {
            const planillaPro = await Servicios.planillasProduccion ( fechaDesdeProduccion , fechaHastaProduccion , fechaDesdeFundicion , fechaHastaFundicon ,
                idMaquina , idPieza ,  idMolde , idTipoProceso , idOperacion )
                if(planillaPro) {
                    setLoading(false)
                    setVecPlanillasProduccion ( planillaPro )
                }
        }
        planillasProduccion (  )
    }
        , [ fechaDesdeProduccion ,  fechaHastaProduccion , fechaDesdeFundicion , fechaHastaFundicon , idMaquina , idPieza , idMolde , idTipoProceso ,  idOperacion ]
    )
    const filtraPlanilla = id => { setPlanillaSeleccionada ( vecPlanillasProduccion.find ( pla =>  parseInt ( pla.idPlanilla ) === parseInt ( id ) ) ) }
    const  actualizaListaPlanillas = ( ) => {
        setLoading(true)
        const planillasProduccion = async ( ) => {
            const planillaPro = await Servicios.planillasProduccion ( fechaDesdeProduccion , fechaHastaProduccion , fechaDesdeFundicion , fechaHastaFundicon ,
                idMaquina , idPieza ,  idMolde , idTipoProceso , idOperacion )
                if(planillaPro) {
                    setLoading(false)
                    setVecPlanillasProduccion ( planillaPro )
                }
        }
        setPlanillaSeleccionada ( null )
        planillasProduccion (  )
        filtraPlanilla (  )
    }
    const handleClose = (  ) => {
        setLoading(true)
        actualizaListaPlanillas (  )
        setShow ( false )
    }
    const handleCloseUpdate = (  ) => {
        setLoading(true)
        dispatch ( findPlanillaUpdate ( '' ) )
        actualizaListaPlanillas (  )
        setShowUpdate ( false )
    }
    useEffect ( (  ) => {
        const op = async (  ) => {
            const o = await Servicios.operaciones(  )
            setIdOperacion ( '' )
            setVecOperaciones ( o )
        }
        op (  )
    } , [  ] )
    useEffect ( (  ) => {
        const maquinas = async (  ) => {
            var Listamaquina
            if ( idOperacion === '' ) { Listamaquina = await Servicios.maquinas (  ) }
            else { Listamaquina = await Servicios.maquinasXoperaxion ( idOperacion ) }
            setPlanillaSeleccionada ( null )
            setIdPieza ( '' )
            setIdMolde ( '' )
            setIdTipoProceso ( '' )
            setIdMaquina ( '' )
            setVecMaquinas ( Listamaquina )
        }
        maquinas (  )
    }
    , [ idOperacion ]
    )
    useEffect ( (  ) => {
        const piezas = async (  )  => {
            var ListaPiezas
            if ( idMaquina === '' ) { ListaPiezas = await Servicios.piezas (  )  }
            else { ListaPiezas = await  Servicios.piezasXmaquina ( idMaquina ) }
            setIdPieza ( '' )
            setVecPiezas ( ListaPiezas )
        }
        setPlanillaSeleccionada ( null )
        piezas (  )
    },
    [ idMaquina ]
    )
    useEffect ( (  ) => {
        const moldes = async ( ) => {
            const listaMoldes = await Servicios.moldesXpieza ( idPieza )
            if( idPieza !== '' ){ setVecMoldes ( listaMoldes ) }
        }
        setPlanillaSeleccionada ( null )
        setIdMolde ( '' )
        moldes (  )
    } ,
    [ idPieza ]
    )
    useEffect ( (  ) => {
        const tipoProceso = async (  ) => {
            var listaTipoProceso = [  ]
            if ( idPieza !== '' && idMaquina !== '') { listaTipoProceso = await Servicios.tipoProcesosXmaquinaYpieza ( idPieza , idMaquina ) }
            else { listaTipoProceso = await Servicios.tipoProcesos ( ) }
            setIdTipoProceso ( '' )
            setVecTiposProceso (  listaTipoProceso )
        }
        setPlanillaSeleccionada ( null )
        tipoProceso (  )
    },
    [ idPieza , idMaquina ]
    )
    useEffect ( (  ) => {
        setPlanillaSeleccionada ( null )
    } ,
    [ idMolde ]
    )
    const showModalUpdate = (  ) => { setShowUpdate ( true ) }

    const generatePDF = (  ) => {
        console.log (' generate pdf OK ' )
        var doc = new jsPDF ( {
            orientation: 'landscape',
            
            putOnlyUsedFonts: true ,
            // unit: 'in',
            // format: [1200, 600]
        } )
        doc.text ( 'Parte Diario' , 10 , 10 )        // // doc.autoTable( { html : '#parteDiario' } )
        
        // doc.addImage ( imgNofound , 'jpg' , 15, 40, 180, 180 )
        doc.fromHTML($('#parteDiario').get(0), 5 , 5, { autoSize: true  } )
        doc.save ( 'ParteDiario.pdf' )
    }
    return (
        <div>
            <ModalAltaPlanilla  show = { show } handleClose = { handleClose } />
            <ModalAltaPlanilla  show = { showUpdate } handleClose = { handleCloseUpdate } />
            <div>
                <div>
                    <h2>Listado Planilla Produccion</h2>
                    <div  style = { { paddingTop : 10 , width : '100%' } } >
                        <FilterListIcon style = { { float : 'right'  } } />
                    </div>
                    <div style = { { height : 40 } } ></div>
                    <MuiPickersUtilsProvider utils = { DateFnsUtils } className={classes.formControl } >
                        <KeyboardDatePicker
                            style= { { marginRight : '10px' , width : '220px' } }
                            size='small'
                            variant='standard'
                            margin="none"
                            id="fechaDesdeProduccion"
                            label="fechaDesdeProduccion"
                            format="dd/MM/yyyy"
                            value={ fechaDesdeProduccion }
                            onChange={ e => { setFechaDesdeProduccion( e ) } }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                        <KeyboardDatePicker
                            style={{marginRight:'10px',width:'220px'}}
                            size='small'
                            variant='standard'
                            margin="none"
                            id="fechaHastaProduccion"
                            label="fechaHastaProduccion"
                            format="dd/MM/yyyy"
                            value={ fechaHastaProduccion }
                            onChange={ e => { setFechaHastaProduccion( e ) } }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                        <KeyboardDatePicker
                            style={{marginRight:'10px',width:'220px'}}
                            size='small'
                            variant='standard'
                            margin="none"
                            id="fechaDesdeFundicion"
                            label="fechaDesdeFundicion"
                            format="dd/MM/yyyy"
                            value={ fechaDesdeFundicion }
                            onChange={ e => { setFechaDesdeFundicion( e ) } }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                        <KeyboardDatePicker
                            style={{marginRight:'10px',width:'220px'}}
                            size='small'
                            variant='standard'
                            margin="none"
                            id="fechaHastaFundicon"
                            label="fechaHastaFundicon"
                            format="dd/MM/yyyy"
                            value={ fechaHastaFundicon }
                            onChange={ e => { setFechaHastaFundicon( e ) } }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="demo-simple-select-label">Operacion</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ idOperacion }
                            name='idOperacion'
                            onChange = { e => { setIdOperacion ( e.target.value ) } }
                        >
                            <MenuItem value = '' >None</MenuItem>
                        {
                            Array.isArray( vecOperaciones )?
                                vecOperaciones.map((ope,indiceOperacion)=>{
                                return <MenuItem  key={indiceOperacion} value={ope.idOperacion}>{ope.nombreOperacion}</MenuItem>
                                })
                                :
                                <MenuItem></MenuItem>
                        }
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="idMaquina">Maquina</InputLabel>
                        <Select
                            labelId = "IdMaquina"
                            id = "demo-simple-select"
                            value = { idMaquina  }
                            name = 'idMaquina'
                            onChange={ e => { setIdMaquina ( e.target.value ) }  }
                        >
                            <MenuItem value = '' >None</MenuItem>
                        {
                            Array.isArray( vecMaquinas )?
                                vecMaquinas.map((maq,indiceMaquina)=>{
                                    return <MenuItem key={indiceMaquina} value={maq.idMaquina}>{maq.nombreMaquina}</MenuItem>
                                })
                                :
                                <MenuItem></MenuItem>
                        }
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="idPieza">Pieza</InputLabel>
                        <Select
                            labelId="idPieza"
                            id="demo-simple-select"
                            value={ idPieza  }
                            name='idPieza'
                            onChange={ e => { setIdPieza ( e.target.value ) } }
                        >
                            <MenuItem value = '' >None</MenuItem>
                        {
                            Array.isArray(  vecPiezas )?
                            vecPiezas.map ( ( pie , indicePieza ) => {
                                return <MenuItem key={indicePieza} value={pie.idPieza}>{pie.nombrePieza}</MenuItem>
                            })
                            :
                            <MenuItem></MenuItem>
                        }
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="idMolde">Molde</InputLabel>
                        <Select
                            labelId="idMolde"
                            id="cbx_molde"
                            value={ idMolde }
                            name='idMolde'
                            onChange = { e => { setIdMolde ( e.target.value ) } }
                        >
                            <MenuItem value = '' >None</MenuItem>
                            {
                                Array.isArray (  vecMoldes ) ?
                                vecMoldes.map ( ( mol , indiceMolde ) => {
                                    return <MenuItem key={indiceMolde} value={mol.idMolde}>{mol.nombreMolde}</MenuItem>
                                })
                                :
                                <MenuItem value = '' > </MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="idTipoProceso">Tipo Proceso</InputLabel>
                        <Select
                            labelId = "idTipoProceso"
                            id = "cbx_molde"
                            value = { idTipoProceso }
                            name = 'idTipoProceso'
                            onChange = { e => { setIdTipoProceso ( e.target.value ) } }
                        >
                            <MenuItem value = '' >None</MenuItem>
                            {
                                Array.isArray ( vecTiposProceso )?
                                    vecTiposProceso.map ( ( tpro , indiceTipoProceso ) => {
                                        return <MenuItem key = { indiceTipoProceso } value = { tpro.idTipoProceso } >{ tpro.nombreTipoProceso }</MenuItem>
                                    })
                                    :
                                    <MenuItem></MenuItem>
                            }
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Tooltip title="Add">
                        <IconButton onClick={ e => setShow ( true ) } aria-label="New" >
                            <AddlIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div>
                    <div style = {{height:500,overflow:'scroll',overflowX: 'hidden' , width : '70%' , float : "left" , boxSizing : 'border-box' , padding : 10}} >
                        <Table responsive  hover>
                            <thead>
                                <tr>
                                    <th style = { { padding : 10 }}>FECHA FUNDICION</th>
                                    <th>FECHA PRODUCCION</th>
                                    <th>MAQUINA</th>
                                    <th>PIEZA</th>
                                    <th>MOLDE</th>
                                    <th>PRODUCCION</th>
                                    <th>RECHAZOS</th>
                                    <th>SCRAP</th>
                                    <th>EDITAR</th>
                                    <th>ELIMINAR</th>
                                    <th>IMPRIMIR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?
                                    <tr>
                                        <td colSpan = {11}>
                                            <Loading/>
                                        </td>
                                    </tr>
                                    :
                                    Array.isArray ( vecPlanillasProduccion ) && vecPlanillasProduccion.length !== 0 ?
                                    vecPlanillasProduccion.map ( ( planilla , indexPlanilla ) => {
                                        return < PlanillaProduccion generatePDF = { generatePDF }  fondo = {  planilla ===  planillaSeleccionada  ? '#DEDEE2' : 'white' } showModalUpdate = { showModalUpdate } actualizaListaPlanillas = { actualizaListaPlanillas }  filtraPlanilla = { filtraPlanilla }  planilla = { planilla }  key = { indexPlanilla } />
                                    } )
                                    :
                                    <tr>
                                        <td colSpan = { 11 } style={{textAlign:'center' , padding : 10 }}>
                                            <   img style = { { boxSizing : 'border-box' , padding : 30 , width : '100%' } } alt = 'Sin resultados' src  = { imgNofound }></img>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div id='parteDiario'  style = { { width : '30%' , float : "right" , background : 'white' , boxSizing : 'border-box' , padding : 10}}>
                        {
                            planillaSeleccionada ?
                                <div>
                                        <div>
                                            <Table responsive size = 'sm'>
                                                    <thead>
                                                        <tr>
                                                            <th>FECHA FUNDICION</th>
                                                            <th>FECHA PRODUCCION </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{ new Moment ( planillaSeleccionada.fechaFundicion ).add ( 1 , 'd' ).format ( "DD/MM/YYYY" ) }</td>
                                                            <td>{ new Moment ( planillaSeleccionada.fechaProduccion ).add ( 1 , 'd' ).format ( "DD/MM/YYYY" ) }</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <Table responsive size = 'sm'>
                                                    <thead>
                                                        <tr>
                                                            <th>HS INICIO</th>
                                                            <th>HS FIN </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{ planillaSeleccionada.horaInicio }</td>
                                                            <td>{ planillaSeleccionada.horaFin }</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                        </div>
                                        <div>
                                            <Table responsive size = 'sm' >
                                                <thead>
                                                    <tr>
                                                        <th>MAQUINA</th>
                                                        <th>PIEZA</th>
                                                        <th>MOLDE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{ planillaSeleccionada.nombreMaquina }</td>
                                                        <td>{ planillaSeleccionada.nombrePieza }</td>
                                                        <td>{ planillaSeleccionada.nombreMolde }</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <h6>Operarios</h6>
                                        {
                                            planillaSeleccionada.vecOperarios.map ( ( o , i ) => {
                                                return (
                                                    <div key = { i } style = { { borderTop : 'grey solid 2px' , paddingTop : '10px' } }>
                                                        <div>
                                                            <h6>{ ` ${ o.apellidoTrabajador } ${ o.nombreTrabajador }` }</h6>
                                                        </div>
                                                        <div>
                                                            <Table responsive size = 'sm'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>TURNO</th>
                                                                        <th>HS INICIO</th>
                                                                        <th>HS FIN</th>
                                                                        <th>PRODUCCION</th>
                                                                        <th>CALORIAS</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ o.turnoTrabajador }</td>
                                                                        <td>{ o.horaInicio }</td>
                                                                        <td>{ o.horaFin }</td>
                                                                        <td>{ o.produccion }</td>
                                                                        <td>{ o.calorias }</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                        <div>
                                                                    {
                                                                        o.vecRechazo.length > 0 &&
                                                                        <div style = { { borderTop : 'grey solid 1px' , paddingTop : 10} }>
                                                                            <h6>Rechazos</h6>
                                                                            {
                                                                                o.vecRechazo.map ( ( r , indexRechazo ) => {
                                                                                    return (
                                                                                        <div key = { indexRechazo } >
                                                                                            <Table responsive size = 'sm' >
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th>CAUSA</th>
                                                                                                        <th>TIPO</th>
                                                                                                        <th>CANTIDAD</th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                <tr>
                                                                                                    <td>{ r.nombreRechazo }</td>
                                                                                                    <td style = { { color : r.tipo ? 'red' : 'green' } } >{ r.tipo ? 'SCRAP' : 'RECHAZO' }</td>
                                                                                                    <td>{ r.cantidadRechazo }</td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </Table>
                                                                                        <Table responsive size = 'sm' key = { indexRechazo } >
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>ZONA</th>
                                                                                                    <th>CANTIDAD</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {
                                                                                                    r.vecZonas.map ( ( z , indexZona ) => {
                                                                                                        return (
                                                                                                            <tr key = { indexZona }>
                                                                                                                <td>{ `${ z.letra }${ z.numero }` }</td>
                                                                                                                <td>{ z.cantidad }</td>
                                                                                                            </tr>
                                                                                                        )
                                                                                                    } )
                                                                                                }
                                                                                            </tbody>
                                                                                        </Table>
                                                                                    </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    }
                                                        </div>
                                                    </div>
                                                )
                                            } )
                                        }
                                        <div style = { { borderTop : 'grey solid 3px' , paddingTop : '10px' } }>
                                            {
                                                planillaSeleccionada.vecParadasMaquinaSeleccionada.length > 0 &&
                                                <div>
                                                    <h6>Paradas de  maquina</h6>
                                                    <Table responsive size = 'sm' >
                                                        <thead>
                                                            <tr>
                                                                <th>MOTIVO</th>
                                                                <th>DESDE</th>
                                                                <th>HASTA</th>
                                                                <th>TIPO</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                planillaSeleccionada.vecParadasMaquinaSeleccionada.map ( ( pm , indexPm ) => {
                                                                    return(
                                                                                <tr key = { indexPm }>
                                                                                    <td>{ pm.nombreParadaMaquina }</td>
                                                                                    <td>{ pm.desdeParadaMaquina }</td>
                                                                                    <td>{ pm.hastaParadaMaquina }</td>
                                                                                    <td style = { { color : pm.tipoParadaMaquina ? 'red' : 'green'  } }>{ pm.tipoParadaMaquina ? 'NO PROG' : 'PROG' }</td>
                                                                                </tr>
                                                                    )
                                                                } )
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }
                                        </div>
                                </div>
                                :
                                <div><img style = { { boxSizing : 'border-box' , padding : 30 , width : '100%' } } alt = 'Sin resultados' src  = { imgNofound }></img></div>
                        }
                    </div>
                    <div style = {{clear : 'both'}}></div>
                </div>
            </div>
        </div>
    )
}
export default ListaPlanilasProduccion