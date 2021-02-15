const {Router} = require('express')
const connection = require('../db/db')
const router = Router()

router.get('/tareas/:correo',async(req,res)=>{
  const Correo = req.params
  const db = await connection() 
  db.collection('tareas').find({"correo":Correo.correo}).toArray((err,result)=>{
    res.send(result)
  })
})

module.exports = router
