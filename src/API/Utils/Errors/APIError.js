import * as HttpStatus from 'http-status-codes'


class ExtendableError extends Error {
  constructor(
    message,
    status,
    stack,
    errors,
    isPublic,
  ) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
    this.stack = stack
    this.errors = errors
    this.isPublic = isPublic
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor.name)
  }
}

class APIError extends ExtendableError {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false
  ) {
    super(message, status, isPublic)
    this.message = message,
    this.status = status,
    this.isPublic = isPublic
  }
}


export default APIError
