import mongoose from 'mongoose'
import util from 'util'


const Mongoose = (config) => {
  mongoose.Promise = Promise

  const debug = require('debug')(`${config.get('name')}:index`)

  if (config.get('env') === `development`) mongoose.set('debug', (collectionName, method, query, doc) => debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc))

  mongoose.connection.on('open', () => {
    if (config.get('env') === `development`) {
      console.info(`Successfully connected to database. URI: ${config.get('dbUrl')}`)
    }
  })

  mongoose.connection.on('error', (err) => {
    throw new Error(`Unable to connect to database: ${config.get('dbUrl')}`)
    process.exit(-1)
  })

  mongoose.connect(config.get('dbUrl'), {
    useMongoClient: true,
    keepAlive: 1,
    autoReconnect: true
  })

  return mongoose.connection
}


export default Mongoose
