export const type = 'findUsuarioLOGIN'

function getUserLOGIN(usuarioLOGIN){

    return{
        type,
        payload:usuarioLOGIN
    }

}

export default getUserLOGIN