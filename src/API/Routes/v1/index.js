import express, { Router } from 'express'

import DefaultAppConfig from '../../../../DefaultAppConfig'
import IndexController from '../../Controllers'

const config = DefaultAppConfig()
const router = Router()


router.route('/')
  .get(IndexController.mount)

router.route('/v1')
  .get(IndexController.index)

router.use('/docs', express.static('docs'))


export default router
