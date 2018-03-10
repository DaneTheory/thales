import express, { Router } from 'express'

import { version } from '../../../package.json'


const router = Router()

router.get('/', (req, res) => {
  res.json({
    message: "Welcome to Thales",
    status: res.statusCode
  })
  res.end()
})

router.get('/status', (req, res) => {
  res.json({
    message: "successfully accessed status route",
    status: res.statusCode
  })
  res.end()
})

router.use('/docs', express.static('docs'))


export default router
