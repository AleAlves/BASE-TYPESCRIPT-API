export class BaseRouter {

    public secureAPI(app: any) {
        app.use(require("../../security/Session/SessionGuardian"))
    }

}