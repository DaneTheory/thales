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
import boom from 'boom'
import { AssertionError } from 'assert'



mongoose.connect()

// const handleAssertionError = (err,req,res,next) => {
//   if (err instanceof AssertionError) {
//     return res.status(400).json({
//       type: 'AssertionError',
//       message: err.message
//     });
//   }
//   next(err)
// }

const errorTypeCheckAndFormat = (err,req,res,next) => {
  const originalErrorData = {
    name: err.name || null,
    message: err.message || null,
    statusCode: err.statusCode || null,
    errors: err.errors || null,
    isPublic: err.isPublic || null,
    isOperational: err.isOperational || null,
    stack: err.stack || null,
    ...err
  }
  let convertedError

  if(boom.isBoom(err)) {
    const filterRule = [null]
    const filteredObject =
      Object.keys(originalErrorData)
        .reduce((r, e) => {
          if (!filterRule.includes(originalErrorData[e])) r[e] = originalErrorData[e]
          return r;
        }, {})
        // console.log(util.inspect(err, false, null))
    convertedError = boom.boomify(err, {...filteredObject})
  } else {
    convertedError = err.payload
  }

  // console.log(util.inspect(convertedError, false, null))
  next(convertedError)
}


const mainErrorHandler = (err,req,res,next) => {
  if(envConfig.env === 'production') {
    delete err.stack
  }

  if (err instanceof AssertionError) {
    const errObj = {
      type: 'AssertionError',
      name: err.name,
      message: err.message,
      statusCode: 400,
      ...err
    }

    const assertionErr = new Error(errObj)
    console.log(util.inspect(assertionErr, false, null))
    res.json(assertionErr)
    // next(errOK)
  }

  res.status(err.statusCode || 500).json(err)
}

app.use('/v1', catchErrors(router))
app.use(errorTypeCheckAndFormat)
app.use((req,res,next) => res.boom.notFound(`Route does not exist`))
app.use(mainErrorHandler)

// app.use(errorConverter)
// app.use(basicNotFoundCatcher)
// app.use(basicErrorHandler)


const apiServer = http.createServer(app)

apiServer.listen(envConfig.port, () => {
  // console.log(util.inspect(router, false, null))
  console.info(onAppLaunchMessage())

  // TODO: GET BOTH METHODS WORKING!!!!
  displayRoutes(router)
  displayRoutes(router, 'route-table.log')
})

export default app
