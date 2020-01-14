"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../BaseController");
const CryptoTools_1 = require("../../security/CryptoTools");
const PublicKey_1 = require("../../security/RSA/model/PublicKey");
const JWTSession_1 = require("../../security/JWT/model/JWTSession");
const JWTModel_1 = require("../../security/JWT/model/JWTModel");
class AuthController extends BaseController_1.BaseController {
    getPublicKey(req, res) {
        let publicKey = new PublicKey_1.PublicKey(CryptoTools_1.CryptoTools.RSA().publicKey());
        super.send(res, publicKey);
    }
    decrypt(req, res) {
        let data = JSON.parse(JSON.stringify(req.body));
        super.send(res, CryptoTools_1.CryptoTools.RSA().decrypt(data.teste, "utf8"));
    }
    generateToken(req, res) {
        let plainData = CryptoTools_1.CryptoTools.RSA().decrypt(req.body);
        console.log(JSON.stringify(plainData));
        let clientData = new JWTModel_1.JWTModel(CryptoTools_1.CryptoTools.JWT().encode(new JWTSession_1.JWTSession(plainData)));
        console.log(JSON.stringify(clientData));
        super.send(res, clientData);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map