const {Router} = require('express')
const router = Router()
const connection = require('../db/db')
const jwt = require('jsonwebtoken')

router.get('/sesion/:correo/:pass', async(req,res)=>{
  const {correo,pass} = req.params
  const db = await connection() 
  let Token = ''
  db.collection('usuarios').find({"correo":correo}).toArray((err,result)=>{
      if(err){
        res.send('error')
      }else{
        if(pass == result[0].pass){
        jwt.sign({user:{
          correo:result[0].correo,
          pass:result[0].pass
        }}, 'clave',(err,token)=>{
          res.json({token})
        })
        }else{
          res.send('noentro')
          console.log(result)
        }
      }
  })
})

module.exports = router
