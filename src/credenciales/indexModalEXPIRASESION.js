import React from 'react'
import ModalEXPIRASESION from './modalEXPIRASESION'
import {withRouter} from 'react-router-dom'


class indexModalEXPIRASESION extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:true
        };
    }
    esconderModal =()=>{
        this.setState({show:false},()=>{
            this.props.history.push("/")
        })
    }
    render() {
        return (
            <div>
                <ModalEXPIRASESION
                    show={this.state.show}
                    esconderModal={this.esconderModal}
                />
            </div>
        );
    }
}
export default withRouter(indexModalEXPIRASESION);