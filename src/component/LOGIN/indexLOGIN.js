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
        this.state={ }
    }
    render() {
        return (
            <div id='ContenedorLogin'>
                <div id='Slider'>
                    <Carousel >
                        <Carousel.Item >
                            <img
                            className="img-slider"
                            src= { granallado }
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            {/* <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="img-slider"
                            src= { mecanizado }
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            {/* <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="img-slider"
                            src= { inyectora }
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            {/* <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                    </div>
                <div className="FormLogin">
                    <FormLOGIN/>
                </div>
            </div>
        )
    }
}

export default withRouter(indexLOGIN);