import express, { Router } from 'express'
import validate from 'express-validation'
import util from 'util'

import DefaultAppConfig from '../../../DefaultAppConfig'
import UserController from '../../controllers/user.controller'
// import { mockLaggyResponse } from '../../utils/helperMethods'


const config = DefaultAppConfig()
const router = Router()

const indexRoute = async (req, res, next) => {
  const fetchIndexRouteData = () => `Welcome to ${config.get(`name`).toUpperCase()}`
  const result = await fetchIndexRouteData()
  // await mockLaggyResponse(5000)
  res.json({
    message: result,
    status: res.statusCode
  })
}

const dummyRoute = async (req, res, next) => {
  const fetchDummyRouteData = () => `Successfully Accessed Dummy Route`
  const result = await fetchDummyRouteData()
  res.json({
    message: result,
    status: res.statusCode
  })
}

const errorRoute = async (req, res, next) => {
  return next(new Error("This is an error and it should be logged to the console"))
}


// router.get('/', indexRoute)
router.get('/dummy', dummyRoute)
router.get('/error', errorRoute)

router.route('/')
  .get(UserController.listOfUsers)
  .post(UserController.createNewUser)
  // .post(validate(paramValidation.createUser), userCtrl.create)

router.route('/:userId')
  .get(UserController.getUserInfo)
  .put(UserController.updateExistingUser)
  // .put(validate(paramValidation.updateUser), UserController.updateExistingUser)
  .delete(UserController.removeUser)

router.param('userId', UserController.loadUserInfo)

router.use('/docs', express.static('docs'))


export default router
