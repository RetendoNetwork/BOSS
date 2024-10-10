import express from 'express';
import logger from './utils/logger';
const config = require('../config.json');
const { config: { port } } = config;
const app = express();

async function main(): Promise<void> {
    app.listen(port, () => {
        logger.log(`The server was started on the port ${port}`);
    });
}

main().catch(console.error);