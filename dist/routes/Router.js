"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthRoutes_1 = require("./auth/AuthRoutes");
const NPSRoutes_1 = require("./nps/NPSRoutes");
const UserRoutes_1 = require("./user/UserRoutes");
const API_ROOT = "/api/";
class Router {
    routes(app) {
        new AuthRoutes_1.AuthRoutes(app, API_ROOT);
        new NPSRoutes_1.NPSRoutes(app, API_ROOT);
        new UserRoutes_1.UserRoutes(app, API_ROOT);
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map