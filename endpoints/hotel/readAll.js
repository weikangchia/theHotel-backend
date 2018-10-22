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
      description: 'The J&J Hotel is an ideal base to explore Singapore from, as its neighborhood offers many popular dining and entertainment choices.\n\nAll air-conditioned rooms are tastefully decorated with Baroque furnishings, floor-to-ceiling windows, a view of the city or river, and tea and coffee-making facilities.',
    },
    {
      id: 2,
      name: 'Beta Hotel',
      service_fee: 25,
      hourly_rate: 30,
      minute_rate: 0.4,
      image_url: 'https://res.cloudinary.com/geboto/image/upload/v1540112510/thehotel/hotel2.jpg',
      description: 'The Beta hotel’s rooms combine high-style and modern comforts with wall murals, LCD TV, iPod dock, coffeemaker, and free Wi-Fi. Bathrooms have marble floors, tubs and designer bathing products.\n\nAfter a short walk to a nearby MRT station, guests can easily access the island\'s abundant entertainment options: The National Museum, Clarke Quay, Singapore Zoo, The Marine Life Park, to name a few!',
    },
  ]);

  return response;
};
