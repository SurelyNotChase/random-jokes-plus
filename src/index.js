const http = require('http');

const url = require('url');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const query = require('querystring');

const jsonHandler = require('./jsonResponses.js');

const htmlHandler = require('./htmlResponses.js');

const urlStruct = {

  GET: {
    '/': htmlHandler.getIndexResponse,
    '/random-joke': jsonHandler.getJokeResponse,
    '/random-jokes': jsonHandler.getJokeResponse,
    '/default-styles.css': htmlHandler.getStyleResponse,
    '/joke-client.html': htmlHandler.getClientResponse,
    notFound: htmlHandler.get404Response,

  },

  HEAD: {
    '/random-joke': jsonHandler.getJokeResponseMeta,
    '/random-jokes': jsonHandler.getJokeResponseMeta,
  },

};

const onRequest = (request, response) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  const parsedUrl = url.parse(request.url);
  const {
    pathname,
  } = parsedUrl;
  const params = query.parse(parsedUrl.query);

  if (urlStruct[request.method][pathname]) {
    urlStruct[request.method][pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct[request.method].notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
