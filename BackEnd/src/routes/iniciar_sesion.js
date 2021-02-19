const {Router} = require('express')
const router = Router()
const connection = require('../db/db')
const jwt = require('jsonwebtoken')

router.get('/sesion/:correo/:pass', async(req,res)=>{
  const {correo,pass} = req.params
  const db = await connection() 
  db.collection('usuarios').find({"correo":correo}).toArray((err,result)=>{
      if(err){
        res.send('error')
      }else{
        if(pass == result[0].pass){
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
