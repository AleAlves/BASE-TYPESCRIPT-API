"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = require("../base/BaseRouter");
const UserController_1 = require("../../controllers/user/UserController");
class UserRoutes extends BaseRouter_1.BaseRouter {
    constructor(app, root) {
        super();
        this.userController = new UserController_1.UserController();
        this.app = app;
        this.root = root;
        this.get();
        this.find();
        this.create();
        this.update();
        this.delete();
    }
    get() {
        this.app.route(this.root + "v1" + '/user').get(super.sessionControl(), this.userController.get);
    }
    find() {
        this.app.route(this.root + "v1" + '/user/:id').get(super.sessionControl(), this.userController.find);
    }
    create() {
        this.app.route(this.root + "v1" + '/user/:id').post(super.sessionControl(), this.userController.create);
    }
    update() {
        this.app.route(this.root + "v1" + '/user/:id').put(super.sessionControl(), this.userController.update);
    }
    delete() {
        this.app.route(this.root + "v1" + '/user/:id').delete(super.sessionControl(), this.userController.delete);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=UserRoutes.js.map