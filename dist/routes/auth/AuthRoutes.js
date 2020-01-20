"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = require("../base/BaseRouter");
const AuthController_1 = require("../../controllers/auth/AuthController");
class AuthRoutes extends BaseRouter_1.BaseRouter {
    constructor(app, root) {
        super();
        this.authController = new AuthController_1.AuthController();
        this.app = app;
        this.root = root;
        this.login();
        this.publicKey();
        this.accessToken();
        this.testAES();
    }
    testAES() {
        this.app.route(this.root + "v1" + '/test').get(this.authController.testAES);
    }
    publicKey() {
        this.app.route(this.root + "v1" + '/publicKey').get(this.authController.publicKey);
    }
    accessToken() {
        this.app.route(this.root + "v1" + '/accessToken').post(this.authController.accessToken);
    }
    login() {
        this.app.route(this.root + "v1" + '/login').post(super.sessionControl(), this.authController.login);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=AuthRoutes.js.map