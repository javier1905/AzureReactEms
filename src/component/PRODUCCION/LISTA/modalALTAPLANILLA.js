
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Alta  from  '../ALTA/indexALTA'
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(0),
    flex: 1,
  },
}))
const Transition = React.forwardRef ( function Transition( props , ref ) { return <Slide direction="up" ref={ref} {...props} /> } )
export default function ModalAltaPlanilla ( props ) {
  const classes = useStyles(  )
  return (
    <div>
      <Dialog fullScreen open = { props.show } onClose = { props.handleClose } TransitionComponent = { Transition }>
        <AppBar className = { classes.appBar } >
          <Toolbar>
            <Typography variant="h3" className = { classes.title } >
              Planilla Produccion
            </Typography>
            <IconButton edge="start" color="inherit" onClick = { props.handleClose } aria-label = "close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
          <Alta planillaUpdate = { props.planillaUpdate } />
      </Dialog>
    </div>
  )
}