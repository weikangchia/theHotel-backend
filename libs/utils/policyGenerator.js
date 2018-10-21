/**
 * Generate a valid aws policy.
 *
 * @param {object} token
 * @param {string} effect
 * @param {object} resource
 *
 * @public
 */
function generate(token, effect, resource) {
  const authResponse = {
    principalId: token.email,
  };

  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17', // default version
      Statement: [],
    };

    const statementOne = {
      Action: 'execute-api:Invoke', // default action
      Effect: effect,
      Resource: resource,
    };

    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
}

module.exports = {
  generate,
};
