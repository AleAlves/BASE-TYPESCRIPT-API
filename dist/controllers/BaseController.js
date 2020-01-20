"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPResponse_1 = require("../models/http/HTTPResponse");
const JWTSession_1 = require("../security/JWT/model/JWTSession");
class BaseController {
    session(req) {
        return new JWTSession_1.JWTSession(JSON.parse(JSON.stringify(req.params.session)));
    }
    send(res, data, status, expiredToken) {
        console.log("BaseController send() : " + JSON.stringify(data));
        res.send(new HTTPResponse_1.HTTPResponse(data, status));
        return;
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map