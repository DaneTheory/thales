Promise = require('bluebird')

import http from 'http'

import './utils/consoleHelpers'
import envConfig from './server/config/vars'
import server from './server/express/express'
import mongoose from './server/mongoose/mongoose'
import { onAppLaunchMessage } from './utils/eventOutputMessages'


mongoose.connect()

const apiServer = http.createServer(server)

apiServer.listen(envConfig.port, () => {
  console.info(onAppLaunchMessage())
})

export default server
