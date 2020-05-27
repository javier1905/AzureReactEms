import Moment from 'moment'

const urlApi = process.env.REACT_APP_URL_API
var consultas = {  }
consultas.operaciones = async  (  ) => {
    var operaciones = []
    try {
        const response = await fetch(`${urlApi}/api/operaciones` , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { operaciones = [  ] }
        else { operaciones = await response.json (  ) }
    }
    catch ( e ) { operaciones = [  ] }
    return  operaciones
}
consultas.maquinas = async  (  ) => {
    var maquinas = []
    try {
        const response = await fetch(`${urlApi}/api/maquinas`, {
            method:'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { maquinas = [  ] }
        else { maquinas = await response.json (  ) }
    }
    catch ( e ) { maquinas = [  ] }
    return  maquinas
}
consultas.maquinasXoperaxion  = async  ( idOp ) => {
    var maquinas = []
    try {
        const response = await fetch( `${urlApi}/api/maquinas/xoperacion/${idOp}` , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { maquinas = [  ] }
        else { maquinas = await response.json (  ) }
    }
    catch ( e ) { maquinas = [  ] }
    return  maquinas
}
consultas.piezas = async  (  ) => {
    var pieza = []
    try {
        const response = await fetch(`${urlApi}/api/piezas`, {
            method:'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { pieza = [  ] }
        else { pieza = await response.json (  ) }
    }
    catch ( e ) { pieza = [  ] }
    return  pieza
}
consultas.piezasXmaquina = async  ( idMaq  ) => {
    var pieza = []
    try {
        const response = await fetch( `${urlApi}/api/piezas/xmaquina/${idMaq}` , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { pieza = [  ] }
        else { pieza = await response.json (  ) }
    }
    catch ( e ) { pieza = [  ] }
    return  pieza
}
consultas.moldesXpieza = async  ( idPie ) => {
    var id = null
    if ( idPie !== '' ) { id = idPie }
    var molde = []
    try {
        const response = await fetch(`${urlApi}/api/moldes/xpieza/${id}` , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { molde = [  ] }
        else { molde = await response.json (  ) }
    }
    catch ( e ) { molde = [  ] }
    return  molde
}
consultas.tipoProcesosXmaquinaYpieza = async  ( idPi , idMaq ) => {
    var tipoProceso = []
    const dato = {
        idPieza : parseInt ( idPi ) ,
        idMaquina : parseInt ( idMaq )
    }
    try {
        const response = await fetch( `${urlApi}/api/tiposProceso`, {
            method : 'POST',
            body : JSON.stringify ( dato ) ,
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { tipoProceso = [  ] }
        else { tipoProceso = await response.json (  ) }
    }
    catch ( e ) { tipoProceso = [  ] }
    return  tipoProceso
}
consultas.tipoProcesos = async  (  ) => {
    var tipoProceso = []
    try {
        const response = await fetch( `${urlApi}/api/tiposProceso` , {
            method : 'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { tipoProceso = [  ] }
        else { tipoProceso = await response.json (  ) }
    }
    catch ( e ) { tipoProceso = [  ] }
    return  tipoProceso
}
consultas.planillasProduccion = async ( fDesdeProduccion ,  fHastaProduccion ,
    fDesdeFundicion , fHastaFundicon , idMaq , idPie , idMol , idTipoPro ,  idOp ) => {
    var planillasProduccion = []
        const filtros = { fechaDesdeProduccion: new Moment(fDesdeProduccion).format('YYYY-MM-DDTHH:MM:ss.sss') ,
        fechaHastaProduccion: new Moment(fHastaProduccion).format('YYYY-MM-DDTHH:MM:ss.sss') ,
        fechaDesdeFundicion: new Moment(fDesdeFundicion).format('YYYY-MM-DDTHH:MM:ss.sss') ,
        fechaHastaFundicon: new Moment(fHastaFundicon).format('YYYY-MM-DDTHH:MM:ss.sss') ,
        idMaquina: idMaq === '' ? null : idMaq , idPieza: idPie === '' ? null : idPie ,
        idMolde: idMol === '' ? null : idMol , idTipoProceso : idTipoPro === '' ?null : idTipoPro  ,
        idOperacion : idOp === '' ? null : idOp
    }
    try {
        const response = await fetch( `${urlApi}/api/planillasProduccion/listar`,  {
            method : 'POST',
            body : JSON.stringify ( filtros ) ,
            headers : new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { planillasProduccion = [  ] }
        else { planillasProduccion = await response.json (  ) }
    }
    catch ( e ) { planillasProduccion = [  ] }
    return  planillasProduccion
}

export default consultas
