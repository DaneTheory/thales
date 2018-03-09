import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compress from 'compression'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import path from 'path'
// import config from 'config' TODO: Use config module in favor off app.listen setup in index.js

import routes from './../../routes/v1'
import { logs } from '../config/vars'
import { basicErrorHandler, errorConverter, basicNotFoundCatcher } from '../../middleware/error'


const app = express()

app.disable('x-powered-by') // disable x-powered-by
// app.set('view engine', 'ejs') TODO: Create ejs templates for views?
// app.set('port', config.get('app.port')) TODO: Use config module in favor off app.listen setup in index.js
app.use(morgan(logs))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(methodOverride())
app.use(helmet())
app.use(cors())

app.use('/v1', routes)

app.use(errorConverter)
app.use(basicNotFoundCatcher)
app.use(basicErrorHandler)


export default app
