import React,{useEffect,useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import '../styles/insertar.css'
import Cookies from 'universal-cookie'

function Insertar(){

  const cookies = new Cookies()
  const url = 'http://localhost:5000/crear_tarea'
  const urlCorreo = 'http://localhost:5000/sendmail'

  const[titulo,setTitulo] = useState()
  const[prioridad,setPrioridad] = useState()
  const[descripcion,setDescripcion] = useState()

  useEffect(()=>{
    if(!cookies.get('correo') && !cookies.get('pass')) window.location.href='/' 
  })

  const insertar = async(event)=>{
    event.preventDefault()
    if(titulo && prioridad && descripcion){
      const {data} = await axios.get(url+'/'+titulo+'/'+descripcion+'/'+prioridad+'/'+cookies.get('correo')) 
      if(data){
        alert("ingresado con exito")
        const {data} = await axios.get()
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
    <Button onClick={insertar} className="insertar" variant="primary">insertar</Button>
    <Button onClick={cancelar} className="cancelar" variant="danger">Cancelar</Button>
   </Form>
  </div>
 )
}

export default Insertar
