const {Router} = require('express')
const router = Router()
const connection = require('../db/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/sesion/:correo/:pass', async(req,res)=>{
  const {correo,pass} = req.params
  const db = await connection() 
  db.collection('usuarios').find({"correo":correo}).toArray(async(err,result)=>{
    if(err){
      res.send('error')
    }else{
      const resultado = await bcrypt.compare(pass, result[0].pass)
      console.log(resultado)
      if(resultado){
        const token =  jwt.sign({pass},'clave')
        res.send({token})
      }else{
        res.send('noentro')
        console.log(result)
      }
    }
  })
})

module.exports = router
