'use strict';

module.exports.hello = (event, context, callback) => {
  let randomNumber = Math.ceil(Math.random() * 9)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      numSeconds: randomNumber
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
