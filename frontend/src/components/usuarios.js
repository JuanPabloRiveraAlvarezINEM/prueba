import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import axios from 'axios'
import '../styles/insertaru.css'
import Cookies from 'universal-cookie'

function Usuarios(){

  const url ='http://localhost:5000/crear_usuario'
  const urlComprobar = 'http://localhost:5000/comprobar/'
  const urlCorreo = 'http://localhost:5000/sendmail'

  const cookies = new Cookies()

  const [nombre,setNombre] = useState()
  const [correo,setCorreo] = useState()
  const [pass1,setPass1] = useState()
  const [pass2,setPass2] = useState()

  const validar = async (event)=>{
    event.preventDefault()
    if(nombre && correo && pass1 && pass2){
      if(pass1 != pass2){
        alert("las contraseñas no coinciden")
      }else{
        try{
            const {data} = await axios.get(urlComprobar+correo)
            if(data[0].correo){
              if(data[0].correo == correo){
                alert("ya hay una cuenta registrada con ese correo")
              }
            }
        }catch{
          const {data} = await axios.get(url+'/'+nombre+'/'+correo+'/'+pass1)
          if(data == 'insertado'){
            alert('usuarios registrado exitasamente')
            fetch(urlCorreo+'/'+correo)
            cookies.set('correo',correo)
            cookies.set('pass',pass1)
            window.location.href='/tareas'
          }
        }
      }
    }else{
      alert("inserte todos los datos")
    }

  }

  return(
    <div className="contenedor">
    <Form>
      <Form.Group> 
        <Form.Label>Inserte su nombre</Form.Label>
        <Form.Control onChange={(e)=>{setNombre(e.target.value)}} type="text" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Inserte su correo</Form.Label>
        <Form.Control onChange={(e)=>{setCorreo(e.target.value)}} type="email" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Inserte su contraseña</Form.Label>
        <Form.Control onChange={(e)=>{setPass1(e.target.value)}} type="password"  />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Inserte de nuevo su contraseña</Form.Label>
        <Form.Control onChange={(e)=>{setPass2(e.target.value)}} type="password" />
      </Form.Group>
      <Button onClick={validar} variant="primary" type="submit">
        Registrarse
      </Button>
    </Form>
    </div>
  )
}

export default Usuarios
