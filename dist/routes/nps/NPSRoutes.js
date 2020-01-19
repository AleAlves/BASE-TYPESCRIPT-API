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
        this.addNewNPS();
        this.getNPS();
        this.getNPSWithID();
        this.updateNPS();
        this.deleteNPS();
    }
    addNewNPS() {
        this.app.route(this.root + "v1" + '/nps').post(super.sessionControl(), this.npsController.addNewNPS);
    }
    getNPS() {
        this.app.route(this.root + "v1" + '/nps').get(super.sessionControl(), this.npsController.getNPS);
    }
    getNPSWithID() {
        this.app.route(this.root + "v1" + '/nps/:npsID').get(super.sessionControl(), this.npsController.getNPSWithID);
    }
    updateNPS() {
        this.app.route(this.root + "v1" + '/nps/:npsID').post(super.sessionControl(), this.npsController.updateNPS);
    }
    deleteNPS() {
        this.app.route(this.root + "v1" + '/nps/:npsID').delete(super.sessionControl(), this.npsController.deleteNPS);
    }
}
exports.NPSRoutes = NPSRoutes;
//# sourceMappingURL=NPSRoutes.js.map