"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRouter {
    secureAPI(app) {
        app.use(require("../../security/Session/SessionAuth"));
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map