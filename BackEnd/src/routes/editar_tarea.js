const { Router } = require('express')
const router = Router()
const connection = require('../db/db')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')

router.get('/editar/:id/:titulo/:prioridad/:descripcion/:fecha/:correo/:pass/:token', async (req, res) => {
  const { id, titulo, prioridad, descripcion, fecha, correo, pass, token } = req.params
  if (token) {
    try {
      const deco = jwt.verify(token, 'clave')
      if (deco.pass == pass) {
        const db = await connection()
        if (titulo && prioridad && descripcion && fecha && correo) {
          db.collection('tareas').update({ _id: ObjectId(id) },
            {
              "titulo": titulo,
              "prioridad": prioridad,
              "descripcion": descripcion,
              "fecha": fecha,
              "correo": correo
            }
            , (err, result) => {
              if (err) {
                res.send('error')
              } else {
                res.send('actualizado')
              }
            })
        }
      }
    } catch {
      res.send('error')
    }
  }
})

module.exports = router
