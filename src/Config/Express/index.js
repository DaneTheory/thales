import express, { Router } from 'express'
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
// const getRoutes = require('get-routes')
// const hydraExpress = require('hydra-express');
// const hydra = hydraExpress.getHydra();

const hydraExpress = require('hydra-express')
import HydraConfigOptions from '../Hydra/config'
import HydraFactory from '../Hydra'

import DefaultAppConfig from '../../../DefaultAppConfig'
import WinstonInstance from '../Winston'
import v1Router from '../../API/Routes/v1'
import { errorTypeChecker, notFoundErrorCatchall, mainErrorHandler } from '../../API/Middlewares/Err'


const config = DefaultAppConfig()
const app = express()
const service = hydraExpress.getExpress()
// const router = Router()

const envCheck = async (env) => {
  return await config.get('env') === env ? true : false
}

const devServiceLogger = async (srvc) => {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')

  const loggerConfig = async srvc =>
    await srvc.use(
      expressWinston.logger(
        {
          winstonInstance: WinstonInstance,
          statusLevels: false,
          level: (req, res) => {
            let level = ``
            if (res.statusCode >= 100) level = `info`
            if (res.statusCode >= 400) level = `warn`
            if (res.statusCode >= 500) level = `error`
            if (res.statusCode == 401 || res.statusCode == 403) level = `critical`
            if (res.statusCode >= 500) hydraExpress.log('error', message)
            return level
          },
          msg: `HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms`,
          meta: true
        }
      )
    )
  const result = await loggerConfig(srvc)
  return result
}

const serviceErrorLogger = async srvc =>
  await srvc.use(
    expressWinston.errorLogger(
      {
        winstonInstance: WinstonInstance,
        msg: `ERROR {{err.message}}`,
        meta: true
      }
    )
  )





// const AsgardService = async () =>
//   await HydraFactory.init()
//     .then(async (factory) => {
//       await factory.getService(
//         (service) => {
//           // v1Router.get(`/`, catchErrors(serviceEntryPointRoute))
//           // service.use(`/${config.get('name')}`, catchErrors(v1Router))
//           // console.log(v1Router)
//         }
//       )
//
//       let hydra = HydraFactory.getHydra()
//       console.log(hydra)
//
//     })









  function registerRoutesCallback() {
    hydraExpress.registerRoutes({
      // '/v1': require('../../API/Routes')
      '/v1': v1Router
    })
  }

  function registerMiddlewareCallback() {
    let app = hydraExpress.getExpressApp();
    app.use((req, res, next) => {
      console.log('req.headers', req.headers);
      next()
    })
  }

  //
  //
  // hydraExpress.init(HydraConfigOptions, registerRoutesCallback, registerMiddlewareCallback)
  //   .then((serviceInfo) => {
  //
  //     let logEntry = `Started ${hydra.getServiceName()} (v.${hydra.getInstanceVersion()})`;
  //     console.log(logEntry);
  //     console.log(serviceInfo);
  //
  //   })
  //   .catch((err) => {
  //
  //     console.log('err', err);
  //
  //   });


// const AsgardService = async () =>
//   await HydraFactory.init()
//       .then(async factory =>
//         await factory.getService(
//           (service) => {
//             service.disable('x-powered-by')
//             service.disable('etag')   // TODO: Replace with better cache clean alternative
//             envCheck('development') ? service.use(morgan('dev')) : null
//             service.use(bodyParser.json())
//             service.use(bodyParser.urlencoded({ extended: true }))
//             service.use(cookieParser())
//             service.use(compress())
//             service.use(methodOverride())
//             service.use(helmet())
//             service.use(cors())
//             service.use(require('express-favicon-short-circuit'))
//             envCheck('development') ? devServiceLogger(service) : null
//             service.use(`/${config.get('name')}`, catchErrors(v1Router))
//             service.use(subdomain(`${config.get('name')}`, catchErrors(v1Router)))
//             // envCheck('test') ? null : serviceErrorLogger(service)
//             // service.use(errorTypeChecker)
//             // service.use(notFoundErrorCatchall)
//             // service.use(mainErrorHandler)
//         }
//       )
//     )
//     .then(async service => {
//       // let hydra = await service.getHydra()
//       envCheck('test') ? null : serviceErrorLogger(service)
//       service.use(errorTypeChecker)
//       service.use(notFoundErrorCatchall)
//       service.use(mainErrorHandler)
//
//     }
//   )
//     .catch(e =>
//       new Error(e)
//     )




// const hydra = require('hydra');
// let cfg = hydra.getConfigHelper();

/**
* Load configuration file and initialize hydraExpress app
*/
// let main = async () => {
//   try
//   {
//     await cfg.init(HydraConfigOptions)
//     let newConfig = await hydra.init(cfg.getObject(), false)
//     cfg = newConfig
//     let serviceInfo = await hydra.registerService()
//     let logEntry = `Started ${hydra.getServiceName()} (v.${hydra.getInstanceVersion()})`
//     console.log(logEntry)
//     console.log(serviceInfo)
//
//     hydra.on('message', (message) => {
//       hydra.sendReplyMessage(message, {
//         bdy: {
//           message: `Message reply to mid (${message.mid}) by ${cfg.hydra.serviceName} instance ${hydra.getInstanceID()}`
//         }
//       })
//     })
//
//   } catch (e) {
//     console.log('err', err)
//     hydra.shutdown()
//     process.exit(-1)
//   }
// }

// main()

            app.disable('x-powered-by')
            app.disable('etag')   // TODO: Replace with better cache clean alternative
            envCheck('development') ? app.use(morgan('dev')) : null
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({ extended: true }))
            app.use(cookieParser())
            app.use(compress())
            app.use(methodOverride())
            app.use(helmet())
            app.use(cors())
            app.use(require('express-favicon-short-circuit'))
            envCheck('development') ? devServiceLogger(app) : null
            app.use(`/${config.get('name')}`, catchErrors(v1Router))
            app.use(subdomain(`${config.get('name')}`, catchErrors(v1Router)))
            envCheck('test') ? null : serviceErrorLogger(data)
            app.use(errorTypeChecker)
            app.use(notFoundErrorCatchall)
            app.use(mainErrorHandler)

const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger
hydraExpress.use(new HydraExpressLogger())
hydraExpress.init(HydraConfigOptions, () => {
  let hydra = hydraExpress.getExpress()
  // const api = express.Router()

    // HydraFactory.init()
    //     .then(async factory =>
    //       await factory.getService(
    //         (service) => {
    //           envCheck('development') ? devServiceLogger(service) : null
    //           service.use(`/${config.get('name')}`, catchErrors(v1Router))
    //           service.use(subdomain(`${config.get('name')}`, catchErrors(v1Router)))
    //           envCheck('test') ? null : serviceErrorLogger(service)
    //           service.use(errorTypeChecker)
    //           service.use(notFoundErrorCatchall)
    //           service.use(mainErrorHandler)
    //       }
    //     )
    //   )
  // hydra.serviceVersion = config.get('version')
  envCheck('development') ? devServiceLogger(v1Router) : null
  v1Router.use(`/${config.get('name')}`, catchErrors(v1Router))
  v1Router.use(subdomain(`${config.get('name')}`, catchErrors(v1Router)))
  envCheck('test') ? null : serviceErrorLogger(v1Router)
  v1Router.use(errorTypeChecker)
  v1Router.use(notFoundErrorCatchall)
  v1Router.use(mainErrorHandler)
  hydraExpress.registerRoutes({ '': v1Router })
})





export default hydraExpress
