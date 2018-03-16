import express, { Router } from 'express'
import util from 'util'

import DefaultAppConfig from '../../../DefaultAppConfig'


const config = DefaultAppConfig()
const authRouter = Router()

const fetchServiceStatusFlag = (flag) => {
  const checkServerEnvMode = () => config.get('env') !== `maintenance` ? true : false
  if(checkServerEnvMode() === true) {
    flag = null
  } else {
    flag = true
  }
  return flag
}


const authIndexRoute = async (req, res, next) => {
  // const result = await fetchIndexRouteData()
  // await mockLaggyResponse(5000)
  // console.log(util.inspect(req.useragent, false, null))
  res.json({
    message: `Protected Routes Index`,
    status: res.statusCode
  })
}

const statusRoute = async (req, res, next) => {
  const flag = null
  const statusFlag = await fetchServiceStatusFlag(flag)

  let hasAccessToWorldWideWeb

  if(statusFlag === null) {
    const statusErrorObj = new Error({
      serviceName: config.get('name'),
      status: `ERROR`,
      message: `Service Status Check Failed. Status Flag Returned as ${statusFlag}`,
      code: 500,
      onlineAccess: hasAccessToWorldWideWeb
    })
    next(statusErrorObj)
  } else if(statusFlag) {
    hasAccessToWorldWideWeb = true
    res.json({
      serviceName: config.get('name'),
      status: statusFlag,
      message: `Service is up and running.`,
      code: res.statusCode,
      onlineAccess: hasAccessToWorldWideWeb
    })
  } else {
    hasAccessToWorldWideWeb = true
    res.json({
      serviceName: config.get('name'),
      status: statusFlag,
      message: `Service is down. Current Service ENV: ${config.get('env')}`,
      code: res.statusCode,
      onlineAccess: hasAccessToWorldWideWeb
    })
  }

}

const statsRoute = async (req, res, next) => {
  res.json({
    message: `Stats Route`,
    status: res.statusCode
  })
}

const logRoute = async (req, res, next) => {
  res.json({
    message: `Log Route`,
    status: res.statusCode
  })
}

authRouter.get('/', authIndexRoute)

authRouter.get('/status', statusRoute)
authRouter.get('/stats', statsRoute)
authRouter.get('/log', logRoute)


export default authRouter
