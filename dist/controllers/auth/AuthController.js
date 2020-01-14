"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../BaseController");
const CryptoTools_1 = require("../../security/CryptoTools");
const HTTPResponse_1 = require("../../models/http/HTTPResponse");
const PublicKey_1 = require("../../security/RSA/model/PublicKey");
const JWTSession_1 = require("../../security/JWT/model/JWTSession");
class AuthController extends BaseController_1.BaseController {
    getPublicKey(req, res) {
        let publicKey = new PublicKey_1.PublicKey(CryptoTools_1.CryptoTools.RSA().publicKey());
        super.send(res, new HTTPResponse_1.HTTPResponse(publicKey));
    }
    generateToken(req, res) {
        let clientAESData = CryptoTools_1.CryptoTools.JWT().encode(new JWTSession_1.JWTSession(req.body));
        console.log(JSON.stringify(clientAESData));
        let palin = CryptoTools_1.CryptoTools.JWT().decode(clientAESData);
        console.log(JSON.stringify(palin));
        super.send(res, "wow");
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map