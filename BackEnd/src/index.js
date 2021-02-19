const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//rutas
app.use(require('./routes/iniciar_sesion'))
app.use(require('./routes/get_tareas'))
app.use(require('./routes/eliminar_tareas'))
app.use(require('./routes/crear_tarea'))
app.use(require('./routes/crear_usuario'))
app.use(require('./routes/sendmail'))
app.use(require('./routes/editar_tarea'))

app.set('port',5000)
app.listen(app.get('port'), ()=>{
  console.log('corriendo en puerto '+ app.get('port'))
})
