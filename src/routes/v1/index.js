import express from 'express'


const router = express.Router()

router.get('/status', (req, res) => res.send('OK'))
router.use('/docs', express.static('docs'))


export default router
