const responseUtil = require('../../libs/utils/responseUtil');

const READ_ALL_HANDLER_ACTION = 'action="readAllHandler"';

module.exports.handler = async (event) => {
  console.log(`${READ_ALL_HANDLER_ACTION} event=${JSON.stringify(event)}`);

  const response = responseUtil.createResponse([
    {
      id: 1,
      name: 'J&J Hotel',
      service_fee: 30,
      hourly_rate: 40,
      minute_rate: 0.5,
      image_url: 'https://res.cloudinary.com/geboto/image/upload/v1540112510/thehotel/hotel1.jpg',
    },
    {
      id: 2,
      name: 'Beta Hotel',
      service_fee: 25,
      hourly_rate: 30,
      minute_rate: 0.4,
      image_url: 'https://res.cloudinary.com/geboto/image/upload/v1540112510/thehotel/hotel2.jpg',
    },
  ]);

  return response;
};
