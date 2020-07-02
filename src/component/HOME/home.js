import  React , {useEffect } from 'react'
import Menu from '../MENU/indexMENU'
import VerificaLOGIN from '../../credenciales/verificaLOGIN'
import ImgHeaders from '../../Imagenes/encabezado_home_ems.jpg'
import './styleHome.css'
import $ from 'jquery'
import Typography from '@material-ui/core/Typography'

const Home = () => {
    const w = $(window)
    useEffect(() => {
        const t = setTimeout ( (  ) => {
            const imgHeader = $('#imgHeader')
            imgHeader.css ( 'opacity' , 1 )
        } , 1000 )
        const managementScroll = ( e ) => {
            try {
                var y_Scroll = document.documentElement.scrollTop
                var legado = $('#legado')
                var y_legado = legado.offset(  ).top
                var elementsIntoLegado = $('#legado > *') // arrays elemnts
                if ( ( y_legado - 450  ) <  y_Scroll) {
                    legado.css ( 'opacity' , 1 )
                }
                else if ( y_Scroll < ( y_legado - 450 ) ) { legado.css ( 'opacity' , 0 ) }
                for ( let x = 0 ; x < elementsIntoLegado.length  ; x++ ){
                    var posElement = elementsIntoLegado[x].offsetTop
                    if ( y_Scroll > ( posElement - 450 ) ) { elementsIntoLegado[x].style.opacity = 1  }
                    else if ( y_Scroll < ( posElement - 450 )) { elementsIntoLegado[x].style.opacity = 0 }
                }
                const menu = $ ('#menu')
                menu.css ( 'opacity' , 0 ).css( 'transition' , 'all 2s' )
                const t2 = setTimeout ( (  ) => {
                    menu.css ( 'opacity' , 1 )
                } , 3000 )
            }
            catch ( e ) { }
        }
        w.scroll( managementScroll )
        return () => {
            w.removeAttr('scroll')
            clearTimeout(t)
        }
    })
    return(<div>
        <div id = 'menu' ><Menu/></div>
        <img id = 'imgHeader' style = { { width : '100%' } } alt = 'Headers' src = { ImgHeaders }></img>
        <div id = 'legado'>
            <Typography className = 'titleLegado' variant = 'h1' >Legado</Typography>
            <div id='vision'className = 'childLegado'>
                <Typography className = 'titleLegado' variant = 'h3' >Vision</Typography>
                <p>
                    Proporcionar acceso a la información del mundo en un solo clic.
                    Google es una de las grandes empresas del siglo XXI, y eso no es casualidad. Controlar y 
                    hacer disponible toda la información del mundo es una labor que parece imposible; sin embargo, es ahí donde el líder tecnológico 
                    quiere llegar.
                    Es una declaración concisa y ambiciosa, a la vez que tiene un efecto fuerte y emocionante
                </p>
            </div>
            <div id= 'mision' className = 'childLegado'>
                <Typography className = 'titleLegado' variant = 'h3' >Mision</Typography>
                <p>
                    Organizar la información del mundo para que todos puedan acceder a ella y usarla.
                    Cuando tienes una pregunta ¿qué es lo primero qué haces? Tú y otros millones de personas
                    acuden al mismo lugar para encontrar la respuesta: Google. Larry Page, su cofundador y CEO, 
                    describió una vez el motor de búsqueda perfecto como algo capaz de entender lo que quieres y 
                    ofrecerte exactamente lo que necesitas.
                    En consecuencia, trabajan para comprender mejor la intención de la gente al usar su buscador, al mismo tiempo 
                    que actualizan sus algoritmos para ofrecer la información más relevante y útil.
                </p>
            </div>
            <div id = 'valores' className = 'childLegado'>
                <Typography className = 'titleLegado' variant = 'h3' >valores</Typography>
                <p>
                    Aprendizaje, éxito e inclusión.
                    Google trabaja en un plan de responsabilidad social arduo. Por medio de distintas acciones, ayuda a que miles de 
                    personas tengan a su alcance nuevos aprendizajes; los emprendedores y profesionistas actualicen sus conocimientos 
                    tecnológicos, así como miles de comunidades puedan ser escuchadas
                </p>
            </div>
            <div id = 'containerClientes'>
            </div>
        </div>
        <footer>
        </footer>
        <VerificaLOGIN/>
    </div>)
}
export default Home