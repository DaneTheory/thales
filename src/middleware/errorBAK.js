import httpStatus from 'http-status'
import expressValidation from 'express-validation'
import APIError from '../utils/APIError'
import envConfig from '../server/config/vars'


// Basic Error Handler. TODO: Replace with more robust option
export const basicErrorHandler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  }
  if (envConfig.env !== 'development') {
    delete response.stack
  }
  res.status(err.status).json(response)
}

// Convert Errors to APIError type. Custom Helper Util.
export const errorConverter = (err, req, res, next) => {
  let convertedError = err
  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'VALIDATION ERROR',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    })
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    })
  }
  return basicErrorHandler(convertedError, req, res)
}

// Basic Catchall for 404's, forwarding them to APIError.
export const basicNotFoundCatcher = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  })
  return basicErrorHandler(err, req, res)
}
