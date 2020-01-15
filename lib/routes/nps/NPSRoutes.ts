
import { NPSController } from "../../controllers/nps/NPSController";

export class NPSRoutes {

    private app: any
    private root: String
    private npsController: NPSController = new NPSController();

    constructor(app: any, root: String) {
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
        this.app.route(this.root + version + '/nps').post(this.npsController.addNewNPS)
    }

    private getNPS(){
        let version = "v1"
        this.app.route(this.root + version + '/nps').get(this.npsController.getNPS)
    }

    private getNPSWithID(){
        let version = "v1"
        this.app.route(this.root + version + '/nps/:npsID').get(this.npsController.getNPSWithID)
    }

    private updateNPS() {
        let version = "v1"
        this.app.route(this.root + version + '/nps/:npsID').post(this.npsController.updateNPS)
    }


    private deleteNPS() {
        let version = "v1"
        this.app.route(this.root + version + '/nps/:npsID').delete(this.npsController.deleteNPS)
    }
}