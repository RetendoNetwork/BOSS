const express = require('express');
const morgan = require('morgan');
const logger = require('./logger');
require('dotenv').config();

const nppl = require('./services/nppl');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use(nppl);

app.use((_req, res) => {
	res.status(404);
	res.json({
		app: 'api',
		status: 404,
		error: 'Route not found'
	});
});

app.use((error, _req, res, _next) => {
	let status = 500;
	let message = 'Unknown error';

	if (error instanceof RequestException) {
		status = error.status;
		message = error.message;
	}

	console.log(error);

	res.status(status);
	res.json({
		app: 'boss',
		status: status,
		error: message
	});
});

async function main() {
	app.listen(process.env.PORT, () => {
		logger.log(`The BOSS was listening on http://localhost:${process.env.PORT}`);
	});
}

main().catch(console.error);