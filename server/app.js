import createError from "http-errors";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import setup from "./logger/index.js";

// environment variables configuration
import dotenv from "dotenv";
dotenv.config();

global.env = process.env.NODE_ENV || "development";

const __dirname = dirname(fileURLToPath(import.meta.url));

global.LOG_DB = __dirname + "/db";
global.LOG_DIR = __dirname + "/logs";
const { logger, morganLogger } = setup(true);

const app = express();
app.use(morganLogger);
app.use(express.json());
app.use("/assets", express.static("assets"));
app.use(["/stats/:device", "/"], express.static("static"));

import deviceRoute from "./routes/deviceRoute.js";
app.use("/api/device", deviceRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res) => {
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val => {
    let port = parseInt(val, 10);

    // named pipe
    if (isNaN(port)) return val;

    // port number
    if (port >= 0) return port;
    return false;
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = error => {
    if (error.syscall !== "listen") throw error;

    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};


import { poll } from "./poll.js";
/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = async () => {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    logger.info("Listening on " + bind);
    await poll(); // really this should never return
};

// Get port from environment (or 5000) and store in Express.
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

// Create HTTP server.
import http from "http";
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);