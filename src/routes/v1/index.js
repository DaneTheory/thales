import express, { Router } from 'express'
import util from 'util'

import envConfig from '../../server/config/vars'
import { mockLaggyResponse } from '../../utils/helperMethods'


const router = Router()

const fetchIndexRouteData = () => `Welcome to ${envConfig.serviceName}`
const fetchDummyRouteData = () => "Successfully Accessed Dummy Route"
const fetchWildCardRouteData = () => new Error()


const indexRoute = async (req, res, next) => {
  const result = await fetchIndexRouteData()
  // await mockLaggyResponse(5000)
  // console.log(util.inspect(req.useragent, false, null))
  res.json({
    message: result,
    status: res.statusCode
  })
}

const dummyRoute = async (req, res, next) => {
  const result = await fetchDummyRouteData()
  res.json({
    message: result,
    status: res.statusCode
  })
}

const wildCardRoute = async (req, res, next) => {
  const result = await fetchWildCardRouteData()
  result.message = 'HEY! IM A MESSAGE'
  result.statusCode = 402

  // const p = () => Promise.resolve().then(data => {
  //   return result
  // }).catch(err => err)
  // res.json({
  //   message: result,
  //   status: res.statusCode
  // })
  // const err = new Error(result)
  // console.log(result)
  next(result)
}

// router.get('*', wildCardRoute)
router.get('/', indexRoute)
router.get('/dummy', dummyRoute)

router.use('/docs', express.static('docs'))


export default router
