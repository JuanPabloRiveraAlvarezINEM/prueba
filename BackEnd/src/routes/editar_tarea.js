const {Router} = require('express')
const router = Router()
const connection = require('../db/db')
const {ObjectId} = require('mongodb')

router.get('/editar/:id/:titulo/:prioridad/:descripcion/:fecha/:correo', async(req,res)=>{
  const {id,titulo,prioridad,descripcion,fecha,correo} = req.params
  const db = await connection()
  if(titulo && prioridad && descripcion && fecha && correo){
    db.collection('tareas').update({_id:ObjectId(id)}, 
      {
        "titulo":titulo,
        "prioridad":prioridad,
        "descripcion":descripcion,
        "fecha":fecha,
        "correo":correo
      }
      ,(err,result)=>{
        if(err){
          res.send('error')
        }else{
          res.send('actualizado')
        }
    })  
  }
})

module.exports = router
