import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Menu from '../MENU/indexMENU'
import Usuarios from '../USUARIOS/indexUSUARIOS'
import Produccion from '../PRODUCCION/indexPRODUCCION'
import Compras from '../COMPRAS/compras'
import VerificaLOGIN from '../../credenciales/verificaLOGIN'
import Ingenieria from '../INGENIERIA/ingenieria'
import Reportes from '../REPORTES/reportes'
import Permisos from '../ROUTERPROTECTED/permisoRutas'

const Management = props => {
	const match = useRouteMatch()
	return (
		<>
			<Menu />
			<>
				<Route path={`${match.path}/usuarios`}>
				<Permisos
					component = {Usuarios}
					patch = {`${match.path}/usuarios`}
					vecPermisos = {['Admin']}
				/>
				</Route>
				<Route path={`${match.path}/produccion`}>
					<Produccion />
				</Route>
				<Route path={`${match.path}/compras`}>
					<Permisos
						component = {Compras}
						patch = {`${match.path}/compras`}
						vecPermisos = {['Admin', 'nivel-4']}
					/>
				</Route>
				<Route path={`${match.path}/ingenieria`}>
					<Permisos
						component = {Ingenieria}
						patch = {`${match.path}/ingenieria`}
						vecPermisos = {['Admin', 'nivel-5']}
					/>
				</Route>
				<Route path={`${match.path}/reportes`}>
				<Permisos
					component = {Reportes}
					patch = {`${match.path}/reportes`}
					vecPermisos = {['Admin']}
				/>
				</Route>
			</>
			<VerificaLOGIN />
		</>
	)
}

export default Management
