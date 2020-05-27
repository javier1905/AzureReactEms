import React from 'react'
import { Form , Table } from 'react-bootstrap'
import './styleAltaPlanillaPRODUCCION.css'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { TextField , Box } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Alert from '@material-ui/lab/Alert'
import ModalPM from './MODALPARADASDEMAQUINA/modalPARADASDEMAQUINA'
import { withSnackbar } from 'notistack'
import { connect } from 'react-redux'
import servicios from './serviceAltaPlanilla'
import MyComponent from '../../AAprimary/misComponentes'
import Fechas from '../../AAprimary/fechas'
import Typography from '@material-ui/core/Typography'
import Moment from 'moment'

class AltaPlanillaPRODUCCION extends React.Component {
    constructor ( props ) {
        super ( props )
        this.state = {
            show : false ,
            fechaProduccion : null ,
            fechaFundicion : null ,
            HoraInicioProduccion : '' ,
            HoraFinProduccion : '' ,
            idOperacion : '' ,
            idMaquina : '' ,
            idPieza:'',
            idMolde:'',
            idTipoProceso:'',
            vecOperarios:[],
            vecOperaciones:[],
            vecMaquinas:[],
            vecPiezas:[],
            vecMoldes:[],
            vecTiposProceso:[],
            vecParadasMaquina : undefined ,
            vecTurnos : undefined ,
            vecDefectos : undefined ,
            vecTipoRechazo : [ { idTipoRechazo : false , nombreTipoRechazo : 'Rechazo' } , { idTipoRechazo : true , nombreTipoRechazo : 'Scrap' } ] ,
            vecOperariosCombo : undefined ,
            campoParadaMaquina : '' ,
            campoDesdeParadaMaquina : '' ,
            campoHastaParadaMaquina : '' ,
            vecParadasMaquinaSeleccionada : [  ] ,
            showAlert : 'none' ,
            mensajeAlertZona : '' ,
            campoIdParaMaquina : '' ,
            campoNombreParadaMaquina:'',
            showModalPM:false ,
            setup : undefined
        }
        this.inputLabel = React.createRef()
        this.cbx_paradasMaquina = React.createRef()
        this.cbx_operacion = React.createRef()
        this.cbx_maquina = React.createRef()
        this.cbx_pieza = React.createRef()
        this.cbx_molde = React.createRef()
        this.alertPM = React.createRef()
        this.autoCompletePM =React.createRef()
        this.txt_campoIdParadaMaquina = React.createRef()
        this.controller = new AbortController()
    }
    capturaParaMaquina = e => {
        const {HoraInicioProduccion, HoraFinProduccion,vecParadasMaquinaSeleccionada , campoIdParaMaquina,campoNombreParadaMaquina, campoDesdeParadaMaquina, campoHastaParadaMaquina,vecParadasMaquina} = this.state
        var val = true
        var ul = document.createElement('ul')
        var paradaDeMaquinaSeleccionada
        var direrenciaEnMinutos = (horaInicio,horaFin) => {
            var hDesde = new Date(`1995-12-17T03:${horaInicio}`)
            var hHasta = new Date(`1995-12-17T03:${horaFin}`)
            if(horaInicio === '06:00' && horaFin === '06:00'){  return 24 * 60  }
            else if((hHasta-hDesde)/1000 < 0){ return (hHasta-hDesde)/1000 + 1440 }
            else{ return (hHasta-hDesde)/1000 }
        }
        var minTotalesPM = 0
        if( HoraInicioProduccion === '' || HoraFinProduccion === ''){
            var li8 = document.createElement('li')
            li8.innerHTML = 'Ingrese primero la hora de inicio y produccion antes'
            ul.append(li8)
            val=false
        }
        else{
            vecParadasMaquinaSeleccionada.forEach(pmSelect =>{
                minTotalesPM +=  parseInt(pmSelect.duracionParadaMaquina)
            })
            minTotalesPM += direrenciaEnMinutos(campoDesdeParadaMaquina,campoHastaParadaMaquina)
            if(minTotalesPM >  direrenciaEnMinutos(HoraInicioProduccion, HoraFinProduccion) ){
                var li0 = document.createElement('li')
                li0.innerHTML = 'El tiempo de parada de maquina exede al tiempo de produccion'
                ul.append(li0)
                val=false
            }
        }
        if ( campoDesdeParadaMaquina === '') {
            var li2 = document.createElement ( 'li' )
            li2.innerHTML = 'Seleccione la Hora Desde'
            ul.append ( li2 )
            val = false
        }
        if ( campoHastaParadaMaquina === '' ) {
            var li3 = document.createElement( 'li' )
            li3.innerHTML = 'Seleccione la Hora Hasta'
            ul.append ( li3 )
            val = false
        }
        var id = 0
        try {id = parseInt(campoIdParaMaquina)} catch(e){id = 0}
        const pmSele = vecParadasMaquina.find(pm=>pm.idParadaMaquina === id)
        var setUp = null
        if(pmSele !== undefined ) {
            setUp = pmSele.setupParadaMaquina
        }
        try{
            paradaDeMaquinaSeleccionada = {
                idParadaMaquina:campoIdParaMaquina,
                nombreParadaMaquina:campoNombreParadaMaquina,
                desdeParadaMaquina:campoDesdeParadaMaquina,
                hastaParadaMaquina:campoHastaParadaMaquina,
                idParadaMaquinaXplanilla:0,
                duracionParadaMaquina:direrenciaEnMinutos(campoDesdeParadaMaquina,campoHastaParadaMaquina),
                tipoParadaMaquina:vecParadasMaquina.find(pm=>pm.idParadaMaquina === parseInt(campoIdParaMaquina)).tipoParadaMaquina ,
                setup : setUp
            }
        }catch(e){
            var li4 = document.createElement('li')
            li4.innerHTML = 'Parada de maquina inexistente'
            ul.append(li4)
            val=false
        }
        if(val){
            this.setState({vecParadasMaquinaSeleccionada:[...this.state.vecParadasMaquinaSeleccionada,paradaDeMaquinaSeleccionada],campoDesdeParadaMaquina:'',campoHastaParadaMaquina:'',campoIdParaMaquina:'',campoNombreParadaMaquina:'' , setup : undefined})
            document.getElementById('txt_idParadaMquina').focus()
            document.getElementById('txt_horaHastaParadaMaquina').disabled = false
        }
        else{
            setTimeout ( (  ) => {
                this.alertPM.current.removeChild ( ul )
                this.setState ( { showAlert : 'none' } )
            } , 3000 )
            this.alertPM.current.append ( ul )
            this.setState ( { showAlert : 'block' } )
        }
    }
    handleDateChange = date => { this.setState ( { fechaProduccion : date } ) }
    capturaFechaFundicion = date => { this.setState ( { fechaFundicion : date } ) }
    getHoraInicioProduccion = e => { this.setState ( { HoraInicioProduccion : e.target.value } ) }
    getHoraFinProduccion = e => { this.setState ( { HoraFinProduccion : e.target.value } ) }
    getHoraInicioOperario = e =>{
        var vecOperariosTemp = this.state.vecOperarios
        var indexOperario = e.target.name.split(' ')[1]
        if ( e.target.value !== '06:00' && vecOperariosTemp[ indexOperario ].horaFin !== '06:00' && e.target.value === vecOperariosTemp[ indexOperario ].horaFin){
            vecOperariosTemp[indexOperario].horaInicio = ''
        }
        else {
            vecOperariosTemp[ indexOperario ].horaInicio = e.target.value
        }
        this.setState ( { vecOperarios:vecOperariosTemp } )
    }
    getHoraFinOperario = e => {
        var vecOperariosTemp = this.state.vecOperarios
        var indexOperario = e.target.name.split(' ')[1]
        if(e.target.value !== '06:00' && vecOperariosTemp[indexOperario].horaInicio !== '06:00' && e.target.value === vecOperariosTemp[indexOperario].horaInicio){
            vecOperariosTemp[indexOperario].horaFin = ''
        }
        else{
            vecOperariosTemp[indexOperario].horaFin = e.target.value
        }
        this.setState({vecOperarios:vecOperariosTemp})
    }
    addOperario = ( info , e ) => {
        let Op = { idOperario : '' , nombre : '' , apellido : '' , idTurno : '' , idTrabajadorXplanilla: 0 , horaInicio : '' , horaFin : '' , produccion : '' , calorias : '' , vecRechazo : [  ] }
        if(Array.isArray(this.state.vecTurnos)){
            if(this.state.vecTurnos.length === 0 ){ this.getTurnos (  ) }
        }
        if(Array.isArray(this.state.vecOperariosCombo)){
            if(this.state.vecOperariosCombo.length === 0 ) { this.getTrabajadores (  ) }
        }
        let newVecOperarios = [...this.state.vecOperarios,Op]
        this.setState({vecOperarios:newVecOperarios})
    }
    addRechazo = info => {
        let indexOperario = parseInt ( info )
        let newRechazo = { idRechazo : '' , nombreRechazo : '', idRechazoXtrabajadorYplanilla:0 , tipo : '' , cantidadRechazo : '' , vecZonas : [  ]  }
        if ( this.state.vecOperarios[ indexOperario ] ) {
            let newVecOperarios = this.state.vecOperarios
            newVecOperarios[indexOperario].vecRechazo = [...newVecOperarios[indexOperario].vecRechazo,newRechazo]
            this.setState({vecOperarios:newVecOperarios})
        }
    }
    addZona = info => {
        let indexOperario = parseInt ( info.split(' ')[1] )
        let indexRechazo = parseInt ( info.split(' ')[2] )
        var txt_letra = document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`)
        var txt_numero = document.getElementById(`numeroZona ${indexOperario} ${indexRechazo}`)
        var txt_cantidad = document.getElementById(`cantidadZona ${indexOperario} ${indexRechazo}`)
        var alertZona = document.getElementById(`alert ${indexOperario} ${indexRechazo}`)
        var regexLETRA = new RegExp('[A-Z]','i')
        if(txt_letra.value.length === 0 || txt_letra.value.length >1 || !regexLETRA.test(txt_letra.value)){
            setTimeout(()=>{ this.setState({mensajeAlertZona:''}); alertZona.setAttribute('style','display:none') },3000)
            this.setState({mensajeAlertZona:'Recuerde que es una sola LETRA'})
            alertZona.setAttribute('style','display:block')
            txt_letra.focus()
            txt_letra.select()
            return
        }
        var nu
        try{ nu = parseInt(txt_numero.value) } catch(e){ }
        if(txt_numero.value.length === 0 || nu <= 0 || txt_numero.value.length > 2 || isNaN(txt_numero.value) || isNaN(parseInt(txt_numero.value)) ){
            setTimeout(()=>{ this.setState({mensajeAlertZona:''});  alertZona.setAttribute('style','display:none') },3000)
            this.setState({mensajeAlertZona:'El numero no cumple con las condiciones necesarias'})
            alertZona.setAttribute('style','display:block')
            txt_numero.focus()
            txt_numero.select()
            return
        }
        var ca
        try{ ca = parseInt(txt_cantidad.value) } catch(e){ }
        if(txt_cantidad.value.length === 0 || ca<= 0 || txt_cantidad.value.length > 4 || isNaN(txt_cantidad.value) || isNaN(parseInt(txt_cantidad.value)) ){
            setTimeout(()=>{ this.setState({mensajeAlertZona:''}); alertZona.setAttribute('style','display:none') },3000)
            this.setState({mensajeAlertZona:'La cantidad no cumple con las condiciones'})
            alertZona.setAttribute('style','display:block')
            txt_cantidad.focus()
            txt_cantidad.select()
            return
        }
        var letra,numero,cantidad,idZona;
        var cacheVecOperario = this.state.vecOperarios
        try{
            letra = String(txt_letra.value).toLocaleUpperCase();
            numero = txt_numero.value
            cantidad = txt_cantidad.value
            idZona = 0
            var vecZONA = cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas
            if(vecZONA.length === 0){
                var newZona = { letra,numero,cantidad,idZona }
                cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas = [...cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas,newZona]
                this.setState({vecOperarios:cacheVecOperario})
            }
            else{
                if(vecZONA.find(z=>(z.letra === letra && z.numero === numero))){
                    if(vecZONA.find(z=>z.numero === numero)){
                        var indexZona = vecZONA.findIndex(z => (z.letra === letra && z.numero === numero) )
                        cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas[indexZona].cantidad = parseInt(cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas[indexZona].cantidad)+parseInt(cantidad)
                        this.setState({vecOperarios:cacheVecOperario})
                    }
                }
                else{
                    var newZonaS = { letra,numero,cantidad,idZona }
                    cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas = [...cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas,newZonaS]
                    this.setState({vecOperarios:cacheVecOperario})
                }
            }
            document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`).focus()
            document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`).value = ''
            document.getElementById(`numeroZona ${indexOperario} ${indexRechazo}`).value = ''
            document.getElementById(`cantidadZona ${indexOperario} ${indexRechazo}`).value = ''
        }
        catch(e){}
    }
    verificaRechazoCoincidente = e => {
        var cacheVecOp = this.state.vecOperarios
        try{
            let indexOperario = parseInt(e.target.name.split(' ')[1])
            let indexRechazo = parseInt(e.target.name.split(' ')[2])
            var idRechazo = this.state.vecOperarios[indexOperario].vecRechazo[indexRechazo].idRechazo
            var nombreRechazo = this.state.vecOperarios[indexOperario].vecRechazo[indexRechazo].nombreRechazo
            var tipoRechazo = this.state.vecOperarios[indexOperario].vecRechazo[indexRechazo].tipo   
            var cantidadRechazo = this.state.vecOperarios[indexOperario].vecRechazo[indexRechazo].cantidadRechazo
            var bandera = true
            this.state.vecOperarios[indexOperario].vecRechazo.forEach ( r  => {
                if ( r.cantidadRechazo === '' || r.idRechazo === '' || r.nombreRechazo === '' || r.tipo === '' ){
                    bandera = false
                }
            })
            if(idRechazo && nombreRechazo && tipoRechazo && cantidadRechazo && bandera === true){ // VERIFICO QUE TODOS LOS CAMPOS DE DEL RECHAZO ANALIZADO ESTEN COMPLETOS
                cacheVecOp[indexOperario].vecRechazo.map((rech,indice) => {// RECORRO EL VEC RECHAZOS DE ESE OPERARIO
                    if(rech.idRechazo !== undefined && rech.nombreRechazo !== undefined && rech.tipo !== undefined && rech.cantidadRechazo !== undefined){
                        if(indice !== indexRechazo){ // indice { coincidencia } indexRechazo { analizado }
                            if(rech.idRechazo === idRechazo && rech.tipo === tipoRechazo){ // COINCIDENCIA ENTRE EL RECHAZO ANALIZADO Y EL VEC RECHAZO DE ESE OPERARIO
                                if(cacheVecOp[indexOperario].vecRechazo[indexRechazo].vecZonas.length){ // SI EL RECHAZO QUE ESTOY  ANALIZO TIENE CARAGAS ZONAS
                                    cacheVecOp[indexOperario].vecRechazo[indexRechazo].vecZonas.map((zona,indiceZona)=>{ // RECORRO EL VECTOR DE ZONAS EL RECHAZO ANALIZADO
                                        if(cacheVecOp[indexOperario].vecRechazo[indice].vecZonas.find(zo=>(zo.letra === zona.letra && zo.numero === zona.numero))){ // SI COINCIDE las ZONAS
                                            var indiceCOINCIDENCIA = cacheVecOp[indexOperario].vecRechazo[indice].vecZonas.findIndex(zo=>(zo.letra === zona.letra && zo.numero === zona.numero))
                                            cacheVecOp[indexOperario].vecRechazo[indice].vecZonas[indiceCOINCIDENCIA].cantidad = parseInt(cacheVecOp[indexOperario].vecRechazo[indice].vecZonas[indiceCOINCIDENCIA].cantidad) + parseInt(zona.cantidad) // sumo las cantidades
                                        }
                                        else{ // SI NO COINCIDEN LAS ZONAS SE LA AGREGO
                                            cacheVecOp[indexOperario].vecRechazo[indice].vecZonas = [...cacheVecOp[indexOperario].vecRechazo[indice].vecZonas,zona]
                                        }
                                        return <React.Fragment></React.Fragment>
                                    })
                                }
                                cacheVecOp[indexOperario].vecRechazo[indice].cantidadRechazo = parseInt(cacheVecOp[indexOperario].vecRechazo[indice].cantidadRechazo) + parseInt(cantidadRechazo)
                                cacheVecOp[indexOperario].vecRechazo.splice(indexRechazo,1)
                                this.setState({vecOperarios:cacheVecOp})
                                return undefined
                            }
                        }
                    }
                    return undefined
                })
            }
        }
        catch(e){ }
    }
    capturaDatos = e =>{
            let nombre = e.target.name
            let value = e.target.value
        if(nombre === 'idTipoProceso'){
            this.setState({idTipoProceso:value})
        }
        if(nombre === 'idOperacion'){
            this.setState({idOperacion:value})
            this.getMaquinasXoperacion(value)
            this.setState({idMaquina:'',idPieza:'',idMolde:'',idTipoProceso:'',vecTiposProceso:[]})
        }
        if(nombre === 'idMaquina'){
            this.setState({idMaquina:value})
            this.getPiezasXmaquina(value)
            this.setState({idPieza:'',idMolde:'',idTipoProceso:'',vecTiposProceso:[]})
        }
        if(nombre === 'idPieza'){
            this.setState({idPieza:value,idTipoProceso:'',vecTiposProceso:[]})
            this.getMoldesXpieza(value)
            this.getTipoProcesoXpiezaMaquina(value,this.state.idMaquina)
        }
        if(nombre === 'idMolde'){this.setState({idMolde:value})}
        var indexOperario
        if(nombre.split(' ')[1]){indexOperario = parseInt(nombre.split(' ')[1])}
        var indexRechazo
        if(nombre.split(' ')[2]){indexRechazo = parseInt(nombre.split(' ')[2]) }
        var vecOperariosCache = this.state.vecOperarios
        try {
            if ( nombre.split ( ' ' )[ 0 ] === 'idOperario' ) {
                if ( String ( value ).length !== 0 &&  this.state.vecOperariosCombo.find ( o => o.idTrabajador === parseInt ( value ) ) === undefined ) {
                    vecOperariosCache[ indexOperario ].nombre = ''
                }
                else {
                    vecOperariosCache[ indexOperario ].idOperario = parseInt ( value )
                    vecOperariosCache[ indexOperario ].nombre = parseInt ( value )
                }
            }
            if(nombre.split(' ')[0] === 'idTurno' ) {
                var turno
                if( Array.isArray (this.state.vecTurnos) ) {
                turno = this.state.vecTurnos.find( t =>  t.idTurno === parseInt(value) )
                }
                if ( turno.hsInicioTurno ) {
                    vecOperariosCache[ indexOperario ].horaInicio = String(turno.hsInicioTurno).substring(11,16)
                    vecOperariosCache[ indexOperario ].horaFin =  String(turno.hsFinTurno).substring(11,16)
                    vecOperariosCache[ indexOperario ].idTurno = parseInt ( value )
                }
            }
            if(nombre.split(' ')[0] === 'nombreOperario'){ vecOperariosCache[indexOperario].nombre = value; vecOperariosCache[indexOperario].idOperario = parseInt(value) }
            if(nombre.split(' ')[0] === 'produccionOperario'){ vecOperariosCache[indexOperario].produccion = parseInt(value) }
            if(nombre.split(' ')[0] === 'caloriasOperario'){
                if(value > 12){
                    vecOperariosCache[indexOperario].calorias = ''
                }
                else{
                    vecOperariosCache[indexOperario].calorias = parseInt(value)
                }
            }
            if(nombre.split(' ')[0] === 'idRechazo'){
                if(String (value).length !== 0 &&  this.state.vecDefectos.find(d => d.idDefecto === parseInt(value)) === undefined  ){
                    vecOperariosCache[indexOperario].vecRechazo[indexRechazo].idRechazo = ''
                    vecOperariosCache[indexOperario].vecRechazo[indexRechazo].nombreRechazo = ''
                }
                else{
                    vecOperariosCache[indexOperario].vecRechazo[indexRechazo].idRechazo = parseInt ( value )
                    vecOperariosCache[indexOperario].vecRechazo[indexRechazo].nombreRechazo = parseInt ( value )
                }
            }
            if(nombre.split(' ')[0] === 'nombreRechazo') {
                vecOperariosCache[indexOperario].vecRechazo[indexRechazo].idRechazo = parseInt ( value )
                vecOperariosCache[indexOperario].vecRechazo[indexRechazo].nombreRechazo = parseInt ( value )
            }
            if(nombre.split(' ')[0] === 'tipoRechazo'){
                vecOperariosCache[indexOperario].vecRechazo[indexRechazo].tipo = value
                var div = document.getElementById(`contenedorRechazosYzonas ${parseInt(nombre.split(' ')[1])} ${parseInt(nombre.split(' ')[2])}`)
                if(value === 'Scrap'){div.setAttribute('style','border: solid red 1px') }
                else if( value === 'Rechazo'){ div.setAttribute('style','border: solid yelow 1px') }
                else{ div.setAttribute('style','border: none') }
            }
            if(nombre.split(' ')[0] === 'cantidadRechazo'){vecOperariosCache[indexOperario].vecRechazo[indexRechazo].cantidadRechazo = value}
            this.setState ( { vecOperarios : vecOperariosCache } )
        }
        catch ( e ) {  }
    }
    getOperaciones = async (  ) =>{ this.setState ( { vecOperaciones : await servicios.listaOperaciones ( this.controller ) , idOperacion : '' } )  }
    getMaquinasXoperacion = async  idOperacion => {
        this.setState ( { vecMaquinas : await servicios.listaMaquinaXoperacion ( idOperacion , this.controller ) , vecPiezas : [  ] , vecMoldes : [  ] , idMaquina : '' } )
    }
    getPiezasXmaquina = async idMaquina => {
        this.setState ( { vecPiezas : await servicios.listaPiezasXmaquina ( idMaquina , this.controller ) , vecMoldes : [  ] , idMolde : '' , idPieza : '' } )
    }
    getMoldesXpieza = async idPieza =>{ this.setState ( { vecMoldes : await  servicios.listaMoldesXpieza ( idPieza , this.controller ) , idMolde : '' } ) }
    getTipoProcesoXpiezaMaquina = async ( idPieza , idMaquina ) => { this.setState ( { vecTiposProceso : await servicios.tipoProcesosXmaquinaYpieza ( idPieza , idMaquina )  } ) }
    getParadasMaquina = async (  ) =>{
        this.setState ( { vecParadasMaquina : await servicios.listaParadaMaquinas ( this.controller ) } )
        try {  return this.cbx_paradasMaquina.current.value = undefined } catch ( e ) {  }
    }
    getTurnos = async (  ) => { this.setState ( { vecTurnos : await servicios.listaTurnos ( this.controller ) , idTurno : '' } ) }
    getDefectos = async (  ) => { this.setState ( { vecDefectos : await servicios.listaDefectos ( this.controller ) } ) }
    getTrabajadores = async (  ) => { this.setState ( { vecOperariosCombo : await servicios.listaTrabajadores ( this.controller ) } )  }
    useStyles = makeStyles ( theme => ( {
        root: {
            flexGrow: 1
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        margin: {
            margin: theme.spacing(1),
        }
    } ) )
    eventClose = e => {
        var nomParadaMaquina
        try{ nomParadaMaquina = this.state.vecParadasMaquina.find ( pm => pm.idParadaMaquina === parseInt ( e ) ).nombreParadaMaquina  }
        catch ( e ) { nomParadaMaquina = ''  }
        var campoPM
        if ( e === undefined ) { campoPM = '' }
        else { campoPM = parseInt ( e ) }
        if ( nomParadaMaquina === '' || campoPM === '' ) { this.setState ( { showModalPM : false } ) }
        else{  this.setState({showModalPM:false,campoIdParaMaquina:campoPM,campoNombreParadaMaquina:nomParadaMaquina } ) }
        try {
            var setUP = this.state.vecParadasMaquina.find ( pm => pm.idParadaMaquina === parseInt ( e ) ).setupParadaMaquina
            var horaHastaPM = document.getElementById ( 'txt_horaHastaParadaMaquina' )
            if ( setUP !== null ) {
                horaHastaPM.disabled = true
                this.setState ( { campoDesdeParadaMaquina : '' , campoHastaParadaMaquina : '' , setup : parseInt ( setUP )  } )
            }
            else {
                horaHastaPM.disabled = false
                this.setState ( { setup : undefined } )
            }
        }
        catch ( er ) { }
    }
    miSubmit = e => {
        const  { fechaProduccion , fechaFundicion  , HoraInicioProduccion , HoraFinProduccion , idOperacion , idMaquina , idPieza, idMolde, idTipoProceso , vecOperarios  , vecParadasMaquinaSeleccionada } = this.state
        var  dato = {
            fechaProduccion,
            fechaFundicion ,
            HoraInicioProduccion,
            HoraFinProduccion,
            idOperacion , idMaquina,
            idPieza ,  idMolde , idTipoProceso,
            vecOperarios ,
            vecParadasMaquinaSeleccionada
        }
        const validacion = (  ) => {
            var dtp_fechaProduccion = document.getElementById ( 'dtp_fechaProduccion' )
            if ( fechaProduccion === null ) {
                this.props.enqueueSnackbar ( 'Ingrese la fecha de Procesado ', { variant: 'error' , preventDuplicate : true } )
                dtp_fechaProduccion.focus (  )
                dtp_fechaProduccion.select (  )
                return false
            }
            if(fechaFundicion === null){
                this.props.enqueueSnackbar('Ingrese la fecha de Fundicion ', { variant: 'error',preventDuplicate: true})
                var dtp_fechaFundicion = document.getElementById('dtp_fechaFundicion')
                dtp_fechaFundicion.focus()
                dtp_fechaFundicion.select()
                return false
            }
            if(HoraInicioProduccion === ''){
                this.props.enqueueSnackbar('Ingrese la hora de inicio de produccion ', { variant: 'error',preventDuplicate: true})
                var dtp_horaInicioProduccion = document.getElementById('idHoraIniciuoProduccion')
                dtp_horaInicioProduccion.focus()
                dtp_horaInicioProduccion.select()
                return false
            }
            if(HoraFinProduccion === ''){
                this.props.enqueueSnackbar('Ingrese la hora de fin de produccion ', { variant: 'error',preventDuplicate: true})
                var dtp_horaFinProduccion = document.getElementById('idHoraFinProduccion')
                dtp_horaFinProduccion.focus()
                dtp_horaFinProduccion.select()
                return false
            }
            const comparaIgualdadFechas = ( fechaUno, FechaDos ) => {
                if (this.props.planillaUpdate) {
                    if ( new Moment( fechaUno ).isSame(new Moment( FechaDos)) ) {
                        return true
                    }
                    else {
                        return false
                    }
                }else{
                    var fe_uno = `${fechaUno.getDate()}${fechaUno.getMonth()+1}${fechaUno.getFullYear()}`
                    var fe_dos = `${FechaDos.getDate()}${FechaDos.getMonth()+1}${FechaDos.getFullYear()}`
                    if(fe_uno === fe_dos) { return true} else { return false}
                }
            }
            if(!comparaIgualdadFechas(fechaProduccion, fechaFundicion )){
                if((fechaProduccion - fechaFundicion) < 0 ){
                    this.props.enqueueSnackbar('Verifique que la fecha de Produccion sea Posterior o igual a la de fundicion', { variant: 'error'})
                    dtp_fechaProduccion.focus()
                    dtp_fechaProduccion.select()
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })
                    return false
                }
            }
            if ( HoraInicioProduccion !== '06:00' && HoraFinProduccion !== ' 06:00' && HoraInicioProduccion === HoraFinProduccion ) {
                var dtp_idHoraIniciuoProduccion = document.getElementById ( 'idHoraIniciuoProduccion' )
                dtp_idHoraIniciuoProduccion.focus()
                dtp_idHoraIniciuoProduccion.select()
                this.props.enqueueSnackbar('No puede tener horas de inicio y fin  iguales', { variant: 'error'})
                return false
            }
            if(idOperacion === '' ){
                this.props.enqueueSnackbar('Seleccione una operacion  ', { variant: 'error',preventDuplicate: true})
                return false
            }
            if(idMaquina === '' ){
                this.props.enqueueSnackbar('Selecciones una maquina', { variant: 'error',preventDuplicate: true})
                return false
            }
            if(idPieza === '' ){
                this.props.enqueueSnackbar('Seleccione una pieza ', { variant: 'error',preventDuplicate: true})
                return false
            }
            if(idMolde === '' ){
                this.props.enqueueSnackbar('Seleccione un molde ', { variant: 'error',preventDuplicate: true})
                return false
            }
            if(idTipoProceso === '' ){
                this.props.enqueueSnackbar('Seleccione el tipo de  proceso ', { variant: 'error',preventDuplicate: true})
                return false
            }
            else if (vecOperarios.length <= 0) {
                this.props.enqueueSnackbar('Debe ingresar al menos un operario', { variant: 'error'})
                return false
            }
            var vecOP = true
            vecOperarios.forEach ( ( o , indexOperario ) => {
                if(vecOP === false) { return true}
                var cantRechazo = 0
                if(o.idOperario === ''){
                    var cbx_idOperario = document.getElementById(`idOperario ${indexOperario}`)
                    cbx_idOperario.focus()
                    cbx_idOperario.click()
                    this.props.enqueueSnackbar('Ingrese algun Operario  ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.idTurno === ''){
                    var cbx_idTurno = document.getElementById(`idTurno ${indexOperario}`)
                    cbx_idTurno.focus()
                    cbx_idTurno.click()
                    this.props.enqueueSnackbar('Seleccione el turno ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.horaInicio === ''){
                    var txt_horaInicio = document.getElementById(`hsInicioOperario ${indexOperario}`)
                    txt_horaInicio.focus()
                    txt_horaInicio.click()
                    this.props.enqueueSnackbar('Seleccione la hora de Inicio ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.horaFin === ''){
                    var txt_horaFin = document.getElementById(`hsFinOperario ${indexOperario}`)
                    txt_horaFin.focus()
                    txt_horaFin.click()
                    this.props.enqueueSnackbar('Seleccione la hora de Fin ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.produccion === ''){
                    var txt_produccionOperario = document.getElementById(`txt_produccionOperario ${indexOperario}`)
                    txt_produccionOperario.focus()
                    txt_produccionOperario.click()
                    this.props.enqueueSnackbar('Ingrese la cantidad Producida ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.calorias === ''){
                    var txt_caloriasOperario = document.getElementById(`txt_caloriasOperario ${indexOperario}`)
                    txt_caloriasOperario.focus()
                    txt_caloriasOperario.click()
                    this.props.enqueueSnackbar('Ingrese la calorias ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                var vecRE = true
                if(o.vecRechazo.length>0){
                    o.vecRechazo.forEach((r,indexRechazo)=>{
                        if(vecRE === false) {return}
                        if(r.idRechazo === ''){
                            var txt_idRechazo = document.getElementById(`idRechazo ${indexOperario} ${indexRechazo}`)
                            txt_idRechazo.focus()
                            this.props.enqueueSnackbar('Selecione algun Rechazo ', { variant: 'error',preventDuplicate: true})
                            vecOP=false
                            vecRE = false
                            return false
                        }
                        if(r.tipo === ''){
                            var cbx_tipoRechazo = document.getElementById(`tipoRechazo ${indexOperario} ${indexRechazo}`)
                            cbx_tipoRechazo.focus()
                            this.props.enqueueSnackbar('Selecione el tipo de rachazo ', { variant: 'error',preventDuplicate: true})
                            vecOP=false
                            vecRE = false
                            return false
                        }
                        if(r.cantidadRechazo === ''){
                            var txt_cantidadRechazo = document.getElementById(`cantidadRechazo ${indexOperario} ${indexRechazo}`)
                            txt_cantidadRechazo.focus()
                            this.props.enqueueSnackbar('Ingrese la cantidad de rechazos ', { variant: 'error',preventDuplicate: true})
                            vecOP=false
                            vecRE = false
                            return false
                        }
                        cantRechazo += parseInt(r.cantidadRechazo)
                        if(r.vecZonas.length === 0){
                            var letraZona = document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`)
                            letraZona.focus()
                            letraZona.select()
                            this.props.enqueueSnackbar('Verifique que todos los rechazos tengan al menos una zona cargada ', { variant: 'error',preventDuplicate: true})
                            vecOP = false
                            vecRE = false
                            return false
                        }
                    } )
                    if ( vecRE === false ) { return false }
                }
                if ( cantRechazo > parseInt ( o.produccion ) ) {
                    this.props.enqueueSnackbar('Revise los rechazos porque hay mas que la cantidad producida ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
            })
            var url = ''
            if(vecOP === false) { return }
            if ( this.props.planillaUpdate ) {
                dato.idPlanilla = this.props.planillaUpdate.idPlanilla
                url = `${process.env.REACT_APP_URL_API}/api/planillasProduccion/update`
            }
            else{
                url = `${process.env.REACT_APP_URL_API}/api/planillasProduccion/insert`
            }
            fetch( url , {
                method : 'POST' ,
                body: JSON.stringify ( dato ) ,
                headers :  new Headers ( {
                    'Accept' : 'Application/json' ,
                    'Content-Type' :  'Application/json' ,
                    authorization : `Bearer ${sessionStorage.getItem('token')}`
                })
            })
            .then ( dato => { return dato.json (  ) } )
            .then ( json => {
                this.props.enqueueSnackbar(`${json.mensaje}`,
                {
                    variant: 'success',
                    preventDuplicate: true,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }
                })
                this.setState ( { fechaProduccion : null , fechaFundicion : null , HoraInicioProduccion : '' , HoraFinProduccion : '' , idOperacion : '' , idMaquina : '' ,
                    idPieza : '' , idMolde : '' , idTipoProceso : '' , vecOperarios : [  ] , vecMaquinas : [  ] , vecPiezas : [  ] , vecMoldes : [  ] , vecTiposProceso : [  ] ,
                    campoParadaMaquina : '' ,  campoDesdeParadaMaquina : '' , campoHastaParadaMaquina : '' , vecParadasMaquinaSeleccionada : [  ] ,
                    campoIdParaMaquina : '' , campoNombreParadaMaquina : ''
                })
            })
            .catch ( e => {
                this.props.enqueueSnackbar(`${e.mensaje}` ,
                {
                    variant : 'error' ,
                    preventDuplicate : true ,
                    anchorOrigin : {
                        vertical :  'bottom' ,
                        horizontal : 'center' ,
                    }
                })
            })
        }
        validacion (  )
        e.preventDefault (  )
    }
    completaDatosUpdate = (  ) => {
        const plaUpdate = this.props.planillaUpdate
        if ( plaUpdate !== '' ) {
            this.setState ( { fechaProduccion : Fechas.SQL_DataTimePicker ( plaUpdate.fechaProduccion ) , fechaFundicion : Fechas.SQL_DataTimePicker ( plaUpdate.fechaFundicion ) ,
                HoraInicioProduccion : plaUpdate.horaInicio , HoraFinProduccion : plaUpdate.horaFin ,
                vecOperarios : plaUpdate.vecOperarios , vecParadasMaquinaSeleccionada : plaUpdate.vecParadasMaquinaSeleccionada
            } )
            const getOp = async (  ) => {
                this.setState ( { vecOperaciones : await servicios.listaOperaciones ( this.controller ) } , ( ) => { this.setState ( { idOperacion : plaUpdate.idOperacion } ) } )
            }
            getOp (  )
            const getMaq = async (  ) => {
                this.setState ( { vecMaquinas : await servicios.listaMaquinaXoperacion ( plaUpdate.idOperacion , this.controller ) } , ( ) => { this.setState ( { idMaquina : plaUpdate.idMaquina } ) } )
            }
            getMaq (  )
            const getPie = async (  ) => {
                this.setState ( { vecPiezas : await servicios.listaPiezasXmaquina ( plaUpdate.idMaquina , this.controller ) } , ( ) => { this.setState ( { idPieza : plaUpdate.idPieza } ) } )
            }
            getPie (  )
            const getMol = async (  ) => {
                this.setState ( { vecMoldes : await  servicios.listaMoldesXpieza ( plaUpdate.idPieza , this.controller ) } , ( ) => { this.setState ( { idMolde : plaUpdate.idMolde } ) } )
            }
            getMol (  )
            const getTipoPro = async (  ) => {
                this.setState ( { vecTiposProceso : await servicios.tipoProcesosXmaquinaYpieza ( plaUpdate.idPieza , plaUpdate.idMaquina ) } , ( ) => { this.setState ( { idTipoProceso : plaUpdate.idTipoProceso } ) } )
            }
            getTipoPro (  )
        }
        else {

        }
    }
    componentDidMount (  ) {
        this.getParadasMaquina (  )
        this.getTurnos (  )
        this.getDefectos (  )
        this.getTrabajadores (  )
        if ( this.props.planillaUpdate ) {
            this.completaDatosUpdate (  )
        }
        else {
            this.getOperaciones (  )
        }
    }
    componentWillUnmount (  ) { this.controller.abort (  ) }

    myUpdate = info => {
        var index = parseInt(String(info).split(' ')[0])
        var idPM = this.state.vecParadasMaquinaSeleccionada[index].idParadaMaquina
        var nombrePM = this.state.vecParadasMaquinaSeleccionada[index].nombreParadaMaquina
        var desdePM = this.state.vecParadasMaquinaSeleccionada[index].desdeParadaMaquina
        var hastaPM = this.state.vecParadasMaquinaSeleccionada[index].hastaParadaMaquina
        var vecPM = this.state.vecParadasMaquinaSeleccionada
        var setUPP = this.state.vecParadasMaquinaSeleccionada[index].setup
        var horaHastaPM = document.getElementById ( 'txt_horaHastaParadaMaquina' )
        if(this.state.vecParadasMaquinaSeleccionada[index].setup !== null ){
            horaHastaPM.disabled = true
        }
        else {
            horaHastaPM.disabled = false
        }
        vecPM.splice(parseInt(index),1)
        this.setState({vecParadasMaquinaSeleccionada:vecPM,campoIdParaMaquina:idPM,campoNombreParadaMaquina:nombrePM,campoDesdeParadaMaquina:desdePM,campoHastaParadaMaquina:hastaPM , setup : setUPP})
    }
    myDelete = info => {
        var vecPM = this.state.vecParadasMaquinaSeleccionada
        vecPM.splice(parseInt(info),1)
        this.setState({vecParadasMaquinaSeleccionada:vecPM})
    }
    myDeleteOperario = info => {
        var vecOP = this.state.vecOperarios
        vecOP.splice(parseInt(info.split(' ')[0]),1)
        this.setState({vecOperarios:vecOP})
    }
    myDeleteRechazo = info => {
        var vecRE = this.state.vecOperarios
        vecRE[parseInt(info.split(' ')[0])].vecRechazo.splice(parseInt(info.split(' ')[1]),1)
        this.setState({vecOperarios:vecRE})
    }
    myDeleteZona = info => {
        var vecZN = this.state.vecOperarios
        vecZN[parseInt(info.split(' ')[0])].vecRechazo[parseInt(info.split(' ')[1])].vecZonas.splice(parseInt(info.split(' ')[2]),1)
        this.setState({vecOperarios:vecZN})
    }
    render (  ) {
        const classes = this.useStyles
        return (
            <Box  boxShadow={1}  bgcolor="background.default"  m={0} p={3} >
                <Form onSubmit={this.miSubmit}>
                        <div className={classes.root}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}> {/* INICIO CONTENEDOR FECHAS PRODUCCION Y FUNDICION */}
                                        <MyComponent.fecha id="dtp_fechaFundicion" label="Fecha Fundicion" value = { this.state.fechaFundicion } onChange = { this.capturaFechaFundicion } />
                                        <MyComponent.fecha id="dtp_fechaProduccion" label="Fecha Procesado" value = { this.state.fechaProduccion } onChange = { this.handleDateChange } />
                                    </Grid> {/* FIN CONTENEDOR FECHAS PRODUCCION Y FUNDICCION*/}
                                    <Grid item xs={12}> {/* INICIO TURNO Y HORA DE INICIO Y FIN  DE LA PLANILLA */}
                                        <MyComponent.hora  id="idHoraIniciuoProduccion" label="Desde"  name='hsInicioOperario' value = { this.state.HoraInicioProduccion } onChange = { this.getHoraInicioProduccion } />
                                        <MyComponent.hora  id="idHoraFinProduccion" label="Hasta"  name='hsFinOperario' value = { this.state.HoraFinProduccion } onChange = { this.getHoraFinProduccion } />
                                    </Grid> {/* FIN TURNO Y HORA DE INICIO Y FIN  DE LA PLANILLA */}
                                    <Grid item xs={12}> {/* INICIO OPERACION MAQUINA PIEZA Y MOLDE */}
                                    <MyComponent.listaDesplegable
                                        name='idOperacion'
                                        onChange = { this.capturaDatos }
                                        value = { this.state.idOperacion }
                                        ref = { this.cbx_operacion }
                                        label = 'Operacion'
                                        id = 'myOperacion'
                                        array = { this.state.vecOperaciones }
                                        member = { { valueMember : 'idOperacion' , displayMember : 'nombreOperacion' } }
                                    />
                                    <MyComponent.listaDesplegable
                                        name='idMaquina'
                                        onChange = { this.capturaDatos }
                                        value = { this.state.idMaquina }
                                        ref = { this.cbx_maquina }
                                        label = 'Maquina'
                                        id = 'myMaquina'
                                        array = { this.state.vecMaquinas }
                                        member = { { valueMember : 'idMaquina' , displayMember : 'nombreMaquina' } }
                                    />
                                    <MyComponent.listaDesplegable
                                        name='idPieza'
                                        onChange = { this.capturaDatos }
                                        value = { this.state.idPieza }
                                        ref = { this.cbx_pieza }
                                        label = 'Pieza'
                                        array = { this.state.vecPiezas }
                                        member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza' } }
                                    />
                                    <MyComponent.listaDesplegable
                                        name='idMolde'
                                        onChange = { this.capturaDatos }
                                        value = { this.state.idMolde }
                                        ref = { this.cbx_molde }
                                        label = 'Molde'
                                        array = { this.state.vecMoldes }
                                        member = { { valueMember : 'idMolde' , displayMember : 'nombreMolde' } }
                                    />
                                    <MyComponent.listaDesplegable
                                        name='idTipoProceso'
                                        onChange = { this.capturaDatos }
                                        value = { this.state.idTipoProceso }
                                        ref = { this.cbx_tipoProceso }
                                        label = 'Tipo Proceso'
                                        array = { this.state.vecTiposProceso }
                                        member = { { valueMember : 'idTipoProceso' , displayMember : 'nombreTipoProceso' } }
                                    />
                                    </Grid>  {/* FIN OPERACION MAQUINA PIEZA Y MOLDE */}
                                    <Grid item xs={12}> {/* INICIO OPERARIOS*/}
                                        <Typography variant = 'h2' style = { { marginBottom : 15 } } >Operarios</Typography>
                                        <div style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px'}}>
                                            <MyComponent.botonAdd id = 'btnAddOperario' texto = 'Add operario'  onClick  = { this.addOperario } fontSize = 'large'  size = { 50 } />
                                            {
                                                this.state.vecOperarios.map((o,i)=>{  // ! RECORRE VECTOR OPERARIOS
                                                    return <div key={i} style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px',marginTop:'10px'}}>
                                                                <Grid container spacing={1}  id='contenedorOperaio'>
                                                                        <TextField
                                                                            style = { { width : '70px' , marginRight : '10px' } }
                                                                            id = {`idOperario ${ i }`}
                                                                            label = "Legajo"
                                                                            type = 'number'
                                                                            name = {`idOperario ${ i }`}
                                                                            onChange = { this.capturaDatos }
                                                                            value = { this.state.vecOperarios[ i ].idOperario }
                                                                        />
                                                                        <MyComponent.listaDesplegable
                                                                            name = {`nombreOperario ${i}`}
                                                                            onChange = { this.capturaDatos }
                                                                            value = { this.state.vecOperarios[i].idOperario }
                                                                            label = 'Nombre'
                                                                            id = "cbx_operarios"
                                                                            width = { 180 }
                                                                            array = { this.state.vecOperariosCombo }
                                                                            member = { { valueMember : 'idTrabajador' , displayMember : 'nombreTrabajador' , displayMember2 : 'apellidoTrabajador' } }
                                                                        />
                                                                        <MyComponent.listaDesplegable
                                                                            name = { `idTurno ${ i }` }
                                                                            onChange = { this.capturaDatos }
                                                                            value = { this.state.vecOperarios[ i ].idTurno }
                                                                            label = 'Turno'
                                                                            id = { `idTurno ${ i }` }
                                                                            array = { this.state.vecTurnos }
                                                                            member = { { valueMember : 'idTurno' , displayMember : 'descripcionTurno' } }
                                                                        />
                                                                        <MyComponent.hora
                                                                            id = {`hsInicioOperario ${i}`}
                                                                            label = "Desde"
                                                                            name = {`hsInicioOperario ${i}`}
                                                                            value = { this.state.vecOperarios[i].horaInicio }
                                                                            onChange = { this.getHoraInicioOperario }
                                                                        />
                                                                        <MyComponent.hora
                                                                            id = {`hsFinOperario ${i}`}
                                                                            label = "Hasta"
                                                                            name = {`hsFinOperario ${i}`}
                                                                            value = { this.state.vecOperarios[i].horaFin }
                                                                            onChange = { this.getHoraFinOperario }
                                                                        />
                                                                        <MyComponent.numero
                                                                            id = {`txt_produccionOperario ${i}`}
                                                                            label = "Produccion"
                                                                            name = {`produccionOperario ${i}`}
                                                                            onChange = { this.capturaDatos }
                                                                            value = { this.state.vecOperarios[i].produccion }
                                                                        />
                                                                        <MyComponent.numero
                                                                            id = {`txt_caloriasOperario ${i}`}
                                                                            label = "Calorias"
                                                                            name = {`caloriasOperario ${i}`}
                                                                            onChange = { this.capturaDatos }
                                                                            value = { this.state.vecOperarios[i].calorias }
                                                                        />
                                                                        <MyComponent.botonAdd id={`btn_addRechazo ${i}`} info = {`${i}`} onClick = { this.addRechazo } texto = 'Add Rechazo' />
                                                                        <MyComponent.botonDelete id={`${i} id_Operario`} info = {`${i} id_Operario`} onClick =   { this.myDeleteOperario } />
                                                                </Grid>
                                                                <Typography  variant = 'h4' style = { { marginBottom : 10 } } >Rechazos</Typography>
                                                                { // !RECORRE VECTOR RECHAZOS
                                                                    Array.isArray( this.state.vecOperarios[i].vecRechazo) ?
                                                                    this.state.vecOperarios[i].vecRechazo.map((rech,indexRechazo)=>{
                                                                        return <Box className='contenedorRechazo'  boxShadow={3}  bgcolor="background.default"  m={1} p={3} id={`contenedorRechazosYzonas ${i} ${indexRechazo}`} key={`${i}${indexRechazo}`} >
                                                                            <Grid container spacing={1}>
                                                                                <Grid item xs={12} className='contenedorRechazos'>
                                                                                    <MyComponent.numero
                                                                                        id = {`idRechazo ${i} ${indexRechazo}`}
                                                                                        label = "Id rech"
                                                                                        name = {`idRechazo ${i} ${indexRechazo}`}
                                                                                        onChange = { this.capturaDatos }
                                                                                        value = { this.state.vecOperarios[i].vecRechazo[indexRechazo].idRechazo }
                                                                                        onBlur = { this.verificaRechazoCoincidente }
                                                                                    />
                                                                                    <MyComponent.listaDesplegable
                                                                                        name = { `nombreRechazo ${i} ${indexRechazo}` }
                                                                                        onChange = { this.capturaDatos }
                                                                                        onBlur = { this.verificaRechazoCoincidente }
                                                                                        value = { this.state.vecOperarios[ i ].vecRechazo[ indexRechazo ].idRechazo }
                                                                                        label = 'Defecto'
                                                                                        id = { `nombreRechazo ${i} ${indexRechazo}` }
                                                                                        array = { this.state.vecDefectos }
                                                                                        member = { { valueMember : 'idDefecto' , displayMember : 'nombreDefecto' } }
                                                                                    />
                                                                                    <FormControl  className={classes.formControl}  style={{width:'140px',marginRight:'10px'}}>
                                                                                        <InputLabel id='lbl_TipoRecha'>Tipo Rech</InputLabel>
                                                                                        <Select
                                                                                            id = { `tipoRechazo ${i} ${indexRechazo}` }
                                                                                            labelId='lbl_TipoRecha'
                                                                                            value = { this.state.vecOperarios[i].vecRechazo[indexRechazo].tipo }
                                                                                            name = { `tipoRechazo ${i} ${indexRechazo}` }
                                                                                            onChange = { this.capturaDatos }
                                                                                            onBlur={this.verificaRechazoCoincidente}
                                                                                        >
                                                                                            {
                                                                                                Array.isArray(  this.state.vecTipoRechazo )?
                                                                                                this.state.vecTipoRechazo.map((tr,indexTipoRechazo)=>{
                                                                                                    return <MenuItem key={indexTipoRechazo} value={tr.idTipoRechazo}>{tr.nombreTipoRechazo}</MenuItem>
                                                                                                })
                                                                                                :
                                                                                                <MenuItem></MenuItem>
                                                                                            }
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                    <MyComponent.numero
                                                                                        id = {`cantidadRechazo ${i} ${indexRechazo}`}
                                                                                        label = "Cantidad"
                                                                                        name = {`cantidadRechazo ${i} ${indexRechazo}`}
                                                                                        onChange = { this.capturaDatos }
                                                                                        value = { this.state.vecOperarios[i].vecRechazo[indexRechazo].cantidadRechazo }
                                                                                        onBlur = { this.verificaRechazoCoincidente }
                                                                                    />
                                                                                    <MyComponent.botonDelete id={`${i} ${indexRechazo} id_rechazo`} info = {`${i} ${indexRechazo} id_rechazo`} onClick = { this.myDeleteRechazo } />
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <TextField
                                                                                        style={{width:'60px',marginRight:'10px'}}
                                                                                        label='Letra'
                                                                                        id={`letraZona ${i} ${indexRechazo}`}
                                                                                        type='text'
                                                                                    >
                                                                                    </TextField>
                                                                                    <TextField
                                                                                        style={{width:'60px',marginRight:'10px'}}
                                                                                        label='Num'
                                                                                        id={`numeroZona ${i} ${indexRechazo}`}
                                                                                        type='number'
                                                                                    >
                                                                                    </TextField>
                                                                                    <TextField
                                                                                        style={{width:'60px',marginRight:'10px',marginBottom:'10px'}}
                                                                                        label='Cant'
                                                                                        id={`cantidadZona ${i} ${indexRechazo}`}
                                                                                        type='number'
                                                                                    >
                                                                                    </TextField>
                                                                                    <MyComponent.botonAdd
                                                                                        texto = 'Add Zona'
                                                                                        info = {`btnAddZona ${i} ${indexRechazo}`}
                                                                                        onClick = {this.addZona }
                                                                                        id={`btnAddZona ${i} ${indexRechazo}`}
                                                                                    />
                                                                                    <Alert id={`alert ${i} ${indexRechazo}`} style={{display:'none'}} severity="error">
                                                                                        {this.state.mensajeAlertZona}
                                                                                    </Alert>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Table size="sm">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <td>Letra</td>
                                                                                                <td>Numero</td>
                                                                                                <td>Cantidad</td>
                                                                                                <td>Eliminar</td>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                this.state.vecOperarios[i].vecRechazo[indexRechazo].vecZonas.map((z,indexZona)=>{
                                                                                                    return <tr key={indexZona}>
                                                                                                        <td>{z.letra}</td>
                                                                                                        <td>{z.numero}</td>
                                                                                                        <td>{z.cantidad}</td>
                                                                                                        <td>
                                                                                                        <MyComponent.botonDelete id={`${i} ${indexRechazo} ${indexZona} id_txtZona`} info = {`${i} ${indexRechazo} ${indexZona} id_txtZona`} onClick = { this.myDeleteZona } />
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                })
                                                                                            }
                                                                                        </tbody>
                                                                                    </Table>
                                                                                </Grid>
                                                                            </Grid>
                                                                            </Box>
                                                                    })
                                                                    :
                                                                    <div></div>
                                                                }
                                                            </div>
                                                })
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>  {/* CONTENEDOR PARADAS DE MAQUINA  */}
                                        <div className=''>
                                            <Typography variant = 'h2' style = { { marginBottom : 15 } } >Paradas de Maquina</Typography>
                                            <div className='contenedorFormPardasMaquina'>
                                                <MyComponent.numero
                                                    label = 'Cod PM'
                                                    value = { this.state.campoIdParaMaquina }
                                                    id = 'txt_idParadaMquina'
                                                    ref = { this.txt_campoIdParadaMaquina }
                                                    onChange = {
                                                        e => {
                                                            var PMselect = undefined
                                                            var horaHastaPM = document.getElementById ( 'txt_horaHastaParadaMaquina' )
                                                            horaHastaPM.disabled = false
                                                            this.setState ( {campoDesdeParadaMaquina : '' , campoHastaParadaMaquina : '' ,  setup : undefined } )
                                                            var value = 0
                                                            try { value = parseInt ( e.target.value) }  catch(e) { value = 0 }
                                                            PMselect = this.state.vecParadasMaquina.find ( pm => pm.idParadaMaquina === value )
                                                            if( PMselect === undefined ) {
                                                                this.setState({campoNombreParadaMaquina:'' , campoIdParaMaquina : ''})
                                                            }
                                                            else {
                                                                this.setState({campoNombreParadaMaquina:PMselect.nombreParadaMaquina , campoIdParaMaquina : e.target.value } )
                                                            }
                                                            console.log(PMselect !== undefined && this.state.campoNombreParadaMaquina !== '' , PMselect )
                                                            if ( PMselect !== undefined ) {
                                                                    if ( PMselect.setupParadaMaquina !== null ) {
                                                                        horaHastaPM.disabled = true
                                                                        this.setState ( {campoDesdeParadaMaquina : '' , campoHastaParadaMaquina : '' ,  setup : parseInt ( PMselect.setupParadaMaquina ) } )
                                                                    }
                                                                    else {
                                                                        horaHastaPM.disabled = false
                                                                        this.setState ( {campoDesdeParadaMaquina : '' , campoHastaParadaMaquina : '' ,  setup : undefined } )
                                                                    }
                                                            }
                                                            else {
                                                                horaHastaPM.disabled = false
                                                                this.setState ( {campoDesdeParadaMaquina : '' , campoHastaParadaMaquina : '' ,  setup : undefined } )
                                                            }
                                                        }
                                                    }
                                                />
                                                <MyComponent.texto
                                                    width = { 300 }
                                                    disabled = { true }
                                                    label = 'Paradas de Mq'
                                                    value = { this.state.campoNombreParadaMaquina }
                                                />
                                                <MyComponent.botonSearch fontSize = 'large' size = { 50 } texto = 'Search ' onClick = { ( info , e ) => { this.setState ( { showModalPM : true } ) } } />
                                                <ModalPM eventClose={this.eventClose} show={this.state.showModalPM} vecParadasMaquina={this.state.vecParadasMaquina}/>
                                                <MyComponent.hora
                                                    label = 'Desde'
                                                    id="txt_horaDesdeParadaMaquina"
                                                    name="txt_horaDesdeParadaMaquina"
                                                    value = { this.state.campoDesdeParadaMaquina }
                                                    onChange = { e => {
                                                        if ( e.target.value !== '06:00' && this.state.campoHastaParadaMaquina !== '06:00' && e.target.value === this.state.campoHastaParadaMaquina){
                                                            this.setState ( { campoDesdeParadaMaquina : '' } )
                                                        }
                                                        else{
                                                            try {
                                                                if ( e.target.value.length === 5 ) { console.log(this.state.setup)
                                                                    this.setState ( { campoDesdeParadaMaquina:e.target.value } )
                                                                    if(this.state.setup !== undefined ) {
                                                                        this.setState({campoHastaParadaMaquina : new Moment ( `2020-04-18T${e.target.value}:00.000` ).add ( this.state.setup , 'minutes' ).format ("HH:mm")})
                                                                    }
                                                                }
                                                            }
                                                            catch ( e ) {  }
                                                        }
                                                    } }
                                                />
                                                <MyComponent.hora
                                                    id="txt_horaHastaParadaMaquina"
                                                    label="Hasta"
                                                    name='txt_horaHastaParadaMaquina'
                                                    onChange = { e => {
                                                        if(e.target.value !== '06:00' && this.state.campoDesdeParadaMaquina !== '06:00' && e.target.value === this.state.campoDesdeParadaMaquina){
                                                            this.setState({campoHastaParadaMaquina:''})
                                                        }
                                                        else{
                                                            this.setState ( { campoHastaParadaMaquina : e.target.value } )
                                                        }
                                                    } }
                                                    value = { this.state.campoHastaParadaMaquina }
                                                />
                                                <MyComponent.botonAdd fontSize = 'large' size = { 50 } texto = 'Add paradaMaquina'  onClick = { this.capturaParaMaquina } />
                                            </div>
                                            <Alert ref = { this.alertPM } style = { { display:this.state.showAlert } } severity = "error">
                                                <Typography id='h6Alert' variant = 'h6' style = { { marginBottom : 15 } } >Error !</Typography>
                                                <div style = { { display : this.state.showAlert } } ></div>
                                            </Alert>
                                            <Table style = { { marginTop : '10px' } } >
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Nombre</th>
                                                        <th>Desde</th>
                                                        <th>Hasta</th>
                                                        <th>Duracion</th>
                                                        <th>Tipo</th>
                                                        <th>Editar</th>
                                                        <th>Eliminar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Array.isArray (  this.state.vecParadasMaquinaSeleccionada )?
                                                            this.state.vecParadasMaquinaSeleccionada.map ( ( parMaq,indexParadaMaq ) => {
                                                                return <tr key = { indexParadaMaq } >
                                                                    <td>{parMaq.idParadaMaquina}</td>
                                                                    <td>{parMaq.nombreParadaMaquina}</td>
                                                                    <td>{parMaq.desdeParadaMaquina}</td>
                                                                    <td>{parMaq.hastaParadaMaquina}</td>
                                                                    <td>{parMaq.duracionParadaMaquina + ' min'}</td>
                                                                    <td>{parMaq.tipoParadaMaquina ? 'No programa' : 'programada'}</td>
                                                                    <td>
                                                                        <MyComponent.botonUpdate id={` btn_update_pm ${indexParadaMaq}`} info = {`${indexParadaMaq} id_PMseleccionada`} onClick =  { this.myUpdate } />
                                                                    </td>
                                                                    <td>
                                                                    <MyComponent.botonDelete id={` btn_delet_pm ${indexParadaMaq}`} info = {indexParadaMaq} onClick =   { this.myDelete } />
                                                                    </td>
                                                                </tr>
                                                            })
                                                            :
                                                            <td></td>
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Grid>
                                </Grid>
                        </div>
                        <div>
                            <MyComponent.botonSave style = { { width : 300 , padding : 20 } } />
                        </div>
                </Form>
            </Box>
        )
    }
}

const maspStateToProps = store => { return { planillaUpdate : store.PlanillaProduccionUpdate } }
const wrapper = connect ( maspStateToProps )
const componentConectadoRedux = wrapper ( AltaPlanillaPRODUCCION )
export default withSnackbar ( componentConectadoRedux )