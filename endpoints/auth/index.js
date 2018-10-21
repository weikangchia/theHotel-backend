const fs = require('fs');
const is = require('is_js');

const auth0 = require('../../libs/services/auth0');
const policyGenerator = require('../../libs/utils/policyGenerator');

const HANDLER_ACTION = 'action="authHandler"';

function validateToken(event) {
  if (is.propertyDefined(event, 'authorizationToken')) {
    return event.authorizationToken;
  }

  return '';
}

module.exports.handler = (event, context, callback) => {
  console.log(`${HANDLER_ACTION} event=${JSON.stringify(event)}`);

  const token = validateToken(event);
  if (is.empty(token)) {
    return callback('Error: Invalid token');
  }

  try {
    const publicKey = fs.readFileSync(`${__dirname}/thehotel.pem`);
    const decodedToken = auth0.verify(token, publicKey);

    console.log(`${HANDLER_ACTION} decoded="${JSON.stringify(decodedToken)}"`);

    const policy = policyGenerator.generate(decodedToken, 'Allow', event.methodArn);
    return callback(null, policy);
  } catch (err) {
    console.log(`${HANDLER_ACTION} error="${JSON.stringify(err)}"`);

    if (err.name === 'TokenExpiredError') {
      console.log(`${HANDLER_ACTION} message="jwt token expired"`);
    } else {
      console.log(`${HANDLER_ACTION} message="unable to verify jwt token"`);
    }

    return callback('Unauthorized');
  }
};
