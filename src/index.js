Promise = require('bluebird')

import http from 'http'

import './utils/consoleHelpers'
import envConfig from './server/config/vars'
import app from './server/express/express'
import mongoose from './server/mongoose/mongoose'
import { onAppLaunchMessage } from './utils/eventOutputMessages'


mongoose.connect()

const server = http.createServer(app)
server.listen(envConfig.port, () => console.info(onAppLaunchMessage()))


export default app
