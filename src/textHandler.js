const returnText = (request, response, code, type, content) => {
  if (type === 'text/xml') {
    // Create XML string
    let responseXML = '<response>';
    const keysArray = Object.keys(content);
    // Add all key-value pairs to xml string
    for (let i = 0; i < keysArray.length; i++) {
      const key = keysArray[i];
      if (Object.prototype.hasOwnProperty.call(content, key)) {
        const value = content[key];
        responseXML = `${responseXML} <${key}>${value}</${key}>`;
      }
    }
    // Close xml string
    responseXML = `${responseXML} </response>`;

    // Write xml response
    response.writeHead(code, { 'Content-Type': type });
    response.write(responseXML);
    response.end();
  } else if (type === 'application/json') {
    // Send content to json string
    const contentString = JSON.stringify(content);

    // Write JSON response
    response.writeHead(code, { 'Content-Type': type });
    response.write(contentString);
    response.end();
  }
};

const success = (request, response, params, responseType) => {
  const successContent = {
    message: 'This is a successful response',
  };

  returnText(request, response, 200, responseType, successContent);
};

const badRequest = (request, response, params, responseType) => {
  if (params.valid === 'true') {
    const brValidContent = {
      message: 'This request has the required parameters',
    };

    returnText(request, response, 200, responseType, brValidContent);
  } else {
    const brInvalidContent = {
      message: 'Missing valid query parameter set to true',
      id: 'badRequest',
    };

    returnText(request, response, 400, responseType, brInvalidContent);
  }
};

const unauthorized = (request, response, params, responseType) => {
  if (params.loggedIn === 'yes') {
    const authorizedContent = {
      message: 'You have successfully viewed the content',
    };

    returnText(request, response, 200, responseType, authorizedContent);
  } else {
    const unauthorizedContent = {
      message: 'Missing loggedIn query parameter set to "yes"',
      id: 'unauthorized',
    };

    returnText(request, response, 401, responseType, unauthorizedContent);
  }
};

const forbidden = (request, response, params, responseType) => {
  const forbiddenContent = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  returnText(request, response, 403, responseType, forbiddenContent);
};

const internal = (request, response, params, responseType) => {
  const internalContent = {
    message: 'Internal Server Error, Something went wrong.',
    id: 'internalError',
  };

  returnText(request, response, 500, responseType, internalContent);
};

const notImplemented = (request, response, params, responseType) => {
  const notImplementedContent = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  returnText(request, response, 501, responseType, notImplementedContent);
};

const notFound = (request, response, params, responseType) => {
  const notFoundContent = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  returnText(request, response, 404, responseType, notFoundContent);
};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
