"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostIt = void 0;
const express = require("express");
const fs = require("fs");
const app = express();
const HostIt = (configuration) => {
    const port = (configuration.port) ? configuration.port : 8080;
    if (!fs.existsSync(configuration.directory)) {
        console.log("Directory does not exist please try using an absolute path");
        return false;
    }
    app.use(express.static(configuration.directory));
    app.listen(port, () => {
        console.log("server started on port 5000");
    });
};
exports.HostIt = HostIt;
