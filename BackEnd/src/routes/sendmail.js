const {Router} = require('express')
const router = Router()
const transporter = require('../mailer/mailer')
const connection = require('../db/db')

router.get('/sendmail/:correo/:pass', async(req,res)=>{
  const {correo,pass} = req.params
  const mailOptions = {
      from: 'mailerjuan0@gmail.com',
      to: correo, 
      subject: 'CONFIRMACION APLICACION TAREAS',
      html: '<p>Gracias por elegir nuestros servicios, sus credenciales son las siguientes correo: '+correo+' contraseña: '+pass+' </p>'
  }
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
            res.send(error);
          } else {
            res.send('Email sent: ' + info.response);
          }
  })
})

router.get('/confirmar_correo/:correo', async(req,res)=>{
  const {correo} = req.params
  const db = await connection() 
  db.collection('usuarios').find({"correo":correo}).toArray((err,result)=>{
    if(err){
      res.send(err)
    }else{
      db.collection('usuarios').update({"correo":correo},{
        "nombre": result[0].nombre,
        "correo": result[0].correo,
        "pass": result[0].pass,
        "confirmacion": 'si'
        },(err,result)=>{
          if(err){
            res.send(err)
          }else{
            res.send('echo')
          }
      }) 
     }
  }) 
})

module.exports = router
