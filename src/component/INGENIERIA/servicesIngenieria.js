var servicios = { }
const urlApi = process.env.REACT_APP_URL_API

servicios.listaClientes = async (  ) => {
    var vecClientes = [  ]
    try {
        const result = await fetch (`${urlApi}/api/clientes/list` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await  result.json (  )
            vecClientes = json
        }
    }
    catch ( e ) {
        vecClientes = [  ]
    }
    return vecClientes
}
servicios.listaTtiposMaterial = async (  ) => {
    var vecTiposMaterial = [  ]
    try {
        const result = await fetch (`${urlApi}/api/tiposMaterial/list`, {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await  result.json (  )
            vecTiposMaterial = json
        }
    }
    catch ( e ) {
        vecTiposMaterial = [  ]
    }
    return vecTiposMaterial
}
servicios.savePieza = async ( nombrePieza , idCliente , idTipoMaterial ) => {
    var response
    try {
        const result = await fetch (`${urlApi}/api/piezas/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombrePieza , idCliente , idTipoMaterial } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await  result.json (  )
            response = json.mensaje
        }
    }
    catch ( e ) {
        response =  e.message
    }
    return response
}
servicios.listPiezas = async (  ) => {
    var vecPiezas = [  ]
    try {
        const result = await fetch (`${urlApi}/api/piezas` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await  result.json (  )
            vecPiezas = json
        }
    }
    catch ( e ) {
        vecPiezas =  [  ]
    }
    return vecPiezas
}
servicios.updatePieza = async ( idPieza , nombrePieza , idCliente , idTipoMaterial ) => {
    var mensaje = { }
    try {
        const result = await fetch (`${urlApi}/api/piezas/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idPieza , nombrePieza , idCliente , idTipoMaterial } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await  result.json (  )
            mensaje.exito = json.mensaje
        }
    }
    catch ( e ) { mensaje.fracaso =  e.message  }
    return mensaje
}
servicios.deletPieza = async ( idPieza ) => {
    var mensaje = { }
    try {
        const result = await fetch (`${urlApi}/api/piezas/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idPieza } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await  result.json (  )
            mensaje.exito = json.mensaje
        }
    }
    catch ( e ) { mensaje.fracaso =  e.message  }
    return mensaje
}
servicios.listaProcesos = async (  ) => {
    var vecProcesos = [  ]
    try {
        const result = await fetch (`${urlApi}/api/procesos/list` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecProcesos = json
        }
    }
    catch ( e ) {
        vecProcesos = [  ]
    }
    return vecProcesos
}
servicios.insertProceso = async ( descripcionProceso , idPieza , idMaquina , idTiposProceso , vecPiezasXhora ) => {
    var mensaje = ''
    try {
        const result = await fetch (`${urlApi}/api/procesos/insert` , {
            // const result = await fetch (`http://localhost:5000/api/procesos/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { descripcionProceso , idPieza , idMaquina , idTiposProceso , vecPiezasXhora } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            mensaje = json.mensaje
        }
    }
    catch ( e ) {
        mensaje = e.mensaje
    }
    return mensaje
}
servicios.updateProceso = async ( idProceso , descripcionProceso , idPieza , idMaquina , idTiposProceso , vecPiezasXhora ) => {
    var mensaje = ''
    try {
        const result = await fetch (`${urlApi}/api/procesos/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idProceso , descripcionProceso , idPieza , idMaquina , idTiposProceso , vecPiezasXhora } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            mensaje = json.mensaje
        }
    }
    catch ( e ) {
        mensaje = e.mensaje
    }
    return mensaje
}
servicios.deleteProceso = async ( idProceso ) => {
    var mensaje = ''
    try {
        const result = await fetch (`${urlApi}/api/procesos/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idProceso } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            mensaje = json.mensaje
        }
    }
    catch ( e ) {
        mensaje = e.mensaje
    }
    return mensaje
}
servicios.listaMaquinas = async (  ) => {
    var vecMaquinas = [  ]
    try {
        const result = await fetch (`${urlApi}/api/maquinas` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecMaquinas = json
        }
    }
    catch ( e ) {
        vecMaquinas = [  ]
    }
    return vecMaquinas
}
servicios.listaTiposProceso = async (  ) => {
    var vecTiposProceso = [  ]
    try {
        const result = await fetch (`${urlApi}/api/tiposProceso` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecTiposProceso = json
        }
    }
    catch ( e ) {
        vecTiposProceso = [  ]
    }
    return vecTiposProceso
}
servicios.listaDefectos = async (  ) => {
    var vecDefectos = [  ]
    try {
        const result = await fetch (`${urlApi}/api/defectos` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecDefectos = json
        }
    }
    catch ( e ) {
        vecDefectos = [  ]
    }
    return vecDefectos
}
servicios.deleteDefecto = async ( idDefecto ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/defectos/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idDefecto } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateDefecto = async ( idDefecto , nombreDefecto , idOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/defectos/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idDefecto , nombreDefecto , idOperacion } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertDefecto = async ( nombreDefecto , idOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/defectos/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreDefecto , idOperacion } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.listaOperaciones = async (  ) => {
    var vecOperaciones = [  ]
    try {
        const result = await fetch (`${urlApi}/api/operaciones` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecOperaciones = json
        }
    }
    catch ( e ) {
        vecOperaciones = [  ]
    }
    return vecOperaciones
}
servicios.listaMoldes = async (  ) => {
    var vecMoldes = [  ]
    try {
        const result = await fetch (`${urlApi}/api/moldes` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecMoldes = json
        }
    }
    catch ( e ) {
        vecMoldes = [  ]
    }
    return vecMoldes
}
servicios.deleteMolde = async ( idMolde ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/moldes/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idMolde } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateMolde = async ( idMolde , nombreMolde , idPieza ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/moldes/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idMolde , nombreMolde , idPieza } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertMolde = async ( nombreMolde , idPieza ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/moldes/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreMolde , idPieza } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.listaParadasMaquina = async (  ) => {
    var vecParadasMaquina = [  ]
    try {
        const result = await fetch (`${urlApi}/api/paradasMaquina` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecParadasMaquina = json
        }
    }
    catch ( e ) {
        vecParadasMaquina = [  ]
    }
    return vecParadasMaquina
}
servicios.deleteParadaMaquina = async ( idParadaMaquina ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/paradasMaquina/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idParadaMaquina } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateParadaMaquina = async ( idParadaMaquina , nombreParadaMaquina , tipoParadaMaquina , idArea , setupParadaMaquina ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/paradasMaquina/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idParadaMaquina , nombreParadaMaquina , tipoParadaMaquina , idArea , setupParadaMaquina } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertParadaMaquina = async ( nombreParadaMaquina , tipoParadaMaquina , idArea , setupParadaMaquina ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/paradasMaquina/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreParadaMaquina , tipoParadaMaquina , idArea , setupParadaMaquina } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.listaAreas = async (  ) => {
    var vecAreas = [  ]
    try {
        const result = await fetch (`${urlApi}/api/areas` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecAreas = json
        }
    }
    catch ( e ) {
        vecAreas = [  ]
    }
    return vecAreas
}
servicios.listaTiposMaquina = async (  ) => {
    var vecTiposMaquina = [  ]
    try {
        const result = await fetch (`${urlApi}/api/tiposMaquina/list` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecTiposMaquina = json
        }
    }
    catch ( e ) {
        vecTiposMaquina = [  ]
    }
    return vecTiposMaquina
}
servicios.listaPlantas = async (  ) => {
    var vecPlantas = [  ]
    try {
        const result = await fetch (`${urlApi}/api/plantas/list` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( result ) {
            const json = await result.json (  )
            vecPlantas = json
        }
    }
    catch ( e ) {
        vecPlantas = [  ]
    }
    return vecPlantas
}
servicios.deleteMaquina = async ( idMaquina ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/maquinas/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idMaquina } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateMaquina = async ( idMaquina , nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/maquinas/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idMaquina , nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertMaquina = async ( nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/maquinas/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.listaPuestos = async (  ) => {
    var vecPuestos = [  ]
    try {
        const response = await fetch ( `${urlApi}/api/puestos/list` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( response ) {
            const json = await response.json (  )
            if ( !json.status ) {
                vecPuestos = json
            }
            else {
                vecPuestos = [  ]
            }
        }
    }
    catch ( e ) {
        vecPuestos = [  ]
    }
    return vecPuestos
}
servicios.listaTrabajadores = async (  ) => {
    var vecTrabajadores = [  ]
    try {
        const response = await fetch ( `${urlApi}/api/trabajadores` , {
            method : 'GET' ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( response ) {
            const json = await response.json (  )
            if ( !json.status ) {
                vecTrabajadores = json
            }
            else {
                vecTrabajadores = [  ]
            }
        }
    }
    catch ( e ) {
        vecTrabajadores = [  ]
    }
    return vecTrabajadores
}
servicios.deleteTrabajador = async ( idTrabajador ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/trabajadores/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idTrabajador } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateTrabajador = async ( idTrabajador , nombreTrabajador , apellidoTrabajador , nacimientoTrabajador , ingresoTrabajador , idPuesto ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/trabajadores/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idTrabajador , nombreTrabajador , apellidoTrabajador , nacimientoTrabajador , ingresoTrabajador , idPuesto } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertTrabajador = async ( nombreTrabajador , apellidoTrabajador , nacimientoTrabajador , ingresoTrabajador , idPuesto ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/trabajadores/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreTrabajador , apellidoTrabajador , nacimientoTrabajador , ingresoTrabajador , idPuesto } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.deleteOperacion = async ( idOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/operaciones/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idOperacion } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateOperacion = async ( nombreOperacion , idOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/operaciones/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { nombreOperacion , idOperacion } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertOperacion = async ( nombreOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/operaciones/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreOperacion } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.deleteArea = async ( idArea ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/areas/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idArea } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateArea = async ( idArea , nombreArea ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/areas/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idArea , nombreArea } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertArea = async ( nombreArea ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/areas/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreArea } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.deletePuestos = async ( idPuesto ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/puestos/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idPuesto } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updatePuesto = async ( idPuesto , nombrePuesto ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/puestos/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idPuesto , nombrePuesto } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertPuesto = async ( nombrePuesto ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/puestos/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombrePuesto } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.deletePlanta = async ( idPlanta ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/plantas/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idPlanta } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updatePlanta = async ( idPlanta , nombrePlanta , barrioPlanta , codigoPostalPlanta , callePlanta , alturaCallePlanta ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/plantas/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idPlanta , nombrePlanta , barrioPlanta , codigoPostalPlanta , callePlanta , alturaCallePlanta } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertPlanta = async ( nombrePlanta , barrioPlanta , codigoPostalPlanta , callePlanta , alturaCallePlanta ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/plantas/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombrePlanta , barrioPlanta , codigoPostalPlanta , callePlanta , alturaCallePlanta } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.deleteTipoMaquina = async ( idTipoMaquina ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/tiposMaquina/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idTipoMaquina } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateTipoMaquina = async ( idTipoMaquina , nombreTipoMaquina , idOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/tiposMaquina/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idTipoMaquina , nombreTipoMaquina , idOperacion } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertTipoMaquina = async ( nombreTipoMaquina  , idOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( `${urlApi}/api/tiposMaquina/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreTipoMaquina  , idOperacion } ) ,
            headers : new Headers ({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
export default servicios