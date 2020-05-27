import Moment from 'moment'
const fechas = {}

//!-----------------------------------------------------------------------------------------------------------------------------
// ? convierte fechas que estan en le formato directo de SQL al formato DD/MM/YYYY
//!-----------------------------------------------------------------------------------------------------------------------------
fechas.SQL_a_DD_MM_YYYY = ( fecha ) => {
    let dia = String(fecha).substring(8,10)
    let mes = String(fecha).substring(5,7)
    let anio = String(fecha).substring(0,4)
    return `${dia}/${mes}/${anio}`
}
//! ------------------------------------------------------------------------------------------------------------------------------------------------
//? convierte las fecha del componente DateTimeTicker a la misma fecha pero le cambia la hora a 0
//!-------------------------------------------------------------------------------------------------------------------------------------------------
fechas.DataTimePicker_a_SQL = (fecha) => {
    return `${String(fecha).substring(0,15)} 00:00:00 GMT-0300`
}
//! ------------------------------------------------------------------------------------------------------------------------------------------------
//? convierte las fecha del componente DateTimeTicker a la misma fecha pero le cambia la hora a 0
//!-------------------------------------------------------------------------------------------------------------------------------------------------
fechas.DD_MM_YYYY_a_DataTimePicker = ( fecha ) => {
    var dia = String(fecha).substring(0, 2)
    var mes = parseInt (String(fecha).substring(3, 5) )
    var anio = String(fecha).substring(6, 10)
    var fe = new Moment ( {y:anio, M:mes-1 , d:dia , h:0,m:0,s:0,ms:0}).format('ddd MMM DD YYYY')
    // console.log (`${fe} 00:00:00 GMT-0300` , 'fe fe fe fe ')
    // `Mon Apr ${dia} ${anio} 00:00:00 GMT-0300`
    return `${fe} 00:00:00 GMT-0300`
    // return `${anio}-${mes}-${dia}T00:00:00.000`
}
fechas.SQL_DataTimePicker = ( fecha ) => {
    var dia = parseInt( String(fecha).substring(8, 10) )
    var mes = parseInt (String(fecha).substring(5, 7) ) -1
    var anio = parseInt ( String(fecha).substring(0, 4) )
    var fe = new Moment ( {y:anio, M:mes , d:dia , h:6,m:0,s:0,ms:0}).format('ddd MMM DD YYYY')
    return `${fe} 00:00:00 GMT-0300`
}
//! ------------------------------------------------------------------------------------------------------------------------------------------------
//? convierte las fecha del componente DateTimeTicker a la misma fecha pero le cambia la hora a 0
//!-------------------------------------------------------------------------------------------------------------------------------------------------
fechas.numeroSemana_1reFecha_ultimaFecha = ( nroSemana , anio ) => {
    var fe = new Moment ( {y:anio, M:0 , d:1 , h:0,m:0,s:0,ms:0})
    for ( var i = 1 ; i < 366 ; i++ ) {
        if (nroSemana===fe.week()) {
            return {inicio : `${fe.startOf('week').format('ddd MMM DD YYYY')} 00:00:00 GMT-0300` , fin : `${fe.endOf('week').format('ddd MMM DD YYYY')} 00:00:00 GMT-0300`}
        }else {
            fe.add( 1 , 'd' )
        }
    }
}

export default fechas