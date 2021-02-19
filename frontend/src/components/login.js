import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import '../styles/login.css'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'

function Login(){

  const cookies = new Cookies()
  const url = 'http://localhost:5000/sesion' 

  const[Correo,setCorreo] = useState()
  const[Pass,setPass] = useState()
  const[estado,setEstado] = useState('estado')
  const[enlace, setEnlace] = useState('/')

  useEffect(()=>{
    if(cookies.get('token')) window.location.href='/tareas' 
  })

  const registrar = (event)=>{
       event.preventDefault()
       window.location.href="/insertaru"
  }

  const validar = async (event) => {
    if(Correo && Pass){ 
    event.preventDefault() 
    const {data} = await axios.get(url+'/'+Correo+'/'+Pass) 
        if(data){
          if(data != 'noentro'){
            cookies.set('token', data.token)
            cookies.set('correo',Correo)
            cookies.set('pass',Pass)
            console.log(data.token)
            alert(data.token)
            alert(cookies.get('correo'))
            window.location.href='/tareas'
          }else{
            alert("credneciales no registradas")
          }
    } 
    }
  }
  

  return(
    <div>
      <div className="titulo">
        <h2>Aplicacion</h2> 
      </div>
      <div className="contenedor1">
        <Form >
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
          <Button onClick={validar}  variant="primary" type="submit">
            ingresar
          </Button>
          <Button onClick={registrar} className="registrar" variant="primary" type="submit">
            registrar
          </Button>
      </Form>
      </div>
    </div>
  )
}

export default Login
