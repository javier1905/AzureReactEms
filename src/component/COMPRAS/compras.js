import React from 'react'
import ListaClientes from './CLIENTES/listaClientes'
// import Typography from '@material-ui/core/Typography'
import TabPanel from './tabPanelCompras'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

const Compras = ( props ) => {
    const [value , setValue] = React.useState ( 0 )
    function a11yProps(index) {
        return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
        }
    }
    const handleChange = ( event , newValue ) => { setValue ( newValue ) }
    return (
    <div >
        <AppBar position="static" color="default">
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
        >
            <Tab label="Clientes" icon={<EmojiPeopleIcon />} {...a11yProps(0)} />
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <ListaClientes />
        </TabPanel>
    </div>
    )
}

export default Compras