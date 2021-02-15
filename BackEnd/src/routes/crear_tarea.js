const {Router} = require('express')
const router = Router()
const connection = require('../db/db')

router.get('/crear_tarea/:titulo/:descripcion/:prioridad/:correo', async(req,res)=>{
  const {titulo,descripcion,prioridad,correo} = req.params 
  const db = await connection()
  db.collection('tareas').insert(
    {
      "titulo":titulo,
      "descripcion":descripcion,
      "prioridad":prioridad,
      "correo":correo
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

module.exports = router
