const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response, params, responseType) => {
  response.writeHead(200, { 'Content-Type': responseType });
  response.write(index);
  response.end();
};

const getCSS = (request, response, params, responseType) => {
  response.writeHead(200, { 'Content-Type': responseType });
  response.write(style);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getCSS = getCSS;
