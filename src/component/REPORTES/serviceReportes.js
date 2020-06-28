import Moment from 'moment'
import Fechas from '../AAprimary/fechas'
var servicios = {}

const urlApi = process.env.REACT_APP_URL_API

servicios.listaPlantas = async () => {
    var vecPlantas = []
    try {
        const result = await fetch(`${urlApi}/api/plantas/list` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } )
        })
        if(result){
            const json = await result.json()
            if(json) {
                vecPlantas = json
            }
        }
    }
    catch(e) {
        vecPlantas = []
    }
    return vecPlantas
}
servicios.listaAreas = async (signal , abort) => {
    var vecAreas = []
    try {
        const result = await window.fetch(`${urlApi}/api/areas` ,{
            method : 'GET' ,
            headers :  new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : signal
        })
        if(result) {
            if(result.status !==  200) {
                abort()
            }
            const json = await result.json()
            if(json) {
                vecAreas = json
            }
        }
        else { abort()   }
    }
    catch(e) {
        if(e.name === 'AbortError') { abort()   }
        vecAreas = []
    }
    return vecAreas
}
servicios.listaAreas2 =  (abortController , callback ) => {
    var cont = 0
    var cont2 = 0
    const myFetch = () => {
        fetch(`${urlApi}/api/areas` ,{
                method : 'GET' ,
                headers :  new Headers ({
                    'Accept' : 'Application/json' ,
                    'Content-Type' : 'Application/json' ,
                    authorization : `Bearer ${sessionStorage.getItem('token')}`
                } ) ,
                signal : abortController.signal
        })
        .then(result => result.json())
        .then(json =>  {
            if(Array.isArray(json)) {
                callback(json)
            }
            else {
                cont ++
                if(cont < 4){
                    myFetch()
                }
            }
        } )
        .catch(e=> {
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            else {
                cont2 ++
                if(cont2 <4 ) {
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaReporteParadasMaquina =  ( idArea , fechaFundicionDesde , fechaFundicionHasta , abortController , callback  ) => {
    var cont = 0
    var cont2 = 0
    const myFetch = () => {
        fetch(`${urlApi}/api/reportes/paradasMaquina` , {
            method : 'POST' ,
            body : JSON.stringify ( {  idArea , fechaFundicionDesde , fechaFundicionHasta  } ),
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        })
        .then(result => result.json())
        .then(json => {
            if(Array.isArray(json)) {
                var vecLabels = []
                var vecValues = []
                json.forEach( e => {
                    vecLabels.push(e.nombreMaquina)
                    vecValues.push(e.Duracion)
                })
                callback(vecLabels,vecValues)
            }
            else {
                cont ++
                if(cont < 4) {
                    myFetch()
                }
            }
        })
        .catch(e=>{
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            else {
                cont2++
                if(cont2 < 4){
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaDetallePMxMaquina =  (fechaDesdeFundicion , fechaHastaFundicion , nombreMaquina,idArea , abortController , callback) => {
    var cont = 0
    var cont2 = 0
    const myFetch = () =>  {
        fetch(`${urlApi}/api/reportes/detalleParaMaquinaXmaquina` , {
            method: 'POST' ,
            body : JSON.stringify ({ fechaDesdeFundicion , fechaHastaFundicion , nombreMaquina,idArea }) ,
            headers: new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        })
        .then( result => result.json() )
        .then( json => {
            cont ++
            if(Array.isArray(json)) {
                callback(json)
            }
            else {
                if(cont < 4){
                    myFetch()
                }
            }
        } )
        .catch( e=> {
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            else {
                cont2 ++
                if(cont2 < 4) {
                    myFetch()
                }
            }
        } )
    }
    myFetch()
}
servicios.listaReporteParadasMaquinaxPM =  (fechaDesdeFundicion , fechaHastaFundicion , abortController , callback ) => {
    var cont = 0
    var cont2 = 0
    const myFetch = ()  => {
        fetch( `${urlApi}/api/reportes/paradasMaquinaXpm`, {
            method : 'POST' ,
            body : JSON.stringify ({fechaDesdeFundicion , fechaHastaFundicion}) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        })
        .then(result => result.json())
        .then(json => {
            if(Array.isArray(json)) {
                var vecLabels = []
                var vecValues = []
                json.sort((a ,b) => b.duracion -a.duracion)
                json.forEach ( pm => {
                    vecLabels.push(`${pm.nombreParadaMaquina} -- ${pm.nombreArea}`)
                    vecValues.push(pm.duracion)
                })
                callback(vecLabels , vecValues)
            }
            else {
                cont ++
                if(cont <4){
                    myFetch()
                }
            }
        })
        .catch(e => {
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            else {
                cont2 ++
                if(cont2 <4){
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaDetalleParadasMaquinaxPM =  (fechaDesdeFundicion , fechaHastaFundicion , nombreParadaMaquina , abortController , callback) => {
    var cont = 0
    var cont2 = 0
    const myFetch = ()=> {
        fetch( `${urlApi}/api/reportes/detalleParaMaquinaXpm`, {
            method : 'POST' ,
            body : JSON.stringify ({fechaDesdeFundicion , fechaHastaFundicion , nombreParadaMaquina}) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        })
        .then (result => result.json())
        .then (json => {
            if(Array.isArray(json)){
                callback(json)
            }
            else {
                cont ++
                if(cont < 4) {
                    myFetch()
                }
            }
        })
        .catch( e=> {
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            else {
                cont2 ++
                if(cont2 < 4) {
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaOeeFundicion =  ( idMaquina , idPieza , idMolde , fechaFundicionDesde , fechaFundicionHasta , idAgrupar , abortController , callback ) => {
    var cont = 0
    var cont2 = 0
    const myFetch = ()=> {
            fetch ( `${urlApi}/api/oee/fundicion` , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaFundicionDesde , fechaFundicionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        } )
        .then(result => result.json())
        .then(json => {
            if (Array.isArray ( json )) {
                json.sort(dato => dato.fechaFundicion)
                var vecP1 = json.filter ( items => items.idPlanta === 1 )
                var vecP2 = json.filter ( items => items.idPlanta === 2 )
                const unificadorVecP1 = ( vecP1 ) => {
                    if ( idAgrupar === 2 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = `SEM${new Moment (e.fechaFundicion).add(1 , 'd').week()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = `${String(e.fechaFundicion).substring(5,7)}/${String(e.fechaFundicion).substring(0,4)}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = parseInt ( String(e.fechaFundicion).substring(0,4) )
                        } )
                    }
                    var vecUnificadoP1 = [  ]
                    vecP1.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaFundicion : null ,
                            idPlanta : 1 ,
                            idMaquina : undefined ,
                            nombreMaquina : null ,
                            idPieza : undefined ,
                            nombrePieza : null ,
                            idMolde : undefined ,
                            nombreMolde : null ,
                            piezasXhora : null ,
                            produccion : 0 ,
                            pmMatrizeria : 0 ,
                            pmMantenimiento : 0 ,
                            pmProduccion : 0 ,
                            pmOtros : 0 ,
                            totalPNP : 0 ,
                            pmProgramada : 0 ,
                            setup : 0 ,
                            totalrechazosPlanta2 : 0 ,
                            totalrechazosPlanta1 : 0 ,
                            minTotal : 0
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificadoP1 ) && vecUnificadoP1.length > 0 ) {
                        vecUnificadoP1.forEach ( ( e , i ) => {
                            if ( items.fechaFundicion === e.fechaFundicion && items.idMaquina === e.idMaquina &&
                                items.idPieza === e.idPieza && items.idMolde === e.idMolde && items.piezasXhora === e.piezasXhora ) {
                                    encontro = true
                                }
                        } ) }
                        if ( encontro === false  ) {
                            var vecFiltrado = vecP1
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaFundicion === d.fechaFundicion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde && items.piezasXhora === d.piezasXhora ) )
                            newItems.fechaFundicion = items.fechaFundicion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            newItems.piezasXhora = items.piezasXhora
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.produccion += elem.produccion === null ? 0 : parseInt ( elem.produccion )
                                newItems.totalrechazosPlanta1 += elem.totalrechazosPlanta1 === null ? 0 : parseInt ( elem.totalrechazosPlanta1 )
                                newItems.totalrechazosPlanta2 += elem.totalrechazosPlanta2 === null ? 0 : parseInt ( elem.totalrechazosPlanta2 )
                                newItems.pmMatrizeria += elem.pmMatrizeria === null ? 0 : parseInt ( elem.pmMatrizeria )
                                newItems.pmMantenimiento += elem.pmMantenimiento === null ? 0 : parseInt ( elem.pmMantenimiento )
                                newItems.pmProduccion += elem.pmProduccion === null ? 0 : parseInt ( elem.pmProduccion )
                                newItems.pmOtros += elem.pmOtros === null ? 0 : parseInt ( elem.pmOtros )
                                newItems.totalPNP += elem.totalPNP === null ? 0 : parseInt ( elem.totalPNP )
                                newItems.pmProgramada += elem.pmProgramada === null ? 0 : parseInt ( elem.pmProgramada )
                                newItems.minTotal += elem.minTotal === null ? 0 : parseInt ( elem.minTotal )
                                newItems.setup += elem.setup === null ? 0 : parseInt ( elem.setup )
                            })
                            vecUnificadoP1.push ( newItems )
                        }
                    } )
                    return vecUnificadoP1
                }
                const unificadorVecP2 = ( vecP2 ) => {
                    var vecUnificadoP2 = [  ]
                    if ( idAgrupar === 2 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = `SEM${new Moment (e.fechaFundicion).add(1 , 'd').week()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = `${String(e.fechaFundicion).substring(5,7)}/${String(e.fechaFundicion).substring(0,4)}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = parseInt ( String(e.fechaFundicion).substring(0,4) )
                        } )
                    }
                    vecP2.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaFundicion : null ,
                            idPlanta : 2 ,
                            idMaquina : undefined ,
                            nombreMaquina : null ,
                            idPieza : undefined ,
                            nombrePieza : null ,
                            idMolde : undefined ,
                            nombreMolde : null ,
                            piezasXhora : items.piezasXhora ,
                            produccion : null ,
                            pmMatrizeria : null ,
                            pmMantenimiento : null ,
                            pmProduccion : null ,
                            pmOtros : null ,
                            totalPNP : null ,
                            pmProgramada : null ,
                            setup : null ,
                            totalrechazosPlanta2 : 0 ,
                            totalrechazosPlanta1 : null ,
                            minTotal : null
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificadoP2 ) && vecUnificadoP2.length > 0 ) {
                        vecUnificadoP2.forEach ( ( e , i ) => {
                            if ( items.fechaFundicion === e.fechaFundicion && items.idMaquina === e.idMaquina &&
                                items.idPieza === e.idPieza && items.idMolde === e.idMolde ) {
                                    encontro = true
                                }
                        } ) }
                        if ( encontro === false  ) {
                            var vecFiltrado = vecP2
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaFundicion === d.fechaFundicion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde  ) )
                            newItems.fechaFundicion = items.fechaFundicion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.totalrechazosPlanta2 += elem.totalrechazosPlanta2 === null ? 0 : parseInt ( elem.totalrechazosPlanta2 )
                            })
                            vecUnificadoP2.push ( newItems )
                        }
                    } )
                    return vecUnificadoP2
                }
                const unificadorP1conP2 = ( vecPlantaUno , vecPlantaDos ) => {
                    var vecFinal = vecPlantaUno
                    vecPlantaDos.forEach ( ( p2 , i ) => {
                        vecPlantaUno.forEach ( ( p1 , index ) => {
                            if ( p2.fechaFundicion === p1.fechaFundicion  && p2.idPieza === p1.idPieza && p2.idMolde === p1.idMolde ) {
                                vecFinal[index].totalrechazosPlanta2 += p2.totalrechazosPlanta2 === null ? 0 : parseInt ( p2.totalrechazosPlanta2 )
                            }
                        } )
                    } )
                    var vecNoEncontrados =[ ]
                    vecPlantaDos.forEach ( ( p2 , i ) => {
                        var elemento = undefined
                        vecPlantaUno.forEach ( ( p1 , indexp1 ) => {
                            if ( p2.fechaFundicion === p1.fechaFundicion  && p2.idPieza === p1.idPieza && p2.idMolde === p1.idMolde ) {
                                elemento = p2
                            }
                        } )
                        if ( elemento === undefined ) {
                            if ( p2.totalrechazosPlanta2 > 0 ) {
                                vecNoEncontrados.push ( p2 )
                            }
                        }
                    } )
                    vecFinal = vecFinal.concat ( vecNoEncontrados )
                    return vecFinal
                }
                var vecP1MasvecP2 = unificadorP1conP2 ( unificadorVecP1( vecP1 ) , unificadorVecP2( vecP2 ) )
                var newItems2 = {
                    fechaFundicion : null ,
                    idPlanta : null  ,
                    idMaquina : undefined ,
                    nombreMaquina : null ,
                    idPieza : undefined ,
                    nombrePieza : null ,
                    idMolde : undefined ,
                    nombreMolde : null ,
                    piezasXhora : null ,
                    produccion : 0 ,
                    pmMatrizeria : 0 ,
                    pmMantenimiento : 0 ,
                    pmProduccion : 0 ,
                    pmOtros : 0 ,
                    totalPNP : 0 ,
                    pmProgramada : 0 ,
                    setup : 0 ,
                    totalrechazosPlanta2 : 0 ,
                    totalrechazosPlanta1 : 0 ,
                    minTotal : 0 ,
                    minNoCalidad : 0 ,
                    minPorPiezaProducidas : 0
                }
                vecP1MasvecP2.forEach ( ( e , i ) => {
                    if ( e.idPlanta === 1  ) {
                        newItems2.produccion += parseInt ( e.produccion )
                        newItems2.pmMatrizeria += parseInt ( e.pmMatrizeria )
                        newItems2.pmMantenimiento += parseInt ( e.pmMantenimiento )
                        newItems2.pmProduccion += parseInt ( e.pmProduccion )
                        newItems2.pmOtros += parseInt ( e.pmOtros )
                        newItems2.totalPNP += parseInt ( e.totalPNP )
                        newItems2.pmProgramada += parseInt ( e.pmProgramada )
                        newItems2.setup += parseInt ( e.setup )
                        newItems2.minTotal += parseInt ( e.minTotal )
                        newItems2.totalrechazosPlanta1 += parseInt ( e.totalrechazosPlanta1 )
                        vecP1MasvecP2[i].minNoCalidad = ( parseInt ( e.totalrechazosPlanta2 ) + parseInt ( e.totalrechazosPlanta1 ) ) * 60 / parseInt ( e.piezasXhora )
                        vecP1MasvecP2[i].minPorPiezaProducidas = ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                        newItems2.minPorPiezaProducidas += ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                    }
                    else {
                        vecP1MasvecP2[i].minNoCalidad = 0
                    }
                    newItems2.minNoCalidad += ( parseInt ( e.totalrechazosPlanta2 === null ? 0 : e.totalrechazosPlanta2 ) + parseInt ( e.totalrechazosPlanta1 === null ? 0 : e.totalrechazosPlanta1 ) ) * 60 / parseInt ( e.piezasXhora )
                    newItems2.totalrechazosPlanta2 += parseInt ( e.totalrechazosPlanta2 === null ? 0 : e.totalrechazosPlanta2 )
                } )
                if ( vecP1MasvecP2.length > 0 ) {
                vecP1MasvecP2.push ( newItems2 )
                }
                callback ( vecP1MasvecP2 )
            }
            else {
                cont ++
                if(cont < 4) 
                myFetch()
            }
        })
        .catch( e=> {
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            else {
                cont2 ++
                if(cont2 <4 )
                {
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaOeeFundicionGrafico =  ( idMaquina , idPieza , idMolde , fechaFundicionDesde , fechaFundicionHasta , idAgrupar , abortController , callback  ) => {
    var cont = 0
    var cont2 = 0
    const myFetch = () =>  {
        fetch ( `${urlApi}/api/oee/fundicion` , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaFundicionDesde , fechaFundicionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        } )
        .then( result => result.json())
        .then( json => {
            if (Array.isArray(json)) {
                if ( json.length > 0 ){
                    var vecP1 = json.sort( d => d.fechaFundicion).filter(
                        items => items.idPlanta === 1
                    )
                    var vecP2 = json.sort( d => d.fechaFundicion).filter(
                        items => items.idPlanta === 2
                    )
                    const unificadorVecP1 = vecP1 => {
                        if (idAgrupar === 2) {
                            vecP1.forEach((e, i) => {
                                let dia = parseInt ( String(e.fechaFundicion).substring(8,10) )
                                let mes = parseInt ( String(e.fechaFundicion).substring(5,7) ) - 1
                                let anio = parseInt ( String(e.fechaFundicion).substring(0,4) )
                                var fe = new Moment ( {y:anio, M:mes , d:dia , h:2,m:0,s:0,ms:0})
                                if (fe.format('DD/MM/YYYY') === `31/12/${anio}` && fe.week() === 1){
                                    vecP1[i].fechaFundicion = `SEM53/${new Moment (e.fechaFundicion).year()+1}`
                                }
                                else {
                                    vecP1[i].fechaFundicion = `SEM${fe.week()}/${fe.year()}`
                                }
                            })
                        } else if (idAgrupar === 3) {
                            vecP1.forEach((e, i) => {
                                vecP1[i].fechaFundicion = `${String(e.fechaFundicion).substring(5,7)}/${String(e.fechaFundicion).substring(0,4)}`
                            })
                        } else if (idAgrupar === 4) {
                            vecP1.forEach((e, i) => {
                                vecP1[i].fechaFundicion = parseInt ( String(e.fechaFundicion).substring(0,4) )
                            })
                        }
                        var vecUnificadoP1 = []
                        vecP1.forEach((items, i) => {
                            var newItems = {
                                fechaFundicion: null,
                                idPlanta: 1,
                                idMaquina: undefined,
                                nombreMaquina: null,
                                idPieza: undefined,
                                nombrePieza: null,
                                idMolde: undefined,
                                nombreMolde: null,
                                piezasXhora: null,
                                produccion: 0,
                                pmMatrizeria: 0,
                                pmMantenimiento: 0,
                                pmProduccion: 0,
                                pmOtros: 0,
                                totalPNP: 0,
                                pmProgramada: 0,
                                setup: 0,
                                totalrechazosPlanta2: 0,
                                totalrechazosPlanta1: 0,
                                minTotal: 0
                            }
                            var encontro = false
                            if (Array.isArray(vecUnificadoP1) && vecUnificadoP1.length > 0) {
                                vecUnificadoP1.forEach((e, i) => {
                                    if (
                                        items.fechaFundicion === e.fechaFundicion &&
                                        items.idMaquina === e.idMaquina &&
                                        items.idPieza === e.idPieza &&
                                        items.idMolde === e.idMolde &&
                                        items.piezasXhora === e.piezasXhora
                                    ) {
                                        encontro = true
                                    }
                                })
                            }
                            if (encontro === false) {
                                var vecFiltrado = vecP1
                                vecFiltrado = vecFiltrado.filter(
                                    d =>
                                        items.fechaFundicion === d.fechaFundicion &&
                                        items.idMaquina === d.idMaquina &&
                                        items.idPieza === d.idPieza &&
                                        items.idMolde === d.idMolde &&
                                        items.piezasXhora === d.piezasXhora
                                )
                                newItems.fechaFundicion = items.fechaFundicion
                                newItems.idMaquina = items.idMaquina
                                newItems.nombreMaquina = items.nombreMaquina
                                newItems.idPieza = items.idPieza
                                newItems.nombrePieza = items.nombrePieza
                                newItems.idMolde = items.idMolde
                                newItems.nombreMolde = items.nombreMolde
                                newItems.piezasXhora = items.piezasXhora
                                vecFiltrado.forEach((elem, i) => {
                                    newItems.produccion +=
                                        elem.produccion === null ? 0 : parseInt(elem.produccion)
                                    newItems.totalrechazosPlanta1 +=
                                        elem.totalrechazosPlanta1 === null
                                            ? 0
                                            : parseInt(elem.totalrechazosPlanta1)
                                    newItems.totalrechazosPlanta2 +=
                                        elem.totalrechazosPlanta2 === null
                                            ? 0
                                            : parseInt(elem.totalrechazosPlanta2)
                                    newItems.pmMatrizeria +=
                                        elem.pmMatrizeria === null ? 0 : parseInt(elem.pmMatrizeria)
                                    newItems.pmMantenimiento +=
                                        elem.pmMantenimiento === null
                                            ? 0
                                            : parseInt(elem.pmMantenimiento)
                                    newItems.pmProduccion +=
                                        elem.pmProduccion === null ? 0 : parseInt(elem.pmProduccion)
                                    newItems.pmOtros +=
                                        elem.pmOtros === null ? 0 : parseInt(elem.pmOtros)
                                    newItems.totalPNP +=
                                        elem.totalPNP === null ? 0 : parseInt(elem.totalPNP)
                                    newItems.pmProgramada +=
                                        elem.pmProgramada === null ? 0 : parseInt(elem.pmProgramada)
                                    newItems.setup += elem.setup === null ? 0 : parseInt(elem.setup)
                                    newItems.minTotal +=
                                        elem.minTotal === null ? 0 : parseInt(elem.minTotal)
                                })
                                vecUnificadoP1.push(newItems)
                            }
                        })
                        return vecUnificadoP1
                    }
                    const unificadorVecP2 = vecP2 => {
                        var vecUnificadoP2 = []
                        if (idAgrupar === 2) {
                            vecP2.forEach((e, i) => {
                                let dia = parseInt ( String(e.fechaFundicion).substring(8,10) )
                                let mes = parseInt ( String(e.fechaFundicion).substring(5,7) ) - 1
                                let anio = parseInt ( String(e.fechaFundicion).substring(0,4) )
                                var fe = new Moment ( {y:anio, M:mes , d:dia , h:2,m:0,s:0,ms:0})
                                if (fe.format('DD/MM/YYYY') === `31/12/${anio}` && fe.week() === 1){
                                    vecP2[i].fechaFundicion = `SEM53/${new Moment (e.fechaFundicion).year()+1}`
                                }
                                else {
                                    vecP2[i].fechaFundicion = `SEM${fe.week()}/${fe.year()}`
                                }
                            })
                        } else if (idAgrupar === 3) {
                            vecP2.forEach((e, i) => {
                                vecP2[i].fechaFundicion = `${String(e.fechaFundicion).substring(5,7)}/${String(e.fechaFundicion).substring(0,4)}`
                            })
                        } else if (idAgrupar === 4) {
                            vecP2.forEach((e, i) => {
                                vecP2[i].fechaFundicion = new Moment(e.fechaFundicion).year()
                            })
                        }
                        vecP2.forEach((items, i) => {
                            var newItems = {
                                fechaFundicion: null,
                                idPlanta: 2,
                                idMaquina: undefined,
                                nombreMaquina: null,
                                idPieza: undefined,
                                nombrePieza: null,
                                idMolde: undefined,
                                nombreMolde: null,
                                piezasXhora: items.piezasXhora,
                                produccion: null,
                                pmMatrizeria: null,
                                pmMantenimiento: null,
                                pmProduccion: null,
                                pmOtros: null,
                                totalPNP: null,
                                pmProgramada: null,
                                setup: null,
                                totalrechazosPlanta2: 0,
                                totalrechazosPlanta1: null,
                                minTotal: null
                            }
                            var encontro = false
                            if (Array.isArray(vecUnificadoP2) && vecUnificadoP2.length > 0) {
                                vecUnificadoP2.forEach((e, i) => {
                                    if (
                                        items.fechaFundicion === e.fechaFundicion &&
                                        items.idMaquina === e.idMaquina &&
                                        items.idPieza === e.idPieza &&
                                        items.idMolde === e.idMolde
                                    ) {
                                        encontro = true
                                    }
                                })
                            }
                            if (encontro === false) {
                                var vecFiltrado = vecP2
                                vecFiltrado = vecFiltrado.filter(
                                    d =>
                                        items.fechaFundicion === d.fechaFundicion &&
                                        items.idMaquina === d.idMaquina &&
                                        items.idPieza === d.idPieza &&
                                        items.idMolde === d.idMolde
                                )
                                newItems.fechaFundicion = items.fechaFundicion
                                newItems.idMaquina = items.idMaquina
                                newItems.nombreMaquina = items.nombreMaquina
                                newItems.idPieza = items.idPieza
                                newItems.nombrePieza = items.nombrePieza
                                newItems.idMolde = items.idMolde
                                newItems.nombreMolde = items.nombreMolde
                                vecFiltrado.forEach((elem, i) => {
                                    newItems.totalrechazosPlanta2 +=
                                        elem.totalrechazosPlanta2 === null
                                            ? 0
                                            : parseInt(elem.totalrechazosPlanta2)
                                })
                                vecUnificadoP2.push(newItems)
                            }
                        })
                        return vecUnificadoP2
                    }
                    const unificadorP1conP2 = (vecPlantaUno, vecPlantaDos) => {
                        var vecFinal = vecPlantaUno
                        vecPlantaDos.forEach((p2, i) => {
                            vecPlantaUno.forEach((p1, index) => {
                                if (
                                    p2.fechaFundicion === p1.fechaFundicion &&
                                    p2.idPieza === p1.idPieza &&
                                    p2.idMolde === p1.idMolde
                                ) {
                                    vecFinal[index].totalrechazosPlanta2 +=
                                        p2.totalrechazosPlanta2 === null
                                            ? 0
                                            : parseInt(p2.totalrechazosPlanta2)
                                }
                            })
                        })
                        var vecNoEncontrados = []
                        vecPlantaDos.forEach((p2, i) => {
                            var elemento = undefined
                            vecPlantaUno.forEach((p1, indexp1) => {
                                if (
                                    p2.fechaFundicion === p1.fechaFundicion &&
                                    p2.idPieza === p1.idPieza &&
                                    p2.idMolde === p1.idMolde
                                ) {
                                    elemento = p2
                                }
                            })
                            if (elemento === undefined) {
                                if (p2.totalrechazosPlanta2 > 0) {
                                    vecNoEncontrados.push(p2)
                                }
                            }
                        })
                        vecFinal = vecFinal.concat(vecNoEncontrados)
                        return vecFinal
                    }
                    var vecP1MasvecP2 = unificadorP1conP2(
                        unificadorVecP1(vecP1),
                        unificadorVecP2(vecP2)
                    )
                    var vecFechas = []
                    vecP1MasvecP2.forEach((el, i) => {
                        var fechaEncontrada = false
                        vecFechas.forEach((f, index) => {
                            if (f === el.fechaFundicion) {
                                fechaEncontrada = true
                                return
                            }
                        })
                        if (fechaEncontrada === false) {
                            vecFechas.push(el.fechaFundicion)
                        }
                    })
                    var vecFinal = []
                    vecFechas.sort()
                    vecFechas.forEach((e, i) => {
                        var ele = {
                            fecha:
                                idAgrupar === 1
                                    ? Fechas.SQL_a_DD_MM_YYYY(e)
                                    : e,
                            minTotal: 0,
                            pmProgramada: 0,
                            setup: 0,
                            totalPNP: 0,
                            minNoCalidad: 0,
                            minPorPiezaProducidas: 0
                        }
                        vecP1MasvecP2.forEach((elementos, ind) => {
                            if (e === elementos.fechaFundicion) {
                                if (elementos.idPlanta === 1) {
                                    ele.minTotal +=
                                        elementos.minTotal === null ? 0 : parseInt(elementos.minTotal)
                                    ele.pmProgramada +=
                                        elementos.pmProgramada === null
                                            ? 0
                                            : parseInt(elementos.pmProgramada)
                                    ele.setup +=
                                        elementos.setup === null ? 0 : parseInt(elementos.setup)
                                    ele.totalPNP +=
                                        elementos.totalPNP === null ? 0 : parseInt(elementos.totalPNP)
                                    ele.minNoCalidad +=
                                        ele.minNoCalidad === null
                                            ? 0
                                            : ((parseInt(elementos.totalrechazosPlanta2) +
                                                    parseInt(elementos.totalrechazosPlanta1)) *
                                                    60) /
                                                parseInt(elementos.piezasXhora)
                                    ele.minPorPiezaProducidas +=
                                        ele.minPorPiezaProducidas === null
                                            ? 0
                                            : (parseInt(elementos.produccion) * 60) /
                                                parseInt(elementos.piezasXhora)
                                } else if (elementos.idPlanta === 2) {
                                    ele.minNoCalidad +=
                                        ele.minNoCalidad === null
                                            ? 0
                                            : (parseInt(elementos.totalrechazosPlanta2) * 60) /
                                                parseInt(elementos.piezasXhora)
                                }
                            }
                        })
                        vecFinal.push(ele)
                    })
                    if (vecFinal.length > 0) {
                        var ele = {
                            fecha: 'Acumulado',
                            minTotal: 0,
                            pmProgramada: 0,
                            setup: 0,
                            totalPNP: 0,
                            minNoCalidad: 0,
                            minPorPiezaProducidas: 0
                        }
                        vecFinal.forEach((dato, indexDatos) => {
                            ele.minTotal += dato.minTotal
                            ele.pmProgramada += dato.pmProgramada
                            ele.setup += dato.setup
                            ele.totalPNP += dato.totalPNP
                            ele.minNoCalidad += dato.minNoCalidad
                            ele.minPorPiezaProducidas += dato.minPorPiezaProducidas
                        })
                        vecFinal.push(ele)
                    }
                    var vecFech = []
                    var vecD = []
                    var vecR = []
                    var vecQ = []
                    var vecOEE = []
                    var vecColoress = []
                    var vecObjetivoMinn = []
                    var vecObjetivoMaxx = []
                    vecFinal.forEach((e, i) => {
                        var dato = (
                            ((e.minTotal - e.pmProgramada - e.setup - e.totalPNP) /
                                (e.minTotal - e.pmProgramada - e.setup)) *
                            (e.minPorPiezaProducidas /
                                (e.minTotal - e.pmProgramada - e.setup - e.totalPNP)) *
                            (1 -
                                e.minNoCalidad /
                                    (e.minTotal - e.pmProgramada - e.setup - e.totalPNP)) *
                            100
                        ).toFixed(2)
                        vecFech.push(e.fecha)
                        vecD.push(
                            isNaN(
                                (
                                    ((e.minTotal - e.pmProgramada - e.setup - e.totalPNP) /
                                        (e.minTotal - e.pmProgramada - e.setup)) *
                                    100
                                ).toFixed(2)
                            )
                                ? 0
                                : (
                                        ((e.minTotal - e.pmProgramada - e.setup - e.totalPNP) /
                                            (e.minTotal - e.pmProgramada - e.setup)) *
                                        100
                                    ).toFixed(2)
                        )
                        vecR.push(
                            isNaN(
                                (
                                    (e.minPorPiezaProducidas /
                                        (e.minTotal - e.pmProgramada - e.setup - e.totalPNP)) *
                                    100
                                ).toFixed(2)
                            )
                                ? 0
                                : (
                                        (e.minPorPiezaProducidas /
                                            (e.minTotal - e.pmProgramada - e.setup - e.totalPNP)) *
                                        100
                                    ).toFixed(2)
                        )
                        vecQ.push(
                            isNaN(
                                (
                                    (1 -
                                        e.minNoCalidad /
                                            (e.minTotal - e.pmProgramada - e.setup - e.totalPNP)) *
                                    100
                                ).toFixed(2)
                            )
                                ? 0
                                : (1 -
                                        e.minNoCalidad /
                                            (e.minTotal - e.pmProgramada - e.setup - e.totalPNP)) *
                                        100 ===
                                    -Infinity
                                ? 0
                                : (
                                        (1 -
                                            e.minNoCalidad /
                                                (e.minTotal - e.pmProgramada - e.setup - e.totalPNP)) *
                                        100
                                    ).toFixed(2)
                        )
                        vecOEE.push(isNaN(dato) ? 0 : dato)
                        vecObjetivoMinn.push(50)
                        vecObjetivoMaxx.push(70)
                        vecColoress.push(
                            i === vecFinal.length - 1 ? 'grey' : 'rgb(55, 49, 138)'
                        )
                    })
                    callback(
                        vecFech
                        ,vecD
                        ,vecR
                        ,vecQ
                        ,vecOEE
                        ,vecColoress
                        ,vecObjetivoMinn
                        ,vecObjetivoMaxx
                    )
                }
                else{
                    callback([] ,[] , [] , [] , [] , [] , [] ,[])
                }
            }
            else {
                cont ++
                if(cont < 4) {
                    myFetch()
                }
            }
        })
        .catch (e=> {
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            else{
                cont2 ++
                if(cont2 < 4) {
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaOeeGranallado =  ( idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta , idAgrupar , abortController ,callback ) => {
    var cont = 0
    var cont2 = 0
    const myFetch = () => {
        fetch ( `${urlApi}/api/oee/granallado`  , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        })
        .then(result => result.json())
        .then(json => {
            if ( json && Array.isArray ( json )) {
                if(json.length > 0 ) {
                var datosOEE = json
                const agrupador = (  ) => {
                    if ( idAgrupar === 2 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            // datosOEE[i].fechaProduccion = `SEM${new Moment (e.fechaProduccion).add(1 , 'd').week()}/${new Moment (e.fechaProduccion).year()}`
                            datosOEE[i].fechaProduccion =`SEM${new Moment (e.fechaProduccion).add(1 , 'd').week()}/${new Moment (e.fechaProduccion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            // datosOEE[i].fechaProduccion = `${new Moment (e.fechaProduccion).add( 1 , 'd' ).add( 1, 'months' ).month()}/${new Moment (e.fechaProduccion).year()}`
                            datosOEE[i].fechaProduccion = `${String(e.fechaProduccion).substring(5,7)}/${String(e.fechaProduccion).substring(0,4)}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            // datosOEE[i].fechaProduccion = new Moment (e.fechaProduccion).year()
                            datosOEE[i].fechaProduccion = parseInt ( String(e.fechaProduccion).substring(0,4) )
                        } )
                    }
                    var vecUnificado = [  ]
                    datosOEE.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaProduccion : null ,
                            idMaquina : undefined ,
                            nombreMaquina : null ,
                            idPieza : undefined ,
                            nombrePieza : null ,
                            idMolde : undefined ,
                            nombreMolde : null ,
                            piezasXhora : null ,
                            produccion : 0 ,
                            pmMatrizeria : 0 ,
                            pmMantenimiento : 0 ,
                            pmProduccion : 0 ,
                            totalPNP : 0 ,
                            pmProgramada : 0 ,
                            totalRechazos : 0 ,
                            minTotal : 0
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificado ) && vecUnificado.length > 0 ) {
                            vecUnificado.forEach ( ( e , i ) => {
                                if ( items.fechaProduccion === e.fechaProduccion && items.idMaquina === e.idMaquina &&
                                    items.idPieza === e.idPieza && items.idMolde === e.idMolde && items.piezasXhora === e.piezasXhora ) {
                                        encontro = true
                                    }
                            } )
                        }
                        if ( encontro === false  ) {
                            var vecFiltrado = datosOEE
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaProduccion === d.fechaProduccion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde && items.piezasXhora === d.piezasXhora ) )
                            newItems.fechaProduccion = items.fechaProduccion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            newItems.piezasXhora = items.piezasXhora
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.produccion += elem.produccion === null ? 0 : parseInt ( elem.produccion )
                                newItems.totalRechazos += elem.totalRechazos === null ? 0 : parseInt ( elem.totalRechazos )
                                newItems.pmMatrizeria += elem.pmMatrizeria === null ? 0 : parseInt ( elem.pmMatrizeria )
                                newItems.pmMantenimiento += elem.pmMantenimiento === null ? 0 : parseInt ( elem.pmMantenimiento )
                                newItems.pmProduccion += elem.pmProduccion === null ? 0 : parseInt ( elem.pmProduccion )
                                newItems.totalPNP += elem.totalPNP === null ? 0 : parseInt ( elem.totalPNP )
                                newItems.pmProgramada += elem.pmProgramada === null ? 0 : parseInt ( elem.pmProgramada )
                                newItems.minTotal += elem.minTotal === null ? 0 : parseInt ( elem.minTotal )
                            } )
                            vecUnificado.push ( newItems )
                        }
                    } )
                    var newItems2 = {
                        fechaProduccion : null ,
                        idPlanta : null  ,
                        idMaquina : undefined ,
                        nombreMaquina : null ,
                        idPieza : undefined ,
                        nombrePieza : null ,
                        idMolde : undefined ,
                        nombreMolde : null ,
                        piezasXhora : null ,
                        produccion : 0 ,
                        pmMatrizeria : 0 ,
                        pmMantenimiento : 0 ,
                        pmProduccion : 0 ,
                        totalPNP : 0 ,
                        pmProgramada : 0 ,
                        totalRechazos : 0 ,
                        minTotal : 0 ,
                        minNoCalidad : 0 ,
                        minPorPiezaProducidas : 0
                    }
                    vecUnificado.forEach ( ( e , i ) => {
                        newItems2.produccion += parseInt ( e.produccion )
                        newItems2.pmMatrizeria += parseInt ( e.pmMatrizeria )
                        newItems2.pmMantenimiento += parseInt ( e.pmMantenimiento )
                        newItems2.pmProduccion += parseInt ( e.pmProduccion )
                        newItems2.totalPNP += parseInt ( e.totalPNP )
                        newItems2.pmProgramada += parseInt ( e.pmProgramada )
                        newItems2.minTotal += parseInt ( e.minTotal )
                        newItems2.totalRechazos += parseInt ( e.totalRechazos )
                        vecUnificado[i].minNoCalidad = (  parseInt ( e.totalRechazos ) ) * 60 / parseInt ( e.piezasXhora )
                        vecUnificado[i].minPorPiezaProducidas = ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                        newItems2.minPorPiezaProducidas += ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                        newItems2.minNoCalidad += ( parseInt ( e.totalRechazos === null ? 0 : e.totalRechazos )  ) * 60 / parseInt ( e.piezasXhora )
                    } )
                    if ( vecUnificado.length > 0 ) {
                        vecUnificado.push ( newItems2 )
                    }
                    callback( vecUnificado )
                }
                agrupador (  )
                }
                else{
                    callback([])
                }
            }
            else {
                cont ++
                if(cont < 4 ) {
                    abortController.abort()
                    myFetch()
                }
            }
        })
        .catch (e => {
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            else {
                cont2 ++
                if(cont2 < 4){
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaOeeGranalladoGrafico =  ( idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta , idAgrupar , abortController , callback ) => {
    var cont = 0 , cont2 = 0
    const myFetch = ()=>{
        fetch ( `${urlApi}/api/oee/granallado`  , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal: abortController.signal
        })
        .then(result =>{
            return result.json()
        })
        .then(json => {
            if ( json && Array.isArray ( json )) {
                if(json.length > 0) {
                var datosOEE = json
                    if ( idAgrupar === 2 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            datosOEE[i].fechaProduccion =`SEM${new Moment (e.fechaProduccion).add(1 , 'd').week()}/${new Moment (e.fechaProduccion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            datosOEE[i].fechaProduccion = `${String(e.fechaProduccion).substring(5,7)}/${String(e.fechaProduccion).substring(0,4)}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            datosOEE[i].fechaProduccion = parseInt ( String(e.fechaProduccion).substring(0,4) )
                        } )
                    }
                    var vecUnificado = [  ]
                    datosOEE.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaProduccion : null ,
                            idMaquina : undefined ,
                            nombreMaquina : null ,
                            idPieza : undefined ,
                            nombrePieza : null ,
                            idMolde : undefined ,
                            nombreMolde : null ,
                            piezasXhora : null ,
                            produccion : 0 ,
                            pmMatrizeria : 0 ,
                            pmMantenimiento : 0 ,
                            pmProduccion : 0 ,
                            totalPNP : 0 ,
                            pmProgramada : 0 ,
                            totalRechazos : 0 ,
                            minTotal : 0
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificado ) && vecUnificado.length > 0 ) {
                            vecUnificado.forEach ( ( e , i ) => {
                                if ( items.fechaProduccion === e.fechaProduccion && items.idMaquina === e.idMaquina &&
                                    items.idPieza === e.idPieza && items.idMolde === e.idMolde && items.piezasXhora === e.piezasXhora ) {
                                        encontro = true
                                    }
                            } )
                        }
                        if ( encontro === false  ) {
                            var vecFiltrado = datosOEE
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaProduccion === d.fechaProduccion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde && items.piezasXhora === d.piezasXhora ) )
                            newItems.fechaProduccion = items.fechaProduccion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            newItems.piezasXhora = items.piezasXhora
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.produccion += elem.produccion === null ? 0 : parseInt ( elem.produccion )
                                newItems.totalRechazos += elem.totalRechazos === null ? 0 : parseInt ( elem.totalRechazos )
                                newItems.pmMatrizeria += elem.pmMatrizeria === null ? 0 : parseInt ( elem.pmMatrizeria )
                                newItems.pmMantenimiento += elem.pmMantenimiento === null ? 0 : parseInt ( elem.pmMantenimiento )
                                newItems.pmProduccion += elem.pmProduccion === null ? 0 : parseInt ( elem.pmProduccion )
                                newItems.totalPNP += elem.totalPNP === null ? 0 : parseInt ( elem.totalPNP )
                                newItems.pmProgramada += elem.pmProgramada === null ? 0 : parseInt ( elem.pmProgramada )
                                newItems.minTotal += elem.minTotal === null ? 0 : parseInt ( elem.minTotal )
                            } )
                            vecUnificado.push ( newItems )
                        }
                    } )
                    var vecP1MasvecP2 = vecUnificado
                    var vecFechas = [  ]
                    vecP1MasvecP2.forEach ( ( el , i ) => {
                        var fechaEncontrada = false
                        vecFechas.forEach ( ( f , index ) => {
                            if ( f === el.fechaProduccion ) {
                                fechaEncontrada = true
                                return
                            }
                        } )
                        if ( fechaEncontrada === false ) {
                            vecFechas.push ( el.fechaProduccion )
                        }
                    } )
                    var vecFinal = [  ]
                    vecFechas.sort (  )
                    vecFechas.forEach ( ( e , i ) => {
                        var ele = {
                            fecha : idAgrupar === 1 ? new Moment ( e ).add( 1 , 'd' ).format('DD/MM/YYYY') : e ,
                            minTotal : 0 ,
                            pmProgramada : 0 ,
                            totalPNP : 0 ,
                            minNoCalidad : 0 ,
                            minPorPiezaProducidas : 0
                        }
                        vecP1MasvecP2.forEach ( ( elementos , ind ) => {
                            if ( e === elementos.fechaProduccion ) {
                                    ele.minTotal += elementos.minTotal === null ? 0 : parseInt ( elementos.minTotal )
                                    ele.pmProgramada += elementos.pmProgramada === null ? 0 : parseInt ( elementos.pmProgramada )
                                    ele.totalPNP += elementos.totalPNP === null ? 0 : parseInt ( elementos.totalPNP )
                                    ele.minPorPiezaProducidas += ele.minPorPiezaProducidas === null ? 0 : ( parseInt ( elementos.produccion ) * 60 / parseInt ( elementos.piezasXhora ) )
                                    ele.minNoCalidad += ( parseInt ( elementos.totalRechazos ) ) * 60 / parseInt ( elementos.piezasXhora ) === null || isNaN ( ( parseInt ( elementos.totalRechazos ) ) * 60 / parseInt ( elementos.piezasXhora ) ) ? 0 : ( parseInt ( elementos.totalRechazos ) ) * 60 / parseInt ( elementos.piezasXhora )
                            }
                        } )
                        vecFinal.push ( ele )
                    } )
                    if ( vecFinal.length > 0 ) {
                        var ele = {
                            fecha : 'Acumulado' ,
                            minTotal : 0 ,
                            pmProgramada : 0 ,
                            totalPNP : 0 ,
                            minNoCalidad : 0 ,
                            minPorPiezaProducidas : 0
                        }
                        vecFinal.forEach ( ( dato , indexDatos ) => {
                            ele.minTotal += dato.minTotal
                            ele.pmProgramada += dato.pmProgramada
                            ele.totalPNP += dato.totalPNP
                            ele.minNoCalidad += dato.minNoCalidad
                            ele.minPorPiezaProducidas += dato.minPorPiezaProducidas
                        } )
                        vecFinal.push ( ele )
                    }
                    var vecFech = [  ]
                    var vecD = [  ]
                    var vecR = [  ]
                    var vecQ = [  ]
                    var vecOEE = [  ]
                    var vecColoress = [  ]
                    var vecObjetivoMinn = [  ]
                    var vecObjetivoMaxx = [  ]
                vecFinal.forEach ( ( e , i ) => {
                    var dato =  ( ( ( e.minTotal - e.pmProgramada - e.totalPNP) / (e.minTotal - e.pmProgramada )) *
                    (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP ) ) *
                    ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ) ) ) * 100 ).toFixed ( 2 )
                        vecFech.push ( e.fecha )
                        vecD.push ( isNaN ( ( ( e.minTotal - e.pmProgramada - e.totalPNP ) / (e.minTotal - e.pmProgramada)  * 100 ).toFixed ( 2 ) ) ? 0 :  ( ( e.minTotal - e.pmProgramada - e.totalPNP ) / (e.minTotal - e.pmProgramada)  * 100 ).toFixed ( 2 ) )
                        vecR.push ( isNaN ( (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP )* 100  ).toFixed(2) ) ? 0 : (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP )* 100  ).toFixed(2) )
                        vecQ.push ( isNaN ( ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100).toFixed(2) ) ? 0 : ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100) === - Infinity ? 0 : ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100).toFixed(2) )
                        vecOEE.push ( isNaN ( dato ) ? 0 : dato )
                        vecObjetivoMinn.push ( 50 )
                        vecObjetivoMaxx.push ( 70 )
                        vecColoress.push ( i === vecFinal.length -1 ? 'grey' : 'rgb(55, 49, 138)' )
                } )
                callback(vecFech , vecD , vecR , vecQ , vecOEE , vecColoress , vecObjetivoMinn , vecObjetivoMaxx)
            }
                else {
                    callback([] , [] , [] , [] , [] , [] , [] , [])
                }
            }
            else{
                cont ++
                if(cont < 4){
                    myFetch()
                }
            }
        })
        .catch(e => {
            if(e.name === 'AbortError'){
                abortController.abort()
            }
            else{
                cont2 ++
                if(cont2 < 4){
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaOeeMecanizadoGrafico = ( idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta ,  idAgrupar ,abortController , callback ) => {
    var cont = 0
    var cont2 =0
    const myFetch = () => {
        fetch ( `${urlApi}/api/oee/mecanizado` , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        } )
        .then(result => result.json())
        .then(json => {
            if (Array.isArray ( json )) {
                var datosOEE = json
                if ( idAgrupar === 2 ) {
                    datosOEE.forEach ( ( e , i ) => {
                        datosOEE[i].fechaProduccion = `SEM${new Moment (e.fechaProduccion).add(1 , 'd').week()}/${new Moment (e.fechaProduccion).year()}`
                    } )
                }
                else if ( idAgrupar === 3 ) {
                    datosOEE.forEach ( ( e , i ) => {
                        datosOEE[i].fechaProduccion = `${new Moment (e.fechaProduccion).add( 1 , 'd' ).add( 1, 'months' ).month()}/${new Moment (e.fechaProduccion).year()}`
                    } )
                }
                else if ( idAgrupar === 4 ) {
                    datosOEE.forEach ( ( e , i ) => {
                        datosOEE[i].fechaProduccion = new Moment (e.fechaProduccion).year()
                    } )
                }
                var vecUnificado = [  ]
                datosOEE.forEach ( ( items , i ) => {
                    var newItems = {
                        fechaProduccion : null ,
                        idMaquina : undefined ,
                        nombreMaquina : null ,
                        idPieza : undefined ,
                        nombrePieza : null ,
                        idMolde : undefined ,
                        nombreMolde : null ,
                        piezasXhora : null ,
                        produccion : 0 ,
                        pmMatrizeria : 0 ,
                        pmMantenimiento : 0 ,
                        pmProduccion : 0 ,
                        totalPNP : 0 ,
                        pmProgramada : 0 ,
                        totalRechazos : 0 ,
                        minTotal : 0
                    }
                    var encontro = false
                    if ( Array.isArray ( vecUnificado ) && vecUnificado.length > 0 ) {
                        vecUnificado.forEach ( ( e , i ) => {
                            if ( items.fechaProduccion === e.fechaProduccion && items.idMaquina === e.idMaquina &&
                                items.idPieza === e.idPieza && items.idMolde === e.idMolde && items.piezasXhora === e.piezasXhora ) {
                                    encontro = true
                                }
                        } )
                    }
                    if ( encontro === false  ) {
                        var vecFiltrado = datosOEE
                        vecFiltrado = vecFiltrado.filter ( d => ( items.fechaProduccion === d.fechaProduccion && items.idMaquina === d.idMaquina
                            && items.idPieza === d.idPieza && items.idMolde === d.idMolde && items.piezasXhora === d.piezasXhora ) )
                        newItems.fechaProduccion = items.fechaProduccion
                        newItems.idMaquina = items.idMaquina
                        newItems.nombreMaquina = items.nombreMaquina
                        newItems.idPieza = items.idPieza
                        newItems.nombrePieza = items.nombrePieza
                        newItems.idMolde = items.idMolde
                        newItems.nombreMolde = items.nombreMolde
                        newItems.piezasXhora = items.piezasXhora
                        vecFiltrado.forEach ( ( elem , i ) => {
                            newItems.produccion += elem.produccion === null ? 0 : parseInt ( elem.produccion )
                            newItems.totalRechazos += elem.totalRechazos === null ? 0 : parseInt ( elem.totalRechazos )
                            newItems.pmMatrizeria += elem.pmMatrizeria === null ? 0 : parseInt ( elem.pmMatrizeria )
                            newItems.pmMantenimiento += elem.pmMantenimiento === null ? 0 : parseInt ( elem.pmMantenimiento )
                            newItems.pmProduccion += elem.pmProduccion === null ? 0 : parseInt ( elem.pmProduccion )
                            newItems.totalPNP += elem.totalPNP === null ? 0 : parseInt ( elem.totalPNP )
                            newItems.pmProgramada += elem.pmProgramada === null ? 0 : parseInt ( elem.pmProgramada )
                            newItems.minTotal += elem.minTotal === null ? 0 : parseInt ( elem.minTotal )
                        } )
                        vecUnificado.push ( newItems )
                    }
                } )
                var vecP1MasvecP2 = vecUnificado
                var vecFechas = [  ]
                vecP1MasvecP2.forEach ( ( el , i ) => {
                    var fechaEncontrada = false
                    vecFechas.forEach ( ( f , index ) => {
                        if ( f === el.fechaProduccion ) {
                            fechaEncontrada = true
                            return
                        }
                    } )
                    if ( fechaEncontrada === false ) {
                        vecFechas.push ( el.fechaProduccion )
                    }
                } )
                var vecFinal = [  ]
                vecFechas.sort (  )
                vecFechas.forEach ( ( e , i ) => {
                    var ele = {
                        fecha : idAgrupar === 1 ? new Moment ( e ).add( 1 , 'd' ).format('DD/MM/YYYY') : e ,
                        minTotal : 0 ,
                        pmProgramada : 0 ,
                        totalPNP : 0 ,
                        minNoCalidad : 0 ,
                        minPorPiezaProducidas : 0
                    }
                    vecP1MasvecP2.forEach ( ( elementos , ind ) => {
                        if ( e === elementos.fechaProduccion ) {
                                ele.minTotal += elementos.minTotal === null ? 0 : parseInt ( elementos.minTotal )
                                ele.pmProgramada += elementos.pmProgramada === null ? 0 : parseInt ( elementos.pmProgramada )
                                ele.totalPNP += elementos.totalPNP === null ? 0 : parseInt ( elementos.totalPNP )
                                ele.minPorPiezaProducidas += ele.minPorPiezaProducidas === null ? 0 : ( parseInt ( elementos.produccion ) * 60 / parseInt ( elementos.piezasXhora ) )
                                ele.minNoCalidad += ( parseInt ( elementos.totalRechazos ) ) * 60 / parseInt ( elementos.piezasXhora ) === null || isNaN ( ( parseInt ( elementos.totalRechazos ) ) * 60 / parseInt ( elementos.piezasXhora ) ) ? 0 : ( parseInt ( elementos.totalRechazos ) ) * 60 / parseInt ( elementos.piezasXhora )
                        }
                    } )
                    vecFinal.push ( ele )
                } )
                if ( vecFinal.length > 0 ) {
                    var ele = {
                        fecha : 'Acumulado' ,
                        minTotal : 0 ,
                        pmProgramada : 0 ,
                        totalPNP : 0 ,
                        minNoCalidad : 0 ,
                        minPorPiezaProducidas : 0
                    }
                    vecFinal.forEach ( ( dato , indexDatos ) => {
                        ele.minTotal += dato.minTotal
                        ele.pmProgramada += dato.pmProgramada
                        ele.totalPNP += dato.totalPNP
                        ele.minNoCalidad += dato.minNoCalidad
                        ele.minPorPiezaProducidas += dato.minPorPiezaProducidas
                    } )
                    vecFinal.push ( ele )
                }
                var vecFech = [  ]
                var vecD = [  ]
                var vecR = [  ]
                var vecQ = [  ]
                var vecOEE = [  ]
                var vecColoress = [  ]
                var vecObjetivoMinn = [  ]
                var vecObjetivoMaxx = [  ]
                vecFinal.forEach ( ( e , i ) => {
                    var dato =  ( ( ( e.minTotal - e.pmProgramada - e.totalPNP) / (e.minTotal - e.pmProgramada )) *
                    (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP ) ) *
                    ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ) ) ) * 100 ).toFixed ( 2 )
                        vecFech.push ( e.fecha )
                        vecD.push ( isNaN ( ( ( e.minTotal - e.pmProgramada - e.totalPNP ) / (e.minTotal - e.pmProgramada)  * 100 ).toFixed ( 2 ) ) ? 0 :  ( ( e.minTotal - e.pmProgramada - e.totalPNP ) / (e.minTotal - e.pmProgramada)  * 100 ).toFixed ( 2 ) )
                        vecR.push ( isNaN ( (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP )* 100  ).toFixed(2) ) ? 0 : (e.minPorPiezaProducidas / ( e.minTotal - e.pmProgramada - e.totalPNP )* 100  ).toFixed(2) )
                        vecQ.push ( isNaN ( ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100).toFixed(2) ) ? 0 : ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100) === - Infinity ? 0 : ( (1 - ( e.minNoCalidad / (e.minTotal - e.pmProgramada - e.totalPNP) ))*100).toFixed(2) )
                        vecOEE.push ( isNaN ( dato ) ? 0 : dato )
                        vecObjetivoMinn.push ( 50 )
                        vecObjetivoMaxx.push ( 70 )
                        vecColoress.push ( i === vecFinal.length -1 ? 'grey' : 'rgb(55, 49, 138)' )
                } )
                callback(vecFech , vecD , vecR , vecQ , vecOEE , vecColoress , vecObjetivoMinn ,  vecObjetivoMaxx)
            }
            else{
                cont ++
                if(cont <4 ){
                    myFetch()
                }
            }
        })
        .catch( e => {
            if (e.name === 'AbortError') {
                abortController.abort()
            }
            else{
                cont2 ++
                if(cont2 < 4){
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaOeeMecanizado = ( idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta , idAgrupar , abortController , callback ) => {
    var cont = 0
    var cont2 =0
    const myFetch = () => {
        fetch ( `${urlApi}/api/oee/mecanizado` , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        } )
        .then(result => result.json())
        .then(json => {
            if (Array.isArray ( json )) {
                var datosOEE = json
                if ( idAgrupar === 2 ) {
                    datosOEE.forEach ( ( e , i ) => {
                        datosOEE[i].fechaProduccion =`SEM${new Moment (e.fechaProduccion).add(1 , 'd').week()}/${new Moment (e.fechaProduccion).year()}`
                    } )
                }
                else if ( idAgrupar === 3 ) {
                    datosOEE.forEach ( ( e , i ) => {
                        datosOEE[i].fechaProduccion = `${String(e.fechaProduccion).substring(5,7)}/${String(e.fechaProduccion).substring(0,4)}`
                    } )
                }
                else if ( idAgrupar === 4 ) {
                    datosOEE.forEach ( ( e , i ) => {
                        datosOEE[i].fechaProduccion = parseInt ( String(e.fechaProduccion).substring(0,4) )
                    } )
                }
                var vecUnificado = [  ]
                datosOEE.forEach ( ( items , i ) => {
                    var newItems = {
                        fechaProduccion : null ,
                        idMaquina : undefined ,
                        nombreMaquina : null ,
                        idPieza : undefined ,
                        nombrePieza : null ,
                        idMolde : undefined ,
                        nombreMolde : null ,
                        piezasXhora : null ,
                        produccion : 0 ,
                        pmMatrizeria : 0 ,
                        pmMantenimiento : 0 ,
                        pmProduccion : 0 ,
                        totalPNP : 0 ,
                        pmProgramada : 0 ,
                        totalRechazos : 0 ,
                        minTotal : 0
                    }
                    var encontro = false
                    if ( Array.isArray ( vecUnificado ) && vecUnificado.length > 0 ) {
                        vecUnificado.forEach ( ( e , i ) => {
                            if ( items.fechaProduccion === e.fechaProduccion && items.idMaquina === e.idMaquina &&
                                items.idPieza === e.idPieza && items.idMolde === e.idMolde && items.piezasXhora === e.piezasXhora ) {
                                    encontro = true
                                }
                        } )
                    }
                    if ( encontro === false  ) {
                        var vecFiltrado = datosOEE
                        vecFiltrado = vecFiltrado.filter ( d => ( items.fechaProduccion === d.fechaProduccion && items.idMaquina === d.idMaquina
                            && items.idPieza === d.idPieza && items.idMolde === d.idMolde && items.piezasXhora === d.piezasXhora ) )
                        newItems.fechaProduccion = items.fechaProduccion
                        newItems.idMaquina = items.idMaquina
                        newItems.nombreMaquina = items.nombreMaquina
                        newItems.idPieza = items.idPieza
                        newItems.nombrePieza = items.nombrePieza
                        newItems.idMolde = items.idMolde
                        newItems.nombreMolde = items.nombreMolde
                        newItems.piezasXhora = items.piezasXhora
                        vecFiltrado.forEach ( ( elem , i ) => {
                            newItems.produccion += elem.produccion === null ? 0 : parseInt ( elem.produccion )
                            newItems.totalRechazos += elem.totalRechazos === null ? 0 : parseInt ( elem.totalRechazos )
                            newItems.pmMatrizeria += elem.pmMatrizeria === null ? 0 : parseInt ( elem.pmMatrizeria )
                            newItems.pmMantenimiento += elem.pmMantenimiento === null ? 0 : parseInt ( elem.pmMantenimiento )
                            newItems.pmProduccion += elem.pmProduccion === null ? 0 : parseInt ( elem.pmProduccion )
                            newItems.totalPNP += elem.totalPNP === null ? 0 : parseInt ( elem.totalPNP )
                            newItems.pmProgramada += elem.pmProgramada === null ? 0 : parseInt ( elem.pmProgramada )
                            newItems.minTotal += elem.minTotal === null ? 0 : parseInt ( elem.minTotal )
                        } )
                        vecUnificado.push ( newItems )
                    }
                } )
                var newItems2 = {
                    fechaProduccion : null ,
                    idPlanta : null  ,
                    idMaquina : undefined ,
                    nombreMaquina : null ,
                    idPieza : undefined ,
                    nombrePieza : null ,
                    idMolde : undefined ,
                    nombreMolde : null ,
                    piezasXhora : null ,
                    produccion : 0 ,
                    pmMatrizeria : 0 ,
                    pmMantenimiento : 0 ,
                    pmProduccion : 0 ,
                    totalPNP : 0 ,
                    pmProgramada : 0 ,
                    totalRechazos : 0 ,
                    minTotal : 0 ,
                    minNoCalidad : 0 ,
                    minPorPiezaProducidas : 0
                }
                vecUnificado.forEach ( ( e , i ) => {
                    newItems2.produccion += parseInt ( e.produccion )
                    newItems2.pmMatrizeria += parseInt ( e.pmMatrizeria )
                    newItems2.pmMantenimiento += parseInt ( e.pmMantenimiento )
                    newItems2.pmProduccion += parseInt ( e.pmProduccion )
                    newItems2.totalPNP += parseInt ( e.totalPNP )
                    newItems2.pmProgramada += parseInt ( e.pmProgramada )
                    newItems2.minTotal += parseInt ( e.minTotal )
                    newItems2.totalRechazos += parseInt ( e.totalRechazos )
                    vecUnificado[i].minNoCalidad = (  parseInt ( e.totalRechazos ) ) * 60 / parseInt ( e.piezasXhora )
                    vecUnificado[i].minPorPiezaProducidas = ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                    newItems2.minPorPiezaProducidas += ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                    newItems2.minNoCalidad += ( parseInt ( e.totalRechazos === null ? 0 : e.totalRechazos )  ) * 60 / parseInt ( e.piezasXhora )
                } )
                if ( vecUnificado.length > 0 ) {
                    vecUnificado.push ( newItems2 )
                }
                callback( vecUnificado)
            }
            else{
                cont++
                if(cont < 4){
                    myFetch()
                }
            }
        })
        .catch(e => {
            if (e.name === 'AbortError'){
                abortController.abort()
            }
            else{
                cont2++
                if(cont2<4){
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaMaquinas =  ( abortController , callback  ) => {
    var signal
    if(abortController) {
        signal = abortController.signal
    }
    else{
        signal = new AbortController().signal
    }
    var cont = 0 , cont2 = 0
    const myFetch = () =>  {
        fetch (`${urlApi}/api/maquinas` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : signal
        })
        .then (result => result.json())
        .then (json => {
            if(Array.isArray(json)) {
                callback(json)
            }
            else {
                cont ++
                if(cont < 4) {
                    myFetch()
                }
            }
        })
        .catch (e => {
            if(e.name === 'AbortError'){
                abortController.abort()
            }else {
                cont2 ++
                if(cont2 < 4) {
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaMoldes =  ( idPieza , abortController , callback ) => {
    var cont = 0 , cont2 = 0
    const myFetch = () =>  {
        fetch (`${urlApi}/api/moldes/xpieza/${idPieza === '' ? null : idPieza}` , {
            method : 'GET' ,
            headers :new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        })
        .then (result => result.json())
        .then (json => {
            if(Array.isArray(json)) {
                callback(json)
            }
            else {
                cont ++
                if(cont < 4) {
                    myFetch()
                }
            }
        })
        .catch (e => {
            if(e.name === 'AbortError'){
                abortController.abort()
            }else {
                cont2 ++
                if(cont2 < 4) {
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaPiezas =  ( abortController , callback  ) => {
    var cont = 0 , cont2 = 0
    const myFetch = () => {
        fetch (`${urlApi}/api/piezas` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal : abortController.signal
        } )
        .then (result => result.json())
        .then (json => {
            if(Array.isArray(json)) {
                callback(json)
            }
            else {
                cont ++
                if(cont < 4) {
                    myFetch()
                }
            }
        })
        .catch (e => {
            if(e.name === 'AbortError'){
                abortController.abort()
            }else {
                cont2 ++
                if(cont2 < 4) {
                    myFetch()
                }
            }
        })
    }
    myFetch()
}
servicios.listaReporteRechazosPrimeraVuelta =  ( fechaFundicionDesde , fechaFundicionHasta , idMaquina , idPieza , idMolde , abortController , callback ) => {
    var vecFechas = [  ]
    var vecProduccion = [  ]
    var vecRechazos = [  ]
    var vecPorcentaje = [  ]
    var cont = 0
    var cont2 = 0
    const myFetch = ( () => {
        fetch ( `${urlApi}/api/reportes/rechazosPrimeraVuelta` , {
            method : 'POST' ,
            body : JSON.stringify ( { fechaFundicionDesde , fechaFundicionHasta , idMaquina , idPieza , idMolde } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            } ) ,
            signal: abortController.signal
        } )
        .then(result => result.json())
        .then(json => {
            if(Array.isArray(json)){
                var vecMesAnio = [  ]
                json.forEach ( ( e , i ) => {
                    var fecha = `${ new Moment ( e.fechaFundicion ).add ( 12 , 'hour' ).month (  )+1}/${new Moment ( e.fechaFundicion ).add ( 12 , 'hour' ).year (  )}`
                    json[i].fechaFundicion = fecha
                    if ( vecMesAnio.length === 0 ) {
                        vecMesAnio.push ( { fechaFundicion : fecha , produccion : 0 , rechazos : 0 } )
                    }
                    else {
                        var encontro = false
                        vecMesAnio.forEach (  ma  => { if ( ma.fechaFundicion === fecha ) {  encontro = true  }  } )
                        if ( encontro === false ) {
                            vecMesAnio.push ( { fechaFundicion : fecha , produccion : 0 , rechazos : 0 } )
                        }
                    }
                } )
                vecMesAnio.forEach ( ( fe , indice ) => {
                    json.forEach ( elem  => {
                        if ( fe.fechaFundicion === elem.fechaFundicion  ) {
                            vecMesAnio[indice].produccion += elem['produccion'] === null || isNaN ( elem['produccion'] ) ? 0 : elem['produccion']
                            vecMesAnio[indice].rechazos += elem.rechazos === null || isNaN ( elem.rechazos ) ? 0 : elem.rechazos
                        }
                    } )
                } )
                vecMesAnio.forEach ( ( items  ) => {
                    vecFechas.push ( items['fechaFundicion'] )
                    vecProduccion.push ( items['produccion'] )
                    vecRechazos.push ( items['rechazos'] )
                    var por = 0
                    if ( ( items['rechazos'] / items['produccion'] ) === Infinity || isNaN ( ( items['rechazos'] / items['produccion'] )) ) {
                        por = 0
                    }
                    else {
                        por = ( items['rechazos'] / items['produccion'] * 100).toFixed ( 2 )
                    }
                    vecPorcentaje.push ( por )
                }  )
                callback(vecFechas , vecProduccion , vecRechazos , vecPorcentaje)
            }
            else{
                cont ++
                if(cont < 4){
                    myFetch()
                }
            }
        })
        .catch( e => {
            if(e.name === 'AbortError') {
                abortController.abort()
            }
            cont2 ++
            if(cont2 > 4){
                myFetch()
            }
        })
    } ) ( )
}

export default servicios