import express, { Router } from 'express'
import util from 'util'

import envConfig from '../../server/config/vars'
import { mockLaggyResponse } from '../../utils/helperMethods'


const router = Router()

const fetchIndexRouteData = () => `Welcome to ${envConfig.serviceName}`
const fetchDummyRouteData = () => "Successfully Accessed Dummy Route"

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

router.get('/', indexRoute)
router.get('/dummy', dummyRoute)

router.use('/docs', express.static('docs'))


export default router
