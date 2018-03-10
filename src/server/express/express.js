import express from 'express'
import socketio from 'socket.io'
import util from 'util'
// import catchErrors from 'async-error-catcher'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compress from 'compression'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import path from 'path'
import responseMetrics from 'express-response-metrics'
// import config from 'config' TODO: Use config module in favor off app.listen setup in index.js
// import router from './../../routes/v1'
import envConfig from '../config/vars'
import defaultExpressMonitorSettings from '../config/expressServiceMonitorConfigs'
// import { basicErrorHandler, errorConverter, basicNotFoundCatcher } from '../../middleware/error'
import useragent from 'express-useragent'
import transform from 'express-transform'
import bandwidth from 'express-bandwidth'
import resourceMonitorMiddleware from 'express-watcher'
import likit from 'likit'
import actuator from 'express-actuator'
import serverStatus from 'express-server-status'
import expressMonitor from 'express-status-monitor'
import health from 'express-ping'



const socketIO = socketio(envConfig.socketIO.port)
const app = express()

app.disable('x-powered-by') // disable x-powered-by
app.disable('etag') // No caching
// app.set('view engine', 'ejs') TODO: Create ejs templates for views?
// app.set('port', config.get('app.port')) TODO: Use config module in favor off app.listen setup in index.js
app.use(expressMonitor(defaultExpressMonitorSettings))
app.use(require('express-favicon-short-circuit'))
app.use(morgan())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(useragent.express())
app.use(cookieParser())
app.use(compress())
app.use(methodOverride())
app.use(helmet())
app.use(cors())
app.use(transform())
app.use(bandwidth(bw => console.log(`Incoming Bandwidth: ${bw.incoming} || Outgoing Bandwidth: ${bw.outgoing}`) ))

app.use(actuator())
// TODO: Make the response-metrics route an authenticated route, or at least the option
// to enable it as such by default...
app.use(responseMetrics({ port: envConfig.responseMetrics.port, url: envConfig.responseMetrics.route }))
// TODO: Prettiffy Responses from Curl requests to console!!!
app.use(resourceMonitorMiddleware.resourceMonitorMiddleware)
      // TODO: Add this to own middleware!
      // example with callback function
      // app.use(function(req, res, next){
      //   resourceMonitorMiddlewareCB(req, res, next, function(diffJson){
      //     console.log(' diffJson : ', diffJson)
      //   })
      // })
app.use(likit.express({
  app,
  port: envConfig.realtimeRouteMonitor.port,
  username: envConfig.realtimeRouteMonitor.user,
  password: envConfig.realtimeRouteMonitor.password
}))
app.use('/stats', serverStatus(app))
app.use(health.ping(`${envConfig.servicePing.route}`))


export default app
