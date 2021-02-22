const axios = require('axios')

describe('test rutas',()=>{
  it('verificar rutas',async()=>{
    const {data} = axios.get('http://localhost5000/tareas/correo/pass/123')
    expect(data.statusCode).toEqual(304)  
  })
})
