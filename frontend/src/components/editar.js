import React,{useEffect,useState} from 'react'
import Cookies from 'universal-cookie'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'

function Editar(){

  const cookies = new Cookies()
  
  const url = 'http://localhost:5000/editar'
  
  const[titulo,setTitulo] = useState()
  const[prioridad,setPrioridad] = useState()
  const[descripcion,setDescripcion] = useState()
  const[fecha,setFecha] = useState()

  const cancelar = async(event)=>{
    event.preventDefault()
    window.location.href="/tareas"
  }

  useEffect(()=>{
    if(!cookies.get('token') || cookies.get('token')== null)window.location.href="/"
  })
  
  const editar = async(event)=>{
    event.preventDefault()
    if(titulo && prioridad && descripcion && fecha){
      alert(fecha)
      const {data} = await axios.get(url+'/'+cookies.get('id')+'/'+titulo+'/'+descripcion+'/'+prioridad+'/'+fecha+'/'+cookies.get('correo')) 
      if(data){
        alert("editado con exito")
        window.location.href='/tareas'
      }else{
        alert("error")
      }
    }else{
      alert("Faltan datos")
    }
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
    <Button onClick={editar} className="insertar" variant="primary">editar</Button>
    <Button onClick={cancelar} className="cancelar" variant="danger">Cancelar</Button>
   </Form>
  </div>
  )
}

export default Editar
