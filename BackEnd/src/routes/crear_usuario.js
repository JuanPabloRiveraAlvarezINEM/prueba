const {Router} = require('express')
const router = Router()
const connection = require('../db/db')
const bcrypt = require('bcrypt')
const transporter = require('../mailer/mailer')

router.get('/crear_usuario/:nombre/:correo/:pass', async(req,res)=>{
  const {nombre,correo,pass} = req.params 
  console.log(pass)
  const db = await connection()
  const salt = 1
  const contrasena = await bcrypt.hash(pass, salt)
  console.log(contrasena)
  db.collection('usuarios').insert(
    {
      "nombre":nombre,
      "correo":correo,
      "pass":contrasena
    },
    async(err,result)=>{
      if(err){
        res.send('error')
      }else{
        res.send('insertado')
        const mail = await transporter.sendMail({
          from: "mailerjuan0@gmail.com",
          to:correo,
          subject:'Aplicacion Tareas',
          text:nombre+" Gracias por escoger nuestros serivcios"
        })
        console.log(mail)
      }
    }
  ) 
})

router.get('/comprobar/:correo', async(req,res)=>{
  const {correo} = req.params
  const db = await connection()
  db.collection('usuarios').find({"correo":correo}).toArray((err,result)=>{
    res.send(result)
  })
})

module.exports = router
