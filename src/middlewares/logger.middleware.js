import fs from 'fs'
import winston from 'winston';

const fsPromise = fs.promises;

// Logging Without winston library

// async function log(logData) {
// 	try {
// 		logData = `\n${new Date().toString()} LogData:  ${logData}`
// 		fsPromise.appendFile('log.txt', logData);

// 	} catch (error) {
// 		console.log(error);
// 	}
// }


const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'request-logging' },
	transports: [
		new winston.transports.File({filename: 'logs.txt'})
	]
})

const loggerMiddleware = async (req, res, next) => {
	if (!req.url.includes('signIn')) {
		const logData = `${req.url} - ${JSON.stringify(req.body)}`;
		logger.info(logData);
	}
	next();
}

export default loggerMiddleware;