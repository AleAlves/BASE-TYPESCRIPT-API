"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPResponse_1 = require("../models/http/HTTPResponse");
class BaseController {
    send(res, data, status, expiredToken) {
        console.log("BaseController send() : " + JSON.stringify(data));
        res.send(new HTTPResponse_1.HTTPResponse(data, status));
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map