import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AccesoDenegado from '../../Imagenes/accesoDenegado.jpg'

const Permisos = (props ) => {
    const [permiso,setPermiso] = useState(false)
    const [alto,setAlto] = useState(window.innerHeight)
    const perfil = useSelector (e =>   e.UsuarioLOGIN.perfil   )
    useEffect (()=> {
        if (Array.isArray(props.vecPermisos) ) {
            props.vecPermisos.forEach(e => {
                if(perfil === String(e) ){
                    setPermiso(true)
                }
            })
        }
    },[perfil , props])
    window.addEventListener('resize' , (document , e ) => {
        setAlto(window.innerHeight)
    })
    return(
        permiso ?
        <props.component/>
        :
        <div style = {{color : 'white', padding : 0 , boxSizing : 'border-box' , background : 'black'}}><img  src = {AccesoDenegado} alt = 'Acceso Denegado'  width = '100%'  height = {alto} /></div>
    )
}

export default Permisos

