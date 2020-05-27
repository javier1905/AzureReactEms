import React from 'react'
import Piezas from './PIEZAS/listaPiezas'
import Procesos from './PROCESOS/listaProcesos'
import ListaDefectos from './DEFECTOS/listaDefectos'
import ListaMoldes from './MOLDES/listaMoldes'
import ListaParadasMaquina from './PARADASMAQUINA/listaParadasMaquina'
import ListaMaquinas from './MAQUINAS/listaMaquinas'
import ListarTrabajadores from './TRABAJADORES/listaTrabajadores'
import TabPanel from './tabPanelIngenieria'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ExtensionIcon from '@material-ui/icons/Extension'
import SpellcheckIcon from '@material-ui/icons/Spellcheck'
import HealingIcon from '@material-ui/icons/Healing'
import DashboardIcon from '@material-ui/icons/Dashboard'
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard'
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import CategoryIcon from '@material-ui/icons/Category'
import ListarOperaciones from './OPERACIONES/listaOperaciones'
import ListaAreas from './AREAS/listaAreas'
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'
import ListaPuestos from './PUESTOS/listaPuestos'
import PeopleIcon from '@material-ui/icons/People'
import ListaPlantas from './PLANTAS/listaPlantas'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import ListaTiposMaquina from './TIPOSMAQUINA/listaTiposMaquina'

const Ingenieria = props => {
	const [value, setValue] = React.useState(0)
	function a11yProps(index) {
		return {
			id: `scrollable-force-tab-${index}`,
			'aria-controls': `scrollable-force-tabpanel-${index}`
		}
	}
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	return (
		<div>
			<AppBar position='static' color='default'>
				<Tabs
					value={value}
					onChange={handleChange}
					variant='scrollable'
					scrollButtons='on'
					indicatorColor='primary'
					textColor='primary'
					aria-label='scrollable force tabs example'
				>
					<Tab label='Piezas' icon={<ExtensionIcon />} {...a11yProps(0)} />
					<Tab label='Procesos' icon={<SpellcheckIcon />} {...a11yProps(1)} />
					<Tab label='Defectos' icon={<HealingIcon />} {...a11yProps(2)} />
					<Tab label='Moldes' icon={<DashboardIcon />} {...a11yProps(3)} />
					<Tab
						label='Paradas de maquina'
						icon={<DepartureBoardIcon />}
						{...a11yProps(4)}
					/>
					<Tab
						label='Maquinas'
						icon={<DirectionsBusIcon />}
						{...a11yProps(5)}
					/>
					<Tab
						label='Trabajadores'
						icon={<DirectionsWalkIcon />}
						{...a11yProps(6)}
					/>
					<Tab label='Operaciones' icon={<CategoryIcon />} {...a11yProps(7)} />
					<Tab
						label='Areas'
						icon={<ChromeReaderModeIcon />}
						{...a11yProps(8)}
					/>
					<Tab label='Puestos' icon={<PeopleIcon />} {...a11yProps(9)} />
					<Tab label='Plantas' icon={<LocationCityIcon />} {...a11yProps(10)} />
					<Tab
						label='Tipos de maquina'
						icon={<LocationCityIcon />}
						{...a11yProps(11)}
					/>
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Piezas />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Procesos />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<ListaDefectos />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<ListaMoldes />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<ListaParadasMaquina />
			</TabPanel>
			<TabPanel value={value} index={5}>
				<ListaMaquinas />
			</TabPanel>
			<TabPanel value={value} index={6}>
				<ListarTrabajadores />
			</TabPanel>
			<TabPanel value={value} index={7}>
				<ListarOperaciones />
			</TabPanel>
			<TabPanel value={value} index={8}>
				<ListaAreas />
			</TabPanel>
			<TabPanel value={value} index={9}>
				<ListaPuestos />
			</TabPanel>
			<TabPanel value={value} index={10}>
				<ListaPlantas />
			</TabPanel>
			<TabPanel value={value} index={11}>
				<ListaTiposMaquina />
			</TabPanel>
		</div>
	)
}

export default Ingenieria
