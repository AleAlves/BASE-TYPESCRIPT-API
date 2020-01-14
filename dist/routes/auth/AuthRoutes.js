"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../../controllers/auth/AuthController");
class AuthRoutes {
    constructor(app, root) {
        this.authController = new AuthController_1.AuthController();
        this.app = app;
        this.root = root;
        this.publicKey();
        this.generateToken();
    }
    publicKey() {
        let version = "v1";
        this.app.route(this.root + version + '/publicKey').get(this.authController.getPublicKey);
    }
    generateToken() {
        let version = "v1";
        this.app.route(this.root + version + '/generateToken').post(this.authController.generateToken);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=AuthRoutes.js.map