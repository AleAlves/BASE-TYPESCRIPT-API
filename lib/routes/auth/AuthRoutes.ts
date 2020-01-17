
import { BaseRouter } from "../base/BaseRouter"
import { AuthController } from "../../controllers/auth/AuthController";

export class AuthRoutes extends BaseRouter {

    private app: any
    private root: String
    private authController: AuthController = new AuthController();

    constructor(app: any, root: String) {
        super();
        this.app = app
        this.root = root
        this.publicKey()
        this.decrypt()
        this.generateAccessToken()
    }

    private publicKey() {
        let version = "v1"
        this.app.route(this.root + version + '/publicKey').get(this.authController.getPublicKey)
    }

    private decrypt() {
        let version = "v1"
        this.app.route(this.root + version + '/decrypt').post(this.authController.decrypt)
    }

    private generateAccessToken(){
        let version = "v1"
        this.app.route(this.root + version + '/accessToken').post(this.authController.generateAccessToken)
    }
}