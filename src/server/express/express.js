import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import catchErrors from 'async-error-catcher' // TODO: Does this work?
import subdomain from 'express-subdomain'
import expressWinston from 'express-winston'
import expressValidation from 'express-validation'
import winston from 'winston'
import morgan from 'morgan'
// import socketio from 'socket.io'

import DefaultAppConfig from '../../../DefaultAppConfig'
import WinstonInstance from '../winston/winston'
import router from '../../routes/v1'
import authRouter from '../../routes/auth'
import { errorTypeChecker, notFoundErrorCatchall, mainErrorHandler } from '../../middleware/errorHandlers'


// import catchErrors from 'async-error-catcher'
// import responseMetrics from 'express-response-metrics'
// import defaultExpressMonitorSettings from '../config/expressServiceMonitorConfigs'
// import useragent from 'express-useragent'
// import transform from 'express-transform'
// import bandwidth from 'express-bandwidth'
// import resourceMonitorMiddleware from 'express-watcher'
// import likit from 'likit'
// import serverStatus from 'express-server-status'
// import expressMonitor from 'express-status-monitor'
// import health from 'express-ping'


const config = DefaultAppConfig()
const app = express()
// const socketIO = socketio(config.get(`socketIOPort`))

app.disable('x-powered-by')
app.disable('etag')   // TODO: Replace with better cache clean alternative

if (config.get('env') === `development`) app.use(morgan('dev'))
// app.use(morgan(`combined`, { stream: WinstonInstance.stream }))      // TODO: Figure out how to get advanced logging working.

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(methodOverride())
app.use(helmet())
app.use(cors())
// app.set('view engine', 'ejs')    // TODO: Create ejs templates for views?
app.use(require('express-favicon-short-circuit'))

if (config.get('env') === `development`) {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')
  app.use(expressWinston.logger({
      winstonInstance: WinstonInstance,
      statusLevels: false,
      level: (req, res) => {
        let level = ``
        if (res.statusCode >= 100) level = `info`
        if (res.statusCode >= 400) level = `warn`
        if (res.statusCode >= 500) level = `error`
        if (res.statusCode == 401 || res.statusCode == 403) level = `critical`
        return level
      },
      msg: `HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms`,
      meta: true
  }))
}

app.use('/api/v1', catchErrors(router))       // TODO: rename router to something less generic
app.use('/api/auth', catchErrors(authRouter)) // TODO: Protect authRouter routes with crediantials using some kind of auth strategy

app.use(subdomain(config.get('name'), router))
app.use(subdomain(config.get('name'), authRouter))

if (config.get('env') !== 'test') app.use(expressWinston.errorLogger(
  {
    winstonInstance: WinstonInstance,
    msg: `ERROR {{err.message}}`,
    meta: true
  }
))

app.use(errorTypeChecker)
app.use(notFoundErrorCatchall)
app.use(mainErrorHandler)


export default app






// app.use(expressMonitor(defaultExpressMonitorSettings))
// app.use(useragent.express())
// app.use(transform())
// app.use(bandwidth(bw => console.log(`Incoming Bandwidth: ${bw.incoming} || Outgoing Bandwidth: ${bw.outgoing}`) ))

// TODO: Make the response-metrics route an authenticated route, or at least the option
// to enable it as such by default...
// app.use(responseMetrics({ port: envConfig.responseMetrics.port, url: envConfig.responseMetrics.route })) // TODO: Make this own route
// TODO: Prettiffy Responses from Curl requests to console!!!
// app.use(resourceMonitorMiddleware.resourceMonitorMiddleware)
      // TODO: Add this to own middleware!
      // example with callback function
      // app.use(function(req, res, next){
      //   resourceMonitorMiddlewareCB(req, res, next, function(diffJson){
      //     console.log(' diffJson : ', diffJson)
      //   })
      // })
// app.use(likit.express({
//   app,
//   port: envConfig.realtimeRouteMonitor.port,
//   username: envConfig.realtimeRouteMonitor.user,
//   password: envConfig.realtimeRouteMonitor.password
// }))
// app.use('/stats', serverStatus(app))
// app.use(health.ping(`${envConfig.servicePing.route}`))


// export default app
