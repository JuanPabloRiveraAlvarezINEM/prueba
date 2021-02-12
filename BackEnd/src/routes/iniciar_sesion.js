const {Router} = require('express')
const router = Router()
const connection = require('../db/db')

router.post('/sesion', async(req,res)=>{
  const {correo__,pass__} = req.body
  const db = await connection() 
  db.collection('usuarios').find().toArray((err,result)=>{
    if(err){
      res.send('error')
    }else{
      for(let i = 0; i< result.length; i++){
        if(result[i].correo == correo__ && result[i].pass == pass__){
          res.send('entro')
        }
      }
      res.send('datos incorrectos')
    }
  })
})

module.exports = router
