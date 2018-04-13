import express, { Router } from 'express'

import IndexRoutes from './v1'


const router = Router()

router.use('/v1', IndexRoutes)


export default router
