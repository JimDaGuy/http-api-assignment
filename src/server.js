
const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const textHandler = require('./textHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': textHandler.success,
  '/badRequest': textHandler.badRequest,
  '/unauthorized': textHandler.unauthorized,
  '/forbidden': textHandler.forbidden,
  '/internal': textHandler.internal,
  '/notImplemented': textHandler.notImplemented,
  notFound: textHandler.notFound,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const path = parsedUrl.pathname;

  let acceptedTypes = request.headers.accept.split(',') || ['application/json'];

  // Set direct link requests to default to json
  if (acceptedTypes[0] === 'text/html') { acceptedTypes = ['application/json']; }

  if (path === '/') {
    acceptedTypes = ['text/html'];
  } else if (path === '/style.css') {
    acceptedTypes = ['text/css'];
  }

  if (urlStruct[path]) {
    urlStruct[path](request, response, params, acceptedTypes[0]);
  } else {
    urlStruct.notFound(request, response, params, acceptedTypes[0]);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
