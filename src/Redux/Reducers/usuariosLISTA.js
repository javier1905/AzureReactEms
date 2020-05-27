import { type as FindListaUSUARIOS } from '../Actions/findListaUSUARIOS'
const defaultState = [  ]

function listaUsuarios ( state = defaultState , { type , payload } ) {
    switch ( type ) {
        case FindListaUSUARIOS : {
            return payload
        }
        default : return state
    }
}
export default listaUsuarios