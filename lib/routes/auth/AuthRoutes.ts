
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
        this.login()
        this.publicKey()
        this.accessToken()
        this.testAES()
    }

    private testAES(){
        this.app.route(this.root +  "v1" + '/test').get(this.authController.testAES)
    }

    private publicKey() {
        this.app.route(this.root +  "v1" + '/publicKey').get(this.authController.publicKey)
    }

    private accessToken(){
        this.app.route(this.root +  "v1" + '/accessToken').post(this.authController.accessToken)
    }

    private login(){
        this.app.route(this.root +  "v1" + '/login').post(super.sessionControl(), this.authController.login)
    }
}