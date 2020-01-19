
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
        this.app.route(this.root +  "v1" + '/publicKey').get(this.authController.getPublicKey)
    }

    private decrypt() {
        this.app.route(this.root +  "v1" + '/decrypt').post(this.authController.decrypt)
    }

    private generateAccessToken(){
        this.app.route(this.root +  "v1" + '/accessToken').post(this.authController.generateAccessToken)
    }
}