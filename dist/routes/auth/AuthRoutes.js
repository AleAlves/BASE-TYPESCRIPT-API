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
        this.publicKey();
        this.decrypt();
        this.generateAccessToken();
    }
    publicKey() {
        let version = "v1";
        this.app.route(this.root + version + '/publicKey').get(this.authController.getPublicKey);
    }
    decrypt() {
        let version = "v1";
        this.app.route(this.root + version + '/decrypt').post(this.authController.decrypt);
    }
    generateAccessToken() {
        let version = "v1";
        this.app.route(this.root + version + '/accessToken').post(this.authController.generateAccessToken);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=AuthRoutes.js.map