
import { BaseRouter } from "../base/BaseRouter"
import { NPSController } from "../../controllers/nps/NPSController";

export class NPSRoutes extends BaseRouter {

    private app: any
    private root: String
    private npsController: NPSController = new NPSController();

    constructor(app: any, root: String) {
        super()
        this.app = app
        this.root = root
        this.addNewNPS()
        this.getNPS()
        this.getNPSWithID()
        this.updateNPS()
        this.deleteNPS()

    }

    private addNewNPS() {
        this.app.route(this.root + "v1" + '/nps').post(super.sessionControl(), this.npsController.addNewNPS)
    }

    private getNPS() {
        this.app.route(this.root + "v1" + '/nps').get(super.sessionControl(), this.npsController.getNPS)
    }

    private getNPSWithID() {
        this.app.route(this.root + "v1" + '/nps/:npsID').get(super.sessionControl(), this.npsController.getNPSWithID)
    }

    private updateNPS() {
        this.app.route(this.root + "v1" + '/nps/:npsID').post(super.sessionControl(), this.npsController.updateNPS)
    }


    private deleteNPS() {
        this.app.route(this.root + "v1" + '/nps/:npsID').delete(super.sessionControl(), this.npsController.deleteNPS)
    }
}