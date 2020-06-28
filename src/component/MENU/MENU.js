import React, { useRef } from 'react'
import {useSelector} from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu'
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt'
import TimelineIcon from '@material-ui/icons/Timeline'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {useHistory } from 'react-router-dom'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import avatar from '../../Imagenes/avatar.jpg'
import './styleMENU.css'

const Menu = (props) => {
    const usuario = useSelector( store =>  store.UsuarioLOGIN )
    const history = useHistory()
    const menu = useRef()
    const menuIzquierdo = useRef()
    const menuIzquierdoResponsive = useRef()
    const despliegaMenu = e => {
        menu.current.classList.add('despliegaMenu')
        menuIzquierdo.current.classList.remove('desplieguaMenuIzquierdo')
        menuIzquierdoResponsive.current.classList.remove('desplieguaMenuIzquierdo')
    }
    const despliegaMenuIzquierdo = e => {
        menuIzquierdo.current.classList.add('desplieguaMenuIzquierdo')
        menu.current.classList.remove('despliegaMenu')
    }
    const despliegaMenuIzquierdoResponsive = e => {
        menuIzquierdoResponsive.current.classList.add('desplieguaMenuIzquierdo')
        menu.current.classList.remove('despliegaMenu')
    }
    const escondeMenuIzquierdo = e => {
        menuIzquierdo.current.classList.remove('desplieguaMenuIzquierdo')
    }
    const escondeMenuIzquierdoResponsive = e => {
        if(e.target.classList.value !== 'containerM__menu-responsive__sub-menu') {
            menuIzquierdoResponsive.current.classList.remove('desplieguaMenuIzquierdo')
        }
        if(e.target.classList.value !== 'containerM__menu'){
            menu.current.classList.remove('despliegaMenu')
        }
    }
    const escondeMenu = e=>{
        menu.current.classList.remove('despliegaMenu')
    }
    return(
        <div className="containerM" onTouchStart={escondeMenuIzquierdoResponsive}  >
            <div className="containerM__menu"  onMouseLeave={escondeMenu}>
                <nav>
                    <ul>
                        <li onClick={ e=> {
                            history.push(`/management/produccion`)
                            escondeMenu()
                        }} >
                            <PermDataSettingIcon/>
                            <a>Produccion</a>
                        </li>
                        <li onClick={ e=> {
                            history.push(`/management/compras`)
                            escondeMenu()
                        }}>
                            <ShoppingCartIcon/>
                            <a>Compras</a>
                        </li>
                        <li>
                            <ViewQuiltIcon/>
                            <a onClick={ e=> { history.push(`/management/produccion`) }}  >Matriceria</a>
                        </li>
                        <li onClick={ e=> {
                            history.push(`/management/ingenieria`)
                            escondeMenu()
                        }}>
                            <PermDataSettingIcon/>
                            <a>Ingenieria</a>
                        </li>
                        <li onClick={ e=> {
                            history.push(`/management/reportes`)
                            escondeMenu()
                        }}>
                            <TimelineIcon/>
                            <a>Reportes</a>
                        </li>
                    </ul>
                </nav>
                <div className='containerM__menu__container-menu-izquierdo'>
                    <div onClick={despliegaMenuIzquierdo} className='containerM__menu__container-menu-izquierdo__boton'>
                        <MoreVertIcon/>
                    </div>
                    <div onMouseLeave ={escondeMenuIzquierdo} ref={menuIzquierdo} className='containerM__menu__container-menu-izquierdo__menu'>
                        <div className='container-avatar'>
                            <img src={avatar}/>
                        </div>
                        <div className='containerM__menu__container-menu-izquierdo__menu__usuario'>
                            <p>{`Welcome ${usuario.userName} !`}</p>
                            <p>Perfil: { usuario.perfil }</p>
                            <p>Nombre: { usuario.nombre }</p>
                            <p>Apellido: { usuario.apellido }</p>
                            <p>E-mail: { usuario.email }</p>
                        </div>
                        <div className='containerM__menu__container-menu-izquierdo__menu__menu'>
                            <nav>
                                <ul>
                                    <li onClick={ e=> {
                                        history.push(`/management/usuarios`)
                                        escondeMenuIzquierdo()
                                    }} >
                                        <SupervisorAccountIcon/>
                                        <a>Management user</a>
                                    </li>
                                    <li onClick={ e=> {
                                        history.push(`/management/compras`)
                                        escondeMenuIzquierdo()
                                    }} >
                                        <ShoppingCartIcon/>
                                        <a>Cerra Sesion</a>
                                    </li>
                                    <li>
                                        <ViewQuiltIcon/>
                                        <a onClick={ e=> { history.push(`/management/produccion`) }} >About</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="containerM__menu-responsive">
                <div className="containerM__menu-responsive__boton">
                    <MenuIcon  onClick={ despliegaMenu } />
                </div>
                <div  ref={menu} className="containerM__menu-responsive__sub-menu">
                    <nav>
                        <ul>
                            <li onClick={ e=> { history.push(`/management/produccion`) }} >
                                <PermDataSettingIcon/>
                                <a onClick={ e=> { history.push(`/management/produccion`) }}>Produccion</a>
                            </li>
                            <li onClick={ e=> { history.push(`/management/compras`) }} >
                                <ShoppingCartIcon/>
                                <a onClick={ e=> { history.push(`/compras`) }}>Compras</a>
                            </li>
                            <li>
                                <ViewQuiltIcon/>
                                <a onClick={ e=> { history.push(`/management/produccion`) }}  >Matriceria</a>
                            </li>
                            <li onClick={ e=> { history.push(`/management/ingenieria`) }}>
                                <PermDataSettingIcon/>
                                <a onClick={ e=> { history.push(`/management/ingenieria`) }} >Ingenieria</a>
                            </li>
                            <li onClick={ e=> { history.push(`/management/reportes`) }}>
                                <TimelineIcon/>
                                <a onClick={ e=> { history.push(`/management/reportes`) }} >Reportes</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='containerM__menu__container-menu-izquierdo'>
                    <div onClick={despliegaMenuIzquierdoResponsive} className='containerM__menu__container-menu-izquierdo__boton'>
                        <MoreVertIcon/>
                    </div>
                    <div onMouseLeave ={escondeMenuIzquierdoResponsive} ref={menuIzquierdoResponsive} className='containerM__menu__container-menu-izquierdo__menu'>
                        <div className='container-avatar'>
                            <img src={avatar}/>
                        </div>
                        <div className='containerM__menu__container-menu-izquierdo__menu__usuario'>
                            <p>{`Welcome ${usuario.userName} !`}</p>
                            <p>Perfil: { usuario.perfil }</p>
                            <p>Nombre: { usuario.nombre }</p>
                            <p>Apellido: { usuario.apellido }</p>
                            <p>E-mail: { usuario.email }</p>
                        </div>
                        <div className='containerM__menu__container-menu-izquierdo__menu__menu'>
                            <nav>
                                <ul>
                                    <li onClick={ e=> {
                                        history.push(`/management/usuarios`)
                                        escondeMenuIzquierdo()
                                    }} >
                                        <SupervisorAccountIcon/>
                                        <a>Management user</a>
                                    </li>
                                    <li onClick={ e=> {
                                        history.push(`/management/compras`)
                                        escondeMenuIzquierdo()
                                    }} >
                                        <ShoppingCartIcon/>
                                        <a>Cerra Sesion</a>
                                    </li>
                                    <li>
                                        <ViewQuiltIcon/>
                                        <a onClick={ e=> { history.push(`/management/produccion`) }}  >About</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu