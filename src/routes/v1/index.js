import express, { Router } from 'express'


const router = Router()

router.get('/', (req, res) => res.send('Welcome To Thales!'))
router.get('/status', (req, res) => res.send('STATUS ROUTE'))
router.use('/docs', express.static('docs'))


export default router
