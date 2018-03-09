import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compress from 'compression'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import routes from './../../routes/v1'
import { logs } from '../config/vars'
import error from '../../middleware/error'


const app = express()

app.use(morgan(logs))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(methodOverride())
app.use(helmet())
app.use(cors())

app.use('/v1', routes)

app.use(error.converter)
app.use(error.notFound)
app.use(error.handler)


export default app
