import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextField} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'

class modalPARADASDEMAQUINA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false,
            buscador:'',
            paradaMQseleccionada:undefined,
            vecParadasMaquina:undefined
        }
        this.lbx_pm = React.createRef()
        this.controller = new AbortController()
    }
    useStyles = makeStyles(theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
    }))
    static getDerivedStateFromProps(nextProps,nextState){
        var vec = undefined
        if(typeof nextProps.vecParadasMaquina === "object" ){
            vec = nextProps.vecParadasMaquina
        }
        return {
            show:nextProps.show,
            vecParadasMaquina: vec
        }
    }
    componentWillUnmount(){
        this.controller.abort()
    }
    render() {
        const classes = this.useStyles
        var vecESTADO = this.state.vecParadasMaquina
        var vecPM = []
        var regex = new RegExp(`(${this.state.buscador})`,'i')
        try{
        vecPM = vecESTADO.filter((pM)=>regex.test(`${pM.nombreParadaMaquina} ${pM.nombreArea} ${ pM.tipoParadaMaquina ? '(No Programada)' : '(Programada)'}`))
        }catch(e){vecPM = []}
        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.show} 
                    onClose={e=>{
                        this.setState({buscador: ''})
                        this.props.eventClose(undefined)
                        
                    } }
                    onKeyUp={
                        e=>{
                            var regex = new RegExp("^[a-zA-Z ]$")
                            if(e.key === 'Enter'){
                                if(this.state.paradaMQseleccionada === undefined){
                                }
                                else{
                                    this.props.eventClose(this.state.paradaMQseleccionada)
                                }
                            } //! PREGUNTO SI ES ENTER - QUE NO HAGA NADA
                            else{
                                if(e.key === 'Backspace'){ //! PREGUNTO SI ES BORRA QUE  BORRE Y SALGA
                                    this.lbx_pm.current.value=undefined
                                    this.setState({buscador:this.state.buscador.substring(0,this.state.buscador.length-1),paradaMQseleccionada:undefined})
                                }
                                else{
                                    if(! isNaN(e.key)){ // ! PREGUNTO SI ES NUMERO - QUE LO AGREGUE
                                        this.lbx_pm.current.value=undefined
                                        this.setState({buscador:this.state.buscador+e.key,paradaMQseleccionada:undefined})
                                    }
                                    else if (regex.test(e.key)){ //! PREGUNTO SI ES LETRA QUE LO AGREGUE
                                        this.lbx_pm.current.value=undefined
                                        this.setState({buscador:this.state.buscador+e.key,paradaMQseleccionada:undefined})
                                    }
                                    else{  } //! SI NO ES LETRA NI  NUMERO O ESPACIO QUE NO AGA NADA
                                }
                            }
                        }
                    }>
                    <DialogTitle>Paradas de maquina</DialogTitle>
                    <DialogContent>
                        <FormControl   className={classes.formControl} style={{width:'500px',borderRadius:'7px'}}>
                            <select
                                ref={this.lbx_pm}
                                multiple={true}
                                style={{borderRadius:'7px',height:'300px',border:'none'}}
                                onChange={e=>{this.setState({paradaMQseleccionada:e.target.value})}}
                                onDoubleClick={
                                    e=>{
                                    this.props.eventClose(this.state.paradaMQseleccionada)
                                    this.setState({paradaMQseleccionada:undefined, buscador: ''})
                                    }
                                }
                            >
                            {
                                vecPM !== undefined  ?
                                vecPM.map((pm,indexPM) => (
                                    <option style={{padding:'8px'}} key={indexPM} value={pm.idParadaMaquina}>
                                        {`${pm.nombreParadaMaquina} ${pm.nombreArea} ${ pm.tipoParadaMaquina ? '(No Programada)' : '(Programada)'}`}
                                    </option>
                                ))
                                :
                                <option></option>
                            }
                            </select>
                        </FormControl>
                        <form className={classes.container}>
                                <TextField
                                    style={{width:'500px'}}
                                    type='text'
                                    disabled={true}
                                    value={this.state.buscador}
                                >
                                </TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={e=>{this.setState({paradaMQseleccionada:undefined, buscador: '' });this.props.eventClose(undefined)}} color="primary">
                        Cancel
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default modalPARADASDEMAQUINA