import React from 'react'
import {withRouter} from 'react-router-dom'
import FormLOGIN from './formLOGIN'
import { Carousel } from 'react-bootstrap'
import './styleLOGIN.css'
import inyectora from '../../Imagenes/inyectora.jpg'
import granallado from '../../Imagenes/granallado.jpg'
import mecanizado from '../../Imagenes/mecanizado.jpg'

class indexLOGIN extends React.Component {
    constructor(props){
        super(props)
        this.state={
            alto : window.innerHeight 
        }
        window.addEventListener( 'resize' , ( document , e) => {
            this.setState( {alto : window.innerHeight} )
        } )
    }
    render() {
        return (
            <div id='ContenedorLogin' style={{height: this.state.alto}}>
                <div id='Slider' style={{height: this.state.alto}}>
                    <Carousel >
                        <Carousel.Item >
                            <img
                            style={{height: this.state.alto}}
                            className="d-block w-100"
                            src= { granallado }
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            style={{height: this.state.alto}}
                            className="d-block w-100"
                            src= { mecanizado }
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            style={{height: this.state.alto}}
                            className="d-block w-100"
                            src= { inyectora }
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                    </div>
                <div className="FormLogin" style={{height: this.state.alto}}>
                    <FormLOGIN/>
                </div>
            </div>
        )
    }
}

export default withRouter(indexLOGIN);