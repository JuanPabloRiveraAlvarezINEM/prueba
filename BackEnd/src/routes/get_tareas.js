const {Router} = require('express')
const connection = require('../db/db')
const router = Router()
const jwt = require('jsonwebtoken')

router.get('/tareas/:correo/:pass/:token',async(req,res)=>{
  const Correo = req.params
  const {token} = req.params
  const {pass} = req.params
  if(!token){
    res.send('no hay token')
  }else{
    try{
      const deco = jwt.verify(token,'clave')
      if(deco.pass == pass){
        const db = await connection() 
        db.collection('tareas').find({"correo":Correo.correo}).toArray((err,result)=>{
         res.send(result)
        })
      }
    }catch{
      res.send('error')
    }
  }
})

module.exports = router
