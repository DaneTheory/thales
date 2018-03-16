import Promise from 'bluebird'
import mongoose from 'mongoose'
import * as HttpStatus from 'http-status-codes'
import validate from 'mongoose-validator'
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto'
import jwtoken from 'jsonwebtoken'
import { omitBy, isNil } from 'lodash'
import bcrypt from 'bcryptjs'
import moment from 'moment-timezone'
import jwt from 'jwt-simple'
import uuidv4 from 'uuid/v4'

import DefaultAppConfig from '../../../DefaultAppConfig'
import APIError from '../../utils/errors/APIError'


const config = DefaultAppConfig()
const errorsArr = [{
  field: 'email',
  location: 'body',
  messages: ['"email" already exists']
}]

// Schema Key Validators
const usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 12],
    message: 'Username must be between {ARGS[0]} and {ARGS[1]} characters long.',
    httpStatus: 403
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Username must consist of alpha-numeric characters only.',
  })
]
const emailValidator = [
  validate({
    validator: 'isEmail',
    // arguments: [4, 12],
    message: 'Email must be in a valid format.',
    httpStatus: 403
  })
]

// User Roles
const roles = ['user', 'admin']

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [ true, `can't be blank.` ],
    validate: usernameValidator,
    trim: true,
    index: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  email: {
    type: String,
    lowercase: true,
    required: [ true, `can't be blank.` ],
    validate: emailValidator,
    index: true
  },
  password: {
    type: String,
    // required: true,
    minlength: 6,
    maxlength: 20,
  },
  services: {
    facebook: String
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  }
}, { timestamps: true })

// Schema Plugins
UserSchema.plugin(uniqueValidator, {
  message: 'is already taken.'
})

// Schema Methods
UserSchema.method({

  transform() {
    const transformed = {}
    const fields = ['id', 'username', 'email','role']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  },

  token() {
    const playload = {
      exp: moment().add(config.get('jwtExpiration'), 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(playload, config.get('jwtSecret'))
  },

  setPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  },

  validPassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
  },

  generateJWT() {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 15)
    return jwtoken.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, config.get('jwtSecret'))
  },

  toAuthJSON() {
    return {
      username: this.username,
      email: this.email,
      token: this.generateJWT()
    }
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password)
  }

})

// UserSchema Pre Save Hooks
UserSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next()
    const rounds = config.get('env') === 'test' ? 1 : 10
    const hash = await bcrypt.hash(this.password, rounds)
    this.password = hash
    return next()
  }
  catch (error) {
    return next(error)
  }
})

// Schema Statistics
UserSchema.statics = {
  roles,
  // Get User By Provided ID
  async get(id) {
    try {
      let user
      if (mongoose.Types.ObjectId.isValid(id)) user = await this.findById(id).exec()
      if (user) return user
      throw new APIError(
        'User does not exist.',
        HttpStatus.NOT_FOUND
      )
    }
    catch (error) {
      throw error
    }
  },
  // get(id) {
  //   return this.findById(id)
  //     .exec()
  //     .then((user) => {
  //       if (user) return user
  //       const err = new APIError('No such user exists.', httpStatus.NOT_FOUND)
  //       return Promise.reject(err)
  //     })
  //     .catch(err => err)
  // },

  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options
    if (!email) throw new APIError(`An email is required to generate a token`)
    const user = await this.findOne({ email }).exec()
    const err = {
      status: HttpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (password) {
      if (user && await user.passwordMatches(password)) return { user, accessToken: user.token() }
      err.message = 'Incorrect email or password'
    }
    else if (refreshObject && refreshObject.userEmail === email) {
      return { user, accessToken: user.token() }
    }
    else {
      err.message = 'Incorrect email or refreshToken'
    }
    throw new APIError(err)
  },

  // Generate List Of Users
  list({ page = 1, perPage = 10, name, email, role }) {
    const options = omitBy({ name, email, role }, isNil)
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec()
  },
  // list({ limit = 10, skip = 0 } = {}) {
  //   return this.find()
  //     .sort({ createdAt: -1 })
  //     .skip(+skip)
  //     .limit(+limit)
  //     .exec()
  // }

  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError(
        'Validation Error',
        HttpStatus.CONFLICT,
        error.stack,
        errorsArr,
        true
      )
    }
    return error
  },

  async oAuthLogin({ service, id, email, name, picture }) {
    const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] })
    if (user) {
      user.services[service] = id
      if (!user.name) user.name = name
      return user.save()
    }
    const password = uuidv4()
    return this.create({
      services: {
        [service]: id
      },
      username,
      email,
      password
    })
  },

}


export default mongoose.model('User', UserSchema)
