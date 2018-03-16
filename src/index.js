import displayRoutes from 'express-routemap'
require('express-mongoose')

import DefaultAppConfig from '../DefaultAppConfig'
import app from './server/express/express'
import router from './routes/v1'
import authRouter from './routes/auth'
import { onAppLaunchMessage } from './utils/eventOutputMessages'
import Mongoose from './server/mongoose/mongoose'
import './utils/console/consoleHelpers'


const config = DefaultAppConfig()
const debug = require('debug')(`${config.get('name')}:index`)
const mongooseInst = () => Mongoose(config)

Promise = require('bluebird')

mongooseInst()

if (!module.parent) {
  app.listen(config.get(`port`), () => {
    if(config.get(`env`) === `development`) {
      console.info(onAppLaunchMessage())
      console.log(`UNPROTECTED ROUTES`)
      displayRoutes(router)
      console.log(`PROTECTED ROUTES`)
      displayRoutes(authRouter)
      displayRoutes(router, './logs/route-table.log')
      displayRoutes(authRouter, './logs/auth-route-table.log')
    } else {
      console.info(onAppLaunchMessage())
    }
  })
}


export default app
