import React, { useState, useEffect } from 'react'
import PiezaXhora from './piezaXhora'
import { Table } from 'react-bootstrap'
import Loading from '@material-ui/core/CircularProgress'
import MyComponent from '../../AAprimary/misComponentes'
import FormAltaPiezaXhora from './formAltaPiezaXhora'
import $ from 'jquery'

const ListaPiezasXhora = ( props ) => {
  const [loading , setLoading] = useState ( true )
  const [vecPiezasXhora , setVecPiezasXhora] = useState ( [  ] )
  const [modo , setModo] = useState ( 'normal' )
  const [myPiezaxhs , setMyPiezaxhs] = useState ( undefined )
  const [limpiaCampos , setLimpiaCampos] = useState ( true )

  useEffect ( (  ) => {
    setLoading ( false )
    setVecPiezasXhora ( props.vecPiezasXhora )
    actualizaModo (  )
  } , [ props ] )
  const actualizaModo = ( Mymodo , piezaXhora ) => {
    var formAltaPiezaXhora = $('#formAltaPiezaXhora2')
    formAltaPiezaXhora.slideUp (  )
    setMyPiezaxhs ( piezaXhora )
    setModo ( Mymodo )
  }
  const showFormAltaPiezaXhora = e => {
    setMyPiezaxhs ( undefined )
    setModo ( 'normal' )
    var formAltaPiezaXhora = $('#formAltaPiezaXhora2')
    formAltaPiezaXhora.slideToggle (  )
    setLimpiaCampos(!limpiaCampos)
  }
  return (
    <div style = { { marginTop : 30  } }>
      <div>
        <MyComponent.botonAdd texto = 'add time' onClick = { showFormAltaPiezaXhora } />
      </div>
      <div id='formAltaPiezaXhora2' style = { { display : 'none' } }>
        <FormAltaPiezaXhora limpiaCampos = {limpiaCampos} showFormAltaPiezaXhora = { showFormAltaPiezaXhora }  piezaXhora = { vecPiezasXhora[vecPiezasXhora.length-1] ? vecPiezasXhora[vecPiezasXhora.length-1] : undefined }  MethodInsertPiezaXhora = { props.MethodInsertPiezaXhora } />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Desde</th>
            <th>Hasta</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ?
            <tr>
              <td colSpan = { 5 }>
                <Loading />
              </td>
            </tr>
            :
            Array.isArray ( vecPiezasXhora  ) && vecPiezasXhora.length > 0 ?
            vecPiezasXhora.map ( ( pxh , i ) => {
              return (
                <PiezaXhora
                  modo = { pxh === myPiezaxhs ? modo : 'normal'  }
                  actualizaModo = { actualizaModo }
                  index ={ i }
                  MethodVecPiezaXhoras = { props.MethodVecPiezaXhoras }
                  MethodDeletePiezaXhora = { props.MethodDeletePiezaXhora }
                  fechaDesdeAnteriror = { vecPiezasXhora[i-1] ? vecPiezasXhora[i-1].desdePiezasXhs : undefined }
                  piezaXhora = { pxh }
                  fechaHastaPosterior = { vecPiezasXhora[i+1] ? vecPiezasXhora[i+1].hastaPiezasXhs : undefined }
                  key = { i }
                />
              )
            } )
            :
            <tr>
            <td colSpan = { 5 }>
              noFound
            </td>
          </tr>
          }
        </tbody>
      </Table>
    </div>
  )
}

export default ListaPiezasXhora