/**
 * Helper functions to create API response.
 */

/**
 * Create an API response body.
 *
 * @param {number} statusCode
 * @param {object} body
 */
function createResponse(body, statusCode) {
  return {
    statusCode: statusCode || 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // required for CORS support to work
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Auth',
    },
    body: JSON.stringify(body || {}),
  };
}

module.exports = {
  createResponse,
  error: {
    invalidField: {
      statusCode: 400,
      errorMessage: {
        message: 'Missing field/invalid field.',
      },
    },
    generalError: {
      statusCode: 500,
      errorMessage: {
        message: 'Something bad has happened.',
      },
    },
    notFound: {
      statusCode: 404,
      errorMessage: {
        message: 'The resource you requested could not be found.',
      },
    },
    forbidden: {
      statusCode: 403,
      errorMessage: {
        message: 'Forbidden.',
      },
    },
    notAcceptable: {
      statusCode: 406,
      errorMessage: {
        message: 'Not Acceptable.',
      },
    },
    conflict: {
      statusCode: 409,
      errorMessage: {
        message: 'There is currently a conflict with the current state of the server.',
      },
    },
    notImplemented: {
      statusCode: 501,
      errorMessage: {
        message: 'Method not implemented.',
      },
    },
  },
};
