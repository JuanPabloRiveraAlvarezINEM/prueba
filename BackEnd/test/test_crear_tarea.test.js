const axios = require('axios')

describe('test servicios',()=>{
  it('verificar la ruta crear tarea',async()=>{
    const {data} = await axios.post('http://localhost:5000/crear_tarea',{
      titulo:"tarea1",
      descripcion:"Tarea de prueba",
      prioridad:"Prioridad prueba",
      fecha:"2021-02-21",
      correo:"jest@gmail.com",
      token:"",
      pass:"123"
    })
    expect(data).toBe('no hay token')
  })
})
