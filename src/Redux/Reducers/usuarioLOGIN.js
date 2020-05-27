import { type as findUsuarioLOG } from '../Actions/findUsuarioLOGIN'
const defaultState = ''

function UsuarioLOGIN ( state = defaultState , { type , payload } ) {
    switch ( type ) {
        case findUsuarioLOG : {
            return payload
        }
        default : return state
    }
}
export default UsuarioLOGIN