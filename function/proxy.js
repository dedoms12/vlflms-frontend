// functions/proxy.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const url = 'https://a57d-216-247-39-181.ngrok-free.app' + event.path;
  const response = await fetch(url, {
    method: event.httpMethod,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://jazzy-figolla-2639b3.netlify.app',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      // Add any other headers you need
    },
    body: event.body,
  });

  return {
    statusCode: response.status,
    body: await response.text(),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://jazzy-figolla-2639b3.netlify.app',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      // Add any other headers you need
    },
  };
};
