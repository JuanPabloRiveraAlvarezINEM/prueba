import React from 'react'
import Cookies from 'universal-cookie'
import {Button,Card, Row, Col} from 'react-bootstrap'
import '../styles/main.css'

const cookies = new Cookies()
const url = 'http://localhost:5000/tareas/'
const url_eliminar = 'http://localhost:5000/eliminar/' 

function cerrar(){
  cookies.remove('token')
  window.location.href='/'
}

const eliminar = function(id){
  fetch(url_eliminar+id)
  window.location.reload()
}


function insertar(){
  window.location.href='/insertar'
}

const editar =  function(id){
  cookies.set('id',id)
  window.location.href='/editar'
}

function get_date(){
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()+1
  const day = date.getDate()
  return year+'-'+month+'-'+day
}

const calcular_faltante = function(fecha){
  //Tomar milisegundos de la fecha ingresada
  let fecha_fin=new Date(fecha).getTime();
  //definir la fecha actual y sus milisegundos
  const now=new Date;
  const day=now.getDate();
  const month=(now.getMonth()+1);
  const year=now.getFullYear();
  let fecha_actual=`${year}-${month}-${day}`;
  fecha_actual=new Date(fecha_actual).getTime();
  //operación para calcular los días que faltan
  let diff=fecha_fin-fecha_actual;
  return Math.round(diff/(1000*60*60*24));
}

class Main extends React.Component{

  state = {
    Data:[]
  }

  componentDidMount(){
    if(!cookies.get('token') || cookies.get('token')== null)window.location.href="/"
    const enlace = url+cookies.get('correo')+'/'+cookies.get('pass')+'/'+cookies.get('token')
    console.log(url)
    fetch(enlace)
      .then(res => res.json())
      .then(res => this.setState({Data:res}))
  }

  render(){
    return(
      <div>
      <div>
      <Row className="d-flex justify-content-center">
      {this.state.Data.map(e=>
        <Card key={e} as={Col} xl={3} lg={3} md={4} sm={6} xs={10} className='targeta' style={{ width: '18rem'}}>
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
        <p>{get_date()}</p>
        <Button onClick={()=>{eliminar(e._id)}} variant="danger">Eliminar</Button>
        <Button onClick={()=>{editar(e._id)}} className="editar" variant="primary">Editar</Button>
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
