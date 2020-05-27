var servicios = {  }

const urlApi = process.env.REACT_APP_URL_API

servicios.listaClientes = async (  ) => {
    var vecClientes = [  ]
    try {
        const result = await fetch (`${urlApi}/api/clientes/list` ,{
            method : 'GET' ,
            headers : new Headers({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        })
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
servicios.updateCliente = async ( idCliente , nombreCliente ,  razonSocialCliente ) => {
    var mensaje = ''
    try {
        const result = await fetch (`${urlApi}/api/clientes/update` , {
            method : 'PUT' ,
            body : JSON.stringify( { idCliente , nombreCliente ,  razonSocialCliente } ) ,
            headers : new Headers({
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
servicios.deleteCliente = async ( idCliente ) =>{
    var mensaje = ''
    try {
        const result = await fetch ( `${urlApi}/api/clientes/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idCliente } ) ,
            headers : new Headers({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
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
servicios.altaCliente = async ( nombreCliente ,  razonSocialCliente ) => {
    var mensaje = ''
    try {
        const result = await fetch ( `${urlApi}/api/clientes/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreCliente ,  razonSocialCliente } ) ,
            headers : new Headers({
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            mensaje = json
        }
    }
    catch ( e ) {
        mensaje = e.mensaje
    }
    return mensaje
}

export default servicios