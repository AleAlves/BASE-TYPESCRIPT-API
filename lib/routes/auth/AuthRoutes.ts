
import { AuthController } from "../../controllers/auth/AuthController";

export class AuthRoutes {

    private app: any
    private root: String
    private authController: AuthController = new AuthController();

    constructor(app: any, root: String) {
        this.app = app
        this.root = root
        this.publicKey()
        this.generateToken()
        this.decrypt()
    }

    private publicKey() {
        let version = "v1"
        this.app.route(this.root + version + '/publicKey').get(this.authController.getPublicKey)
    }

    private decrypt() {
        let version = "v1"
        this.app.route(this.root + version + '/decrypt').post(this.authController.decrypt)
    }

    private generateToken(){
        let version = "v1"
        this.app.route(this.root + version + '/generateToken').post(this.authController.generateTicket)
    }
}