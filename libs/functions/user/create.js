const mongoose = require('mongoose');

const CREATE_ACTION = 'action="create"';

/**
 * Create a new user.
 *
 * @param {object} newUser
 * @param {string} newUser.email
 * @param {string} newUser.first_name
 * @param {string} newUser.last_name
 *
 * @public
 */
async function create(newUser) {
  const startDbTime = new Date().getTime();
  console.log(`${CREATE_ACTION} message="executing database query"`);

  const User = mongoose.model('users');
  const user = await User.create(newUser);

  const endDbTime = new Date().getTime();
  console.log(`${CREATE_ACTION} message="query executed" runtime=${endDbTime - startDbTime}`);

  return user;
}

module.exports = {
  create,
};
