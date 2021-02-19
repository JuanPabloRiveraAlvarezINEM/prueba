const {Router} = require('express')
const router = Router()
const connection = require('../db/db')
const jwt = require('jsonwebtoken')

router.get('/crear_tarea/:titulo/:descripcion/:prioridad/:fecha/:correo/:token/:pass', async(req,res)=>{

    const {titulo,descripcion,prioridad,fecha,correo} = req.params 
    const {token} = req.params
    const {pass} = req.params

    if(!token){
       res.send('no hay token')
    }else{
      try{
        const deco = jwt.verify(token,'clave')
        if(deco.pass == pass){

          const db = await connection()
          db.collection('tareas').insert(
          {
            "titulo":titulo,
            "descripcion":descripcion,
            "prioridad":prioridad,
            "fecha":fecha,
            "correo":correo
          },
          (err,result)=>{
            if(err){
              res.send('error')
            }else{
              res.send('insertado')
            }
        })
        }
      }catch{
        res.send('error')
      }
    }
})

module.exports = router
