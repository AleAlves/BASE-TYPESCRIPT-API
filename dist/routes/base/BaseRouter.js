"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRouter {
    secureAPI(app) {
        app.use(require("../../security/Session/SessionGuardian"));
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map