const database = require('../../libs/database');
const user = require('../../libs/functions/user');
const errorUtil = require('../../libs/utils/errorUtil');
const responseUtil = require('../../libs/utils/responseUtil');

let cachedDb = null;
let startDbTime = new Date().getTime();

const CREATE_USER_HANDLER_ACTION = 'action="createUserHandler"';

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(`${CREATE_USER_HANDLER_ACTION} event=${JSON.stringify(event)}`);

  cachedDb = await database.getConnection(cachedDb, startDbTime);
  startDbTime = database.getDbTime(startDbTime);

  let response;
  try {
    const data = JSON.parse(event.body);

    const vUser = await user.create(data);

    response = responseUtil.createResponse(vUser);
  } catch (error) {
    console.log(`${CREATE_USER_HANDLER_ACTION} error="${error}"`);
    response = errorUtil.createErrorResponse(error);
  }

  return response;
};
