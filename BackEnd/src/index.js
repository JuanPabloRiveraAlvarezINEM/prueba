const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded())

//rutas
app.use(require('./routes/iniciar_sesion'))

app.set('port',5000)
app.listen(app.get('port'), ()=>{
  console.log('corriendo en puerto '+ app.get('port'))
})
