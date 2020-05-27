import { createStore , combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import UsuarioLOGIN from './Reducers/usuarioLOGIN'
import UsuariosLISTA from './Reducers/usuariosLISTA'
import PlanillaProduccionUpdate from './Reducers/planillaProduccionUpdate'

const misReducers = combineReducers ( {
    UsuarioLOGIN ,
    UsuariosLISTA ,
    PlanillaProduccionUpdate ,
} )

const store = createStore ( misReducers , applyMiddleware ( thunk ) , window.STATE_FROM_SERVER )

export default store
