Promise = require('bluebird')

import http from 'http'
import util from 'util'
import catchErrors from 'async-error-catcher'
import router from './routes/v1'
import { basicErrorHandler, errorConverter, basicNotFoundCatcher } from './middleware/error'
import displayRoutes from 'express-routemap' // TODO: GET THIS WORKING!

import './utils/consoleHelpers'
import envConfig from './server/config/vars'
import app from './server/express/express'
import mongoose from './server/mongoose/mongoose'
import { onAppLaunchMessage } from './utils/eventOutputMessages'


mongoose.connect()

app.use('/v1', catchErrors(router))

app.use(errorConverter)
app.use(basicNotFoundCatcher)
app.use(basicErrorHandler)

const apiServer = http.createServer(app)

apiServer.listen(envConfig.port, () => {
  // console.log(util.inspect(router, false, null))
  console.info(onAppLaunchMessage())

  // TODO: GET BOTH METHODS WORKING!!!!
  displayRoutes(router)
  displayRoutes(router, 'route-table.log')
})

export default app
