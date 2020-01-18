
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
        let version = "v1"
        this.app.route(this.root + version + '/nps').post(super.sessionControl(), this.npsController.addNewNPS)
    }

    private getNPS() {
        let version = "v1"
        this.app.route(this.root + version + '/nps').get(super.sessionControl(), this.npsController.getNPS)
    }

    private getNPSWithID() {
        let version = "v1"
        this.app.route(this.root + version + '/nps/:npsID').get(super.sessionControl(), this.npsController.getNPSWithID)
    }

    private updateNPS() {
        let version = "v1"
        this.app.route(this.root + version + '/nps/:npsID').post(super.sessionControl(), this.npsController.updateNPS)
    }


    private deleteNPS() {
        let version = "v1"
        this.app.route(this.root + version + '/nps/:npsID').delete(super.sessionControl(), this.npsController.deleteNPS)
    }
}