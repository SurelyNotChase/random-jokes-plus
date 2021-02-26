const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/index.html`);

const notFound = fs.readFileSync(`${__dirname}/../client/error.html`);

const styleSheet = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const client = fs.readFileSync(`${__dirname}/../client/joke-client.html`);

const get404Response = (request, response) => {
  response.writeHead(404, {
    'Content-Type': 'text/html',
  });
  response.write(notFound);
  response.end();
};
const getIndexResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(index);
  response.end();
};
const getStyleResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(styleSheet);
  response.end();
};

const getClientResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(client);
  response.end();
};

module.exports = {

  get404Response,
  getIndexResponse,
  getStyleResponse,
  getClientResponse,

};
