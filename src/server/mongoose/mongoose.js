import mongoose from 'mongoose'
import envConfig from '../config/vars'


mongoose.Promise = Promise

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB CONNECTION ERROR: ${err}`)
  process.exit(-1)
})

if (envConfig.env === 'development') {
  mongoose.set('debug', true)
}

exports.connect = () => {
  mongoose.connect(envConfig.mongo.uri, {
    keepAlive: 1,
    useMongoClient: true,
  })
  return mongoose.connection
}
