import React  from 'react'
import Moment from 'moment'
import './styleOeeGra.css'

const Items = ( props ) => {
    var styletr = {}
    var claseTr = ''
    var Dfooter = ''
    var Rfooter = ''
    var Qfooter = ''
    var OEEfooter = ''
    if ( props.ultimo ){
        claseTr = 'footer'
        Dfooter = 'Dfooter'
        Rfooter = 'Rfooter'
        Qfooter = 'Qfooter'
        OEEfooter = 'OEEfooter'
        styletr = { background : '#4141B3' , color : 'white' , boxShadow : '1px 1px  1px grey ' }
    }
    const calculoDisponibilidad= (  ) => {
        if ( props.items) {
            if ( isNaN ( ( ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP ) / (props.items.minTotal - props.items.pmProgramada)  * 100 ).toFixed ( 2 ) )  ) {
                return 0
            }
            else {
                return ( ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP ) / (props.items.minTotal - props.items.pmProgramada)  * 100 ).toFixed ( 2 )
            }
        }
    }
    const calculoRendimiento = (  ) => {
        if ( isNaN ( (props.items.minPorPiezaProducidas / ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP )* 100  ).toFixed(2) ) ) {
            return 0
        }
        else {
            return (props.items.minPorPiezaProducidas / ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP )* 100  ).toFixed(2)
        }
    }
    const calculoCalidad = (  ) => {
        if ( isNaN ( ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ))*100).toFixed(2) ) ) {
            return 0
        }
        else if (  ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ))*100) === - Infinity  ) {
            return 0
        }
        else
        {
            return ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ))*100).toFixed(2)
        }
    }
    const calculoOEE = (  ) => {
        var dato =  ( ( ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) / (props.items.minTotal - props.items.pmProgramada)) *
        (props.items.minPorPiezaProducidas / ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP ) ) *
        ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ) ) ) * 100 ).toFixed ( 2 )
        if ( isNaN ( dato ) ) {
            return 0
        }
        else {
            return dato
        }
    }
    return (
        <tr className = { claseTr } style = { styletr } >
            <td>{ props.ultimo ? 'Total' : props.idAgrupar === 1 ? new Moment ( props.items.fechaProduccion).add(1 , 'd').format ( 'DD/MM/YYYY' ) : props.items.fechaProduccion}</td>
            <td>{props.items.nombreMaquina}</td>
            <td>{props.items.nombrePieza}</td>
            <td>{props.items.nombreMolde}</td>
            <td>{props.items.piezasXhora}</td>
            <td>{props.items.produccion}</td>
            <td>{props.items.totalRechazos}</td>
            <td>{props.items.pmMatrizeria}</td>
            <td>{props.items.pmMantenimiento}</td>
            <td>{props.items.pmProduccion}</td>
            <td>{props.items.totalPNP}</td>
            <td>{props.items.pmProgramada}</td>
            <td>{ props.items.minTotal - props.items.pmProgramada - props.items.totalPNP}  </td>
            <td>{ props.items.minTotal - props.items.pmProgramada}</td>
            <td>{props.items.minTotal}</td>
            {/* <td className = { Dfooter }>{ `${( (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) / (props.items.minTotal - props.items.pmProgramada)  * 100 ).toFixed ( 2 )}%` }</td>
            <td className = { Rfooter }>{ `${ (props.items.minPorPiezaProducidas / ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP )* 100  ).toFixed(2) }%`}</td>
            <td className = { Qfooter } >{`${( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ))*100).toFixed(2)}%`}</td>
            <td className = { OEEfooter }>
                { `${ ( ( ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) / (props.items.minTotal - props.items.pmProgramada)) *
                (props.items.minPorPiezaProducidas / ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP ) ) *
                ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ) ) ) * 100 ).toFixed ( 2 )
                }%` }
            </td> */}
            <td className = { Dfooter }>{`${calculoDisponibilidad (  )}%` }</td>
            <td className = { Rfooter }>{`${ calculoRendimiento (  ) }%`}</td>
            <td className = { Qfooter } >{ `${calculoCalidad (  )}%`}</td>
            <td className = { OEEfooter }>{ `${ calculoOEE (  ) }%` }</td>
        </tr>
    )
}
export default Items