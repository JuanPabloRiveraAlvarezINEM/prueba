import React,{useEffect,useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import '../styles/insertar.css'
import Cookies from 'universal-cookie'

function Insertar(){

  const cookies = new Cookies()
  const url = 'http://localhost:5000/crear_tarea'

  const[titulo,setTitulo] = useState()
  const[prioridad,setPrioridad] = useState()
  const[descripcion,setDescripcion] = useState()
  const[fecha,setFecha] = useState()

  useEffect(()=>{
    if(!cookies.get('token') || cookies.get('token')== null)window.location.href="/"
  })

  const insertar = async(event)=>{
    event.preventDefault()
    if(titulo && prioridad && descripcion && fecha){
      const {data} = await axios.post(url,{
        titulo,
        descripcion,
        prioridad,
        fecha,
        correo: cookies.get('correo'),
        pass: cookies.get('pass'),
        token: cookies.get('token'),
      }) 
      if(data){
        alert("ingresado con exito")
        window.location.href='/tareas'
      }else{
        alert("error")
      }
    }else{
      alert("Faltan datos")
    }
  }
  
  const cancelar = async(event)=>{
    event.preventDefault()
    window.location.href="/tareas"
  }

 return(
  <div className="Contenedor">
    <Form>
     <Form.Group>
       <Form.Label>Titulo</Form.Label>
       <Form.Control  onChange={(e)=>{setTitulo(e.target.value)}} type="text" required />
       <Form.Text className="text-muted">
       </Form.Text>
     </Form.Group>
     <Form.Group>
       <Form.Label>Prioridad</Form.Label>
       <Form.Control onChange={(e)=>{setPrioridad(e.target.value)}} type="text" required />
       <Form.Text className="text-muted">
       </Form.Text>
     </Form.Group>
     <Form.Group controlId="exampleForm.ControlTextarea1">
       <Form.Label>Descripcion</Form.Label>
       <Form.Control onChange={(e)=>{setDescripcion(e.target.value)}} as="textarea" rows={3} required/>
     </Form.Group>
     <Form.Group>
       <Form.Label>Fecha</Form.Label>
       <Form.Control onChange={(e)=>{setFecha(e.target.value)}} type="date" required />
       <Form.Text className="text-muted">
       </Form.Text>
     </Form.Group>
    <Button onClick={insertar} className="insertar" variant="primary">insertar</Button>
    <Button onClick={cancelar} className="cancelar" variant="danger">Cancelar</Button>
   </Form>
  </div>
 )
}

export default Insertar
