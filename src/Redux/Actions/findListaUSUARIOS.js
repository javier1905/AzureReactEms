export const type = 'findListaUsuarios'

const listaUsuarios = (  ) => {
    return dispatch => {
        fetch ( `${process.env.REACT_APP_URL_API}/api/usuarios` ,{
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json' ,
                authorization : `Bearer ${window.sessionStorage.getItem('token')}`
            } )
        })
        .then ( res => {
            return res.json (  )
        } )
        .then ( json => {
            dispatch ( { type , payload : json } )
        } )
        .catch ( e => {
            dispatch ( { type , payload : [  ] } ) 
        } )
    }
}
export default listaUsuarios