const morgan = require('morgan');

const isDevelopment = process.env.NODE_ENV === 'development';

const requestLine = morgan.compile(`[:status :method :response-time ms] :url - :user-agent${isDevelopment ? ' :remote-addr' : ''}`);

module.exports = morgan((tokens, req, res) => isDevelopment ? `${requestLine(tokens, req, res)} ${JSON.stringify(req.body)}` : requestLine(tokens, req, res));