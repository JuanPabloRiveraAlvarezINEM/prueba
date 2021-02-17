const {Router} = require('express')
const router = Router()
const connection = require('../db/db')
const bcrypt = require('bcrypt')

router.get('/crear_usuario/:nombre/:correo/:pass', async(req,res)=>{
  const {nombre,correo,pass} = req.params 
  console.log(pass)
  let aux = ''
  const db = await connection()
  //const salt = 1
  //const otro_texto= 'h'
  /*bcrypt.hash(pass, salt, (err,hash)=>{
    if(err){
      console.log('error')
    }else{
      console.log(hash)
      aux = hash
    }
  })*/
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
