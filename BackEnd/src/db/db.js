const {MongoClient} = require('mongodb')

const dbNombre = 'bf7k4djc5a6tzqc'
const url = 'mongodb://uhq9qz7bkhggiyxklufn:yvWS7A9eeNOpu7bApGx0@bf7k4djc5a6tzqc-mongodb.services.clever-cloud.com:27017/bf7k4djc5a6tzqc'

const client = new MongoClient(url,
  {
    useUnifiedTopology:true
  })

module.exports = async ()=>{
  await client.connect()
  return client.db(dbNombre)
}
