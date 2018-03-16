import express, { Router } from 'express'

import publicRoutes from './v1'
import authRoutes from './auth'


const router = Router()

router.use('/', publicRoutes)
router.use('/', authRoutes)


export default router
