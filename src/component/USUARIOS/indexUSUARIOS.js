import React from 'react'
import ListarUsuarios from './ListarUsuarios'
import { connect } from 'react-redux'
import FindListaUSUARIOS from '../../Redux/Actions/findListaUSUARIOS'

class IndexUSUARIOS extends React.Component {
    constructor ( props ) {
        super ( props )
        this.state = {  }
        this.controller = new AbortController (  )
    }
    componentDidMount (  ) { this.props.FindListaUSUARIOS (  ) }
    componentWillUnmount (  ) { this.controller.abort (  ) }
    render (  ) {
        return (
            <div>
                <ListarUsuarios listadoUser = { this.props.UsuariosLISTA } />
            </div>
        )
    }
}
const mapStateToProps = state => { return {  UsuariosLISTA : state.UsuariosLISTA  } }
const mapDispatchToProps = { FindListaUSUARIOS }
const wrapper = connect ( mapStateToProps , mapDispatchToProps )
const component = wrapper ( IndexUSUARIOS )
export default component

