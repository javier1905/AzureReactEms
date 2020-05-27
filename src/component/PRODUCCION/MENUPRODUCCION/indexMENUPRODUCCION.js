import React from 'react'
import {withRouter} from 'react-router-dom'
import './styleMENUPRODUCCION.css'

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

class indexMENUPRODUCCION extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false
        }
    }
    adminRUTAS = e =>{ console.log(e.target.children)
        const rutaOrigen = this.props.match.path
        if(e.target.name === 'alta') this.props.history.push(`${rutaOrigen}/alta`)
        if(e.target.name === 'baja') this.props.history.push(`${rutaOrigen}/baja`)
        if(e.target.name === 'lista') this.props.history.push(`${rutaOrigen}/lista`)
    }
    handleClick = () => {
        this.setState({open:!this.state.open})
    }
    render() {
        const useStyles = makeStyles(theme => ({
            root: {
                width: '100%',
                maxWidth: 360,
                backgroundColor: theme.palette.background.paper,
            },
            nested: {
                paddingLeft: theme.spacing(4),
            },
        }))
        const classes = useStyles
        return (
            <div id=''>
                <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    Produccion
                    </ListSubheader>
                }
                className={classes.root}
                >
                    <ListItem name='alta' onClick={e=>{this.props.history.push(`${this.props.match.path}/alta`)}} button>
                        <ListItemIcon>
                        <SendIcon />
                        </ListItemIcon>
                        <ListItemText name='alta' primary="Alta"/>
                    </ListItem>
                    <ListItem button onClick={e=>{this.props.history.push(`${this.props.match.path}/baja`)}}>
                        <ListItemIcon>
                        <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Baja" />
                    </ListItem>
                    <ListItem button onClick={e=>{this.props.history.push(`${this.props.match.path}/Lista`)}}>
                        <ListItemIcon>
                        <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista" />
                    </ListItem>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                </div>
        );
    }
}

export default withRouter(indexMENUPRODUCCION);