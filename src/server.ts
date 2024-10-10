import express from "express";
const config = require('../config.json');
const { config: { port } } = config;
const app = express();

async function main(): Promise<void> {
    app.listen(port, () => {
        console.log('worked');
    });
}

main().catch(console.error);