var servicio = {  }

const urlApi = process.env.REACT_APP_URL_API

servicio.listaOperaciones = async ( controller ) => {
    var vecOperaciones = [  ]
    try {
        const response = await fetch(`${urlApi}/api/operaciones` , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        console.log(response)
        if ( response.ok ) {
            vecOperaciones  = await response.json (  )
        }
        else { vecOperaciones = [  ] }
    }
    catch ( e ) { console.log(e , 'errorrrrr')
        vecOperaciones = [  ] }
    return vecOperaciones
}
servicio.listaMaquinaXoperacion  = async ( idOp , controller )  => {
    var vecMaq = [  ]
    try {
        const response = await fetch( `${urlApi}/api/maquinas/xoperacion/${idOp}` , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( response.ok ) { vecMaq  = await response.json (  )  }
        else { vecMaq = [  ] }
    }
    catch ( e ) {vecMaq = [  ] }
    return vecMaq
}
servicio.listaPiezasXmaquina  = async ( idMaq , controller ) => {
    var vecPie = [  ]
    try {
        const response = await fetch( `${urlApi}/api/piezas/xmaquina/${idMaq}`, {
            method : 'GET' ,
            headers : new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( response.ok ) { vecPie  = await response.json (  )  }
        else { vecPie = [  ] }
    }
    catch ( e ) { vecPie = [  ] }
    return vecPie
}
servicio.listaMoldesXpieza  = async ( idPie , controller ) => {
    var vecMol = [  ]
    try {
        const response = await fetch( `${urlApi}/api/moldes/xpieza/${idPie}` , {
            method : 'GET' ,
            headers : new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( response.ok ) { vecMol  = await response.json (  )  }
        else { vecMol = [  ] }
    }
    catch ( e ) { vecMol = [  ] }
    return vecMol
}
servicio.listaParadaMaquinas  = async  controller  => {
    var vecPm = [  ]
    try {
        const response = await fetch( `${urlApi}/api/paradasMaquina`, {
            method : 'GET' ,
            headers : new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( response.ok ) { vecPm  = await response.json (  )  }
        else { vecPm = [  ] }
    }
    catch ( e ) { vecPm = [  ] }
    return vecPm
}
servicio.listaTurnos  = async controller => {
    var vecTur = [  ]
    try {
        const response = await fetch( `${urlApi}/api/turnos` , {
            method : 'GET' ,
            headers : new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( response.ok ) { vecTur  = await response.json (  )  }
        else { vecTur = [  ] }
    }
    catch ( e ) { vecTur = [  ] }
    return vecTur
}
servicio.listaDefectos  = async controller => {
    var vecDef = [  ]
    try {
        const response = await fetch( `${urlApi}/api/defectos` , {
            method : 'GET' ,
            headers : new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( response.ok ) { vecDef  = await response.json (  )  }
        else { vecDef = [  ] }
    }
    catch ( e ) { vecDef = [  ] }
    return vecDef
}
servicio.listaTrabajadores  = async controller => {
    var vecTrab = [  ]
    try {
        const response = await fetch( `${urlApi}/api/trabajadores` , {
            method : 'GET' ,
            headers : new Headers({
                'Accept': 'Application/json',
                'Content-Type': 'Application/json' ,
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if ( response.ok ) { vecTrab  = await response.json (  )  }
        else { vecTrab = [  ] }
    }
    catch ( e ) { vecTrab = [  ] }
    return vecTrab
}
servicio.tipoProcesosXmaquinaYpieza = async  ( idPi , idMaq ) => {
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
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
        if(! response.ok ) { tipoProceso = [  ] }
        else { tipoProceso = await response.json (  ) }
    }
    catch ( e ) { tipoProceso = [  ] }
    return  tipoProceso
}

export default servicio
