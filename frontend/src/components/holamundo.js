import React , {useState,useEffect}from 'react'
import Cookies from 'universal-cookie'
import {Form,Button,Card, Row, Col} from 'react-bootstrap'
import '../styles/main.css'

const cookies = new Cookies()
const hoy = new Date()
const fech = hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear()

function cerrar(){
    cookies.remove('correo')
    cookies.remove('pass')
    window.location.href='/'
}
  
function eliminar(){
      console.log('entrentroo')
      const id = cookies.get('id')
      const eli = 'http://localhost:5000/eliminar/'+id 
      console.log('eliminar')
      fetch(eli)
      window.location.reload()
  }

function insertar(){
    window.location.href='/insertar'
}

function editar(){
    window.location.href='/editar'
}

class Main extends React.Component{

  state = {
    Data:[]
  }

  componentDidMount(){
    if(!cookies.get('correo') || cookies.get('correo')== null)window.location.href="/"
    console.log(cookies.get('correo'))
    const url = 'http://localhost:5000/tareas/'+cookies.get('correo')
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(res => this.setState({Data:res}))
  }

  render(){
    return(
      <div>
        <div>
        <Row className="d-flex justify-content-center">
          {this.state.Data.map(e=>
         <Card key={e} as={Col} xl={3} lg={3} md={4} sm={6} xs={10} style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{e.titulo}</Card.Title>
          <Card.Text>
            {e.descripcion}
          </Card.Text>
          <Card.Text>
            {e.prioridad}
          </Card.Text>
          <Card.Text>
            {e.fecha}
          </Card.Text>
          <Button onClick={cookies.set('id',e._id), eliminar} variant="danger">Eliminar</Button>
          <Button onClick={cookies.set('id',e._id), editar} className="editar" variant="primary">Editar</Button>
        </Card.Body>
      </Card>
          )}
      </Row>
        </div>
        <div>
          <Button  onClick={cerrar} className="salir" variant="primary" type="submit">
              cerrar sesion 
          </Button>
          <Button onClick={insertar} className="crear" variant="primary" type="submit">
              Crear tarea 
          </Button>
        </div>
      </div>
    )
  }
}

export default Main
