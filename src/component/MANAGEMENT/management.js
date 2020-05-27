import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Menu from '../MENU/indexMENU'
import Usuarios from '../USUARIOS/indexUSUARIOS'
import Produccion from '../PRODUCCION/indexPRODUCCION'
import Compras from '../COMPRAS/compras'
import VerificaLOGIN from '../../credenciales/verificaLOGIN'
import Ingenieria from '../INGENIERIA/ingenieria'
import Reportes from '../REPORTES/reportes'

const Management = props => {
	const match = useRouteMatch()
	return (
		<>
			<Menu />
			<>
				<Route path={`${match.path}/usuarios`}>
					<Usuarios />
				</Route>
				<Route path={`${match.path}/produccion`}>
					<Produccion />
				</Route>
				<Route path={`${match.path}/compras`}>
					<Compras />
				</Route>
				<Route path={`${match.path}/ingenieria`}>
					<Ingenieria />
				</Route>
				<Route path={`${match.path}/reportes`}>
					<Reportes />
				</Route>
			</>
			<VerificaLOGIN />
		</>
	)
}

export default Management
