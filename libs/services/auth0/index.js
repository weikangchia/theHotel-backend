const jwt = require('jsonwebtoken');

const VERIFY_ACTION = 'action="verifyToken"';

/**
 * Verify the token and return the decoded value.
 * If the token can't be verified, an empty object is passed back.
 *
 * @param {string} token
 */
function verify(token, publicKey) {
  console.log(`${VERIFY_ACTION} token="${token}"`);

  return jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
  });
}

module.exports = {
  verify,
};
