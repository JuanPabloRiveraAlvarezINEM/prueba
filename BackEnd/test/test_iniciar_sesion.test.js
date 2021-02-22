const axios = require('axios')

describe('test servicios',()=>{
  it('verificar la ruta crear tarea',async()=>{
    const {data} = await axios.get('http://localhost:5000/sesion/correo@gmail.com/pass')
    expect(data).toBe('noentro')
  })
})
