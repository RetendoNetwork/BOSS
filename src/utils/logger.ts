import colors from 'colors';
import moment from 'moment';
import { Request, Response, NextFunction } from 'express';

colors.enable();

interface Logger {
    log(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    database(msg: string): void;
    http_log(req: Request, res: Response, next: NextFunction): void;
}

const logger: Logger = {
    log(msg: string): void {
        console.log(`[LOG] (${moment().format("HH:mm:ss")}) ${msg}`.green);
    },

    info(msg: string): void {
        console.log(`[INFO] (${moment().format("HH:mm:ss")}) ${msg}`.blue);
    },

    warn(msg: string): void {
        console.log(`[WARN] (${moment().format("HH:mm:ss")}) ${msg}`.yellow);
    },

    error(msg: string): void {
        console.log(`[ERROR] (${moment().format("HH:mm:ss")}) ${msg}`.red);
    },

    database(msg: string): void {
        console.log(`[DATABASE] (${moment().format("HH:mm:ss")}) ${msg}`.cyan);
    },

    http_log(req: Request, res: Response, next: NextFunction): void {
        switch (req.method) {
            case "GET":
                console.log(`[GET] (${moment().format("HH:mm:ss")}) ${req.url}`.green);
                break;
            case "POST":
                console.log(`[POST] (${moment().format("HH:mm:ss")}) ${req.url}`.yellow);
                break;
            case "PUT":
                console.log(`[PUT] (${moment().format("HH:mm:ss")}) ${req.url}`.blue);
                break;
            case "DELETE":
                console.log(`[DELETE] (${moment().format("HH:mm:ss")}) ${req.url}`.red);
                break;
            default:
                console.log(`[${req.method}] (${moment().format("HH:mm:ss")}) ${req.url}`.cyan);
                break;
        }

        next();
    }
}

export default logger;