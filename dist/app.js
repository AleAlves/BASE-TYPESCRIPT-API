"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
const Router_1 = require("./routes/Router");
const mongoose = require("mongoose");
const packageInfo = require('../package.json');
const expressOasGenerator = require('express-oas-generator');
const DEVELOPMENT = process.env.DEVELOPMENT_ENV || true;
class App {
    constructor() {
        this.router = new Router_1.Router();
        this.mongoUrl = 'mongodb://127.0.0.1:27017/' + packageInfo.name + '-database';
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.mongoSetup();
        this.swagger();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
    swagger() {
        if (DEVELOPMENT) {
            expressOasGenerator.handleResponses(this.app);
            expressOasGenerator.handleRequests();
        }
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map