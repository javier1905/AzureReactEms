import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Menu from './MENU2'
import './styleMENU.css'

class indexMENU extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() { 
        return (
            <div >
                <Menu user={this.props.UsuarioLOGIN}  />
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        UsuarioLOGIN : state.UsuarioLOGIN
    }
}

const wrapper = connect(mapStateToProps)
const component = wrapper(indexMENU)
export default withRouter(component)