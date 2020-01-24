"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = require("../base/BaseRouter");
const NPSController_1 = require("../../controllers/nps/NPSController");
class NPSRoutes extends BaseRouter_1.BaseRouter {
    constructor(app, root) {
        super();
        this.npsController = new NPSController_1.NPSController();
        this.app = app;
        this.root = root;
        this.add();
        this.get();
        this.getWithID();
        this.update();
        this.delete();
    }
    add() {
        this.app.route(this.root + "v1" + '/nps').post(super.sessionControl(), this.npsController.add);
    }
    get() {
        this.app.route(this.root + "v1" + '/nps').get(super.sessionControl(), this.npsController.get);
    }
    getWithID() {
        this.app.route(this.root + "v1" + '/nps/:npsID').get(super.sessionControl(), this.npsController.getWithID);
    }
    update() {
        this.app.route(this.root + "v1" + '/nps/:npsID').post(super.sessionControl(), this.npsController.update);
    }
    delete() {
        this.app.route(this.root + "v1" + '/nps/:npsID').delete(super.sessionControl(), this.npsController.delete);
    }
}
exports.NPSRoutes = NPSRoutes;
//# sourceMappingURL=NPSRoutes.js.map