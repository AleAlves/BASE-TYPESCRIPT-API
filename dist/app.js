"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./routes/crmRoutes");
const mongoose = require("mongoose");
const packageInfo = require('../package.json');
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        this.mongoUrl = 'mongodb://127.0.0.1:27017/' + packageInfo.name + '-database';
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map