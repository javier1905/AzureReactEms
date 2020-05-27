import { type as findPlanillaUpdate } from '../Actions/findPlanillaUpdate'
const defaultState = ''

const reducerPlanillaUpdate = ( state = defaultState , { type , payload } ) => {
    switch ( type ) {
        case findPlanillaUpdate : {
            return payload
        }
        default : return state
    }
}
export default reducerPlanillaUpdate