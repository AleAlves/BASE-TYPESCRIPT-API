// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { Router } from "./routes/Router";
import * as mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from 'swagger-ui-express'
const packageInfo = require('../package.json');

class App {

  public app: express.Application;
  public router: Router = new Router();
  public mongoUrl: string = 'mongodb://127.0.0.1:27017/' + packageInfo.name + '-database';

  constructor() {
    this.app = express();
    this.config();
    this.router.routes(this.app);
    this.mongoSetup();
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require('./swagger.json');

    this.app.use('/api-docs', swaggerUi.serve);
    this.app.get('/api-docs', swaggerUi.setup(swaggerDocument));
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }

}

export default new App().app;