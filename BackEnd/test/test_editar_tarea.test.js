const axios = require('axios')

describe('test rutas',()=>{
  it('verificar rutas',async()=>{
    const {data} = axios.get('http://localhost5000/editar/titulo_editado_test/alta/descripcion_editado/correo_pruebas@gmail.com/123/')
    expect(data).toBe('')  
  })
})
