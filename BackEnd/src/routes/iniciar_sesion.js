const {Router} = require('express')
const router = Router()
const connection = require('../db/db')

router.get('/sesion', async(req,res)=>{
  const db = await connection() 
  db.collection('usuarios').find().toArray((err,result)=>{
    res.send(result)
  })
})

module.exports = router
