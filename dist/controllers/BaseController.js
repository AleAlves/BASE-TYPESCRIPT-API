"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPResponse_1 = require("../models/http/HTTPResponse");
class BaseController {
    send(res, data, status, code, message) {
        console.log(JSON.stringify(data));
        res.send(new HTTPResponse_1.HTTPResponse(data, status, code, message));
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map