const axios = require('axios')

describe('test servicios',()=>{
  it('verificar la ruta crear_usuario',async()=>{
    const {data} = await axios.get('http://localhost:5000/crear_usuario/prueba/prueba_@gmail.com/pass_prueba')
    expect(data).toBe('insertado')
  })
})
