/**
 * Helper functions for errors and error code.
 */

const responseUtil = require('./responseUtil');

const {
  invalidField,
  generalError,
  notFound,
  unauthorized,
  notImplemented,
  forbidden,
} = responseUtil.error;

class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

class InvalidFieldError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

class GeneralError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

/**
 * Create error response.
 *
 * @param {object} error
 *
 * @public
 */
function createErrorResponse(error) {
  if (error instanceof InvalidFieldError) {
    return responseUtil.createResponse(invalidField.errorMessage, invalidField.statusCode);
  } else if (error instanceof NotFoundError) {
    return responseUtil.createResponse(notFound.errorMessage, notFound.statusCode);
  } else if (error instanceof UnauthorizedError) {
    return responseUtil.createResponse(unauthorized.errorMessage, unauthorized.statusCode);
  } else if (error instanceof NotImplementedError) {
    return responseUtil.createResponse(notImplemented.errorMessage, notImplemented.statusCode);
  } else if (error instanceof ForbiddenError) {
    return responseUtil.createResponse(forbidden.errorMessage, forbidden.statusCode);
  }

  return responseUtil.createResponse(generalError.errorMessage, generalError.statusCode);
}

module.exports = {
  createErrorResponse,
  InvalidFieldError,
  GeneralError,
  NotFoundError,
  UnauthorizedError,
  NotImplementedError,
  ForbiddenError,
};
