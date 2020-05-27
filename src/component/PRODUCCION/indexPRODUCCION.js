import ListaPlanillaProduccion from './LISTA/indexLISTA'
import { SnackbarProvider } from 'notistack'
import TabPanel from './tabPanelProduccion'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CallToActionIcon from '@material-ui/icons/CallToAction';

const ListaProduccion = ( props ) => {
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
            <Tab label="Planilla Producion" icon={<CallToActionIcon />} {...a11yProps(0)} />
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <SnackbarProvider maxSnack = { 3 } >
                <ListaPlanillaProduccion/>
            </SnackbarProvider>
        </TabPanel>
    </div>
    )
}

export default ListaProduccion