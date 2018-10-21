const responseUtil = require('../../libs/utils/responseUtil');

const READ_ALL_HANDLER_ACTION = 'action="readAllHandler"';

module.exports.handler = async (event) => {
  console.log(`${READ_ALL_HANDLER_ACTION} event=${JSON.stringify(event)}`);

  const response = responseUtil.createResponse({
    id: 1,
  });

  return response;
};
