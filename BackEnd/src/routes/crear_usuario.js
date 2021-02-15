const {Router} = require('express')
const router = Router()
const connection = require('../db/db')

router.get('/crear_usuario/:nombre/:correo/:pass', async(req,res)=>{
  const {nombre,correo,pass} = req.params 
  const db = await connection()
  db.collection('usuarios').insert(
    {
      "nombre":nombre,
      "correo":correo,
      "pass":pass,
      "confirmacion":"no"
    },
    (err,result)=>{
      if(err){
        res.send('error')
      }else{
        res.send('insertado')
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
