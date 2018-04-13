import expressValidation from 'express-validation'
import * as HttpStatus from 'http-status-codes'

import APIError from '../Utils/Errors/APIError'
import DefaultAppConfig from '../../../DefaultAppConfig'


const config = DefaultAppConfig()

export const errorTypeChecker = (err, req, res, next) => {
  let convertedError = err

  if (err instanceof expressValidation.ValidationError) {
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ')
    convertedError = new APIError(
      unifiedErrorMessage,
      err.status,
      true
    )
    return next(convertedError)
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError(
      err.message,
      err.status,
      err.isPublic,
    )
    return next(convertedError)
  }

  return next(convertedError)
}

export const notFoundErrorCatchall = (req, res, next) => {
  const err = new APIError(
    HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    HttpStatus.NOT_FOUND,
    true
  )

  return next(err)
}

export const mainErrorHandler = (err, req, res, next) => {
  const createResObj = (err) => {
    const msgGenerator = (err, msg) => {
      return err.isPublic ?
        msg !== null ? msg : err.message
        :
        err.message
    }

    const response = {
      message: err.isPublic ? msgGenerator(err, 'Requested Resource Not Found.') : HttpStatus.getStatusText(err.status),
      status: err.status,
      stack: config.get('env') === `development` ? err.stack : null,
      errors: err.errors !== undefined ? err.errors : null,
      isPublic: err.isPublic
    }

    if (response.stack === null) delete response.stack
    if (response.errors === null) delete response.errors
    return {
      ...response
    }
  }

  const restfulResponseObj = {
    message: createResObj(err).message,
    status: createResObj(err).status
  }

  return res
    .status(err.status)
    .json(restfulResponseObj)
}
