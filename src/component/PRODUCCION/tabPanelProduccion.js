import React from 'react'
import {  Box , Typography } from '@material-ui/core'

const TabPanel = (props) => {
    const { children, value, index, ...other } = props
    return (
    <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
    >
        {value === index && <Box p={3}>{children}</Box>}
    </Typography>
    )
}
export default TabPanel