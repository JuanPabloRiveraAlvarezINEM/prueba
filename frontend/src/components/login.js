import axios from 'axios'
import React, {useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import '../styles/login.css'
import Cookies from 'universal-cookie'

function Login(){

  const cookies = new Cookies()
  const url = 'http://localhost:5000/sesion' 

  const[Correo,setCorreo] = useState()
  const[Pass,setPass] = useState()
  const[estado,setEstado] = useState('estado')

  const validar = async () => {
    event.preventDefault()
    const {data} = await axios.get(url) 
    if(data[0].correo == Correo && data[0].pass == Pass){
      cookies.set('correo', data[0].correo)
      cookies.set('pass', data[0].correo)
    } 
  }

  return(
    <div>
      <div className="titulo">
        <h2>Aplicacion</h2> 
      </div>
      <div className="contenedor1">
        <Form onSubmit={validar}>
          <Form.Group controlId="formBasicEmail">
           <Form.Label>Correo</Form.Label>
           <Form.Control 
              type="email"
              placeholder="Ingrese su correo"
              onChange = {(e)=>{setCorreo(e.target.value)}}
            />
           <Form.Label className="pass">Contraseña</Form.Label>
           <Form.Control 
              type="password" 
              placeholder="Ingrese su contraseña" 
              onChange = {(e)=>{setPass(e.target.value)}}
            />
          </Form.Group>
        <Button variant="primary" type="submit">
        ingresar
        </Button>
      </Form>
      <p>{estado}</p>
      </div>
    </div>
  )
}

export default Login
