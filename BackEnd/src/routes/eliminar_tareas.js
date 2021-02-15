const {Router} = require('express')
const {ObjectId} = require('mongodb')
const connection = require('../db/db')
const router = Router()

router.get('/eliminar/:id', async(req,res)=>{
  const {id} = req.params
  const db = await connection()
  db.collection('tareas').remove({_id:ObjectId(id)}, (err,result)=>{
    if(err){
      res.send('error')
    }else{
      res.send('eliminado')
    }
  })
})

module.exports = router
