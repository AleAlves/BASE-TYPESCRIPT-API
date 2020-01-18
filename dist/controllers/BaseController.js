"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPResponse_1 = require("../models/http/HTTPResponse");
const CryptoTools_1 = require("../security/CryptoTools");
class BaseController {
    send(res, data, status, code, message, expiredToken) {
        console.log(JSON.stringify(data));
        if (expiredToken) {
            res.send(new HTTPResponse_1.HTTPResponse(data, status, code, message, CryptoTools_1.CryptoTools.JWT().renewSessionToken(expiredToken)));
            return;
        }
        res.send(new HTTPResponse_1.HTTPResponse(data, status, code, message));
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map