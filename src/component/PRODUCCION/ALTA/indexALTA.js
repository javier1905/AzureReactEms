import React from 'react'
import AltaPlanillaPRODUCCION from './altaPlanillaPRODUCCION'
import './styleAltaPlanillaPRODUCCION.css'

class indexALTA extends React.Component {
    constructor ( props ) {
        super ( props )
        this.state = {  }
        this.controller = new AbortController (  )
    }
    componentWillUnmount (  ) {
        this.controller.abort (  )
    }
    render (  ) {
        return (
            <div>
                <AltaPlanillaPRODUCCION/>
            </div>
        );
    }
}

export default indexALTA