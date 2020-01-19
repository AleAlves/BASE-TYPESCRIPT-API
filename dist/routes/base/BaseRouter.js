"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRouter {
    sessionControl() {
        const sessionAuth = require("../../security/Session/SessionAuth");
        return sessionAuth;
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map