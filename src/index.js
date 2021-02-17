const jsonHandler = require('./jsonResponses.js');

const htmlHandler = require('./htmlResponses.js');

const http = require('http');

const url = require('url');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const query = require('querystring');


const urlStruct = {
    
    '/' : htmlHandler.getIndexResponse,
    '/random-joke' : jsonHandler.getJokeResponse,
    '/random-jokes' : jsonHandler.getJokesResponse,
    notFound : htmlHandler.get404Response
    
    
};

const onRequest = (request, response) => {

    const parsedUrl = url.parse(request.url);
    const {
        pathname
    } = parsedUrl;
    const params = query.parse(parsedUrl.query);
    
    if(urlStruct[pathname]){
        console.log(params.limit)
        urlStruct[pathname](request,response,params)
        
    }else{
        urlStruct.notFound(request,response,params);
    }
}



//const onRequest = (request, response) => {
//  const parsedUrl = url.parse(request.url);
//  const { pathname } = parsedUrl;
//
//  if (pathname === '/') {
//    response.writeHead(200, {
//      'Content-Type': 'application/json',
//    });
//    response.write(getRandomJoke());
//    response.end();
//  } else if (pathname === '/random-joke') {
//    response.writeHead(200, {
//      'Content-Type': 'application/json',
//    });
//    response.write(getRandomJoke());
//    response.end();
//  } else {
//    response.writeHead(404, {
//      'Content-Type': 'text/html',
//    });
//    response.write(errorPage);
//    response.end();
//  }
//};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
