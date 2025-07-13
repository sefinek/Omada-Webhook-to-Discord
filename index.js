require('env-native').config();

const express = require('express');
const { networkInterfaces } = require('node:os');
const { name, version } = require('./package.json');

// Middleware imports
const helmet = require('helmet');
const timeout = require('./middlewares/timeout.js');
const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const { notFound, internalError } = require('./middlewares/errors.js');

// Network interfaces
const port = process.env.PORT;
const getLocalNetworkLinks = () => Object.values(networkInterfaces())
	.flat()
	.filter(x => x.family === 'IPv4' && !x.internal)
	.map(x => `http://${x.address}:${port}`);

// Create an Express app
const app = express();

// Middlewares
app.use(helmet());
app.use(express.json({ limit: '4kb' }));
app.use(logger);
app.use(limiter);
app.use(timeout());


const MainRouter = require('./routes/Index.js');
app.use(MainRouter);


// Errors
app.use(notFound);
app.use(internalError);

// Listen
app.listen(port, () => {
	const localLinks = getLocalNetworkLinks();
	console.log(`[${process.env.NODE_ENV.toUpperCase()}] Waiting for events (${name}/${version})`);
	console.log(`- Local  : http://127.0.0.1:${port}/discord/webhook`);
	localLinks.forEach(url => console.log(`- Network: ${url}/discord/webhook`));

	process.send?.('ready');
});