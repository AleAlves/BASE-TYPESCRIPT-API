"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../BaseController");
const CryptoTools_1 = require("../../security/CryptoTools");
const PublicKey_1 = require("../../security/RSA/model/PublicKey");
const JWTSession_1 = require("../../security/JWT/model/JWTSession");
const JWTModel_1 = require("../../security/JWT/model/JWTModel");
const JWTType_1 = require("../../security/JWT/model/JWTType");
class AuthController extends BaseController_1.BaseController {
    getPublicKey(req, res) {
        let publicKey = new PublicKey_1.PublicKey(CryptoTools_1.CryptoTools.RSA().publicKey());
        super.send(res, publicKey);
    }
    decrypt(req, res) {
        let data = JSON.parse(JSON.stringify(req.body));
        console.log(JSON.stringify(data));
        super.send(res, CryptoTools_1.CryptoTools.RSA().decrypt(data.teste, "utf8"));
    }
    tokenStatus(req, res) {
    }
    generateAccessToken(req, res) {
        let body = JSON.parse(JSON.stringify(req.body));
        let plainData = CryptoTools_1.CryptoTools.RSA().decrypt(req.body.data, "json");
        let session = new JWTSession_1.JWTSession(plainData, JWTType_1.JWTType.ACCESS);
        let encrypted = CryptoTools_1.CryptoTools.JWT().signAccessToken(session);
        let accessToken = JSON.parse(JSON.stringify(new JWTModel_1.JWTModel(undefined, encrypted)));
        console.log("Body: " + JSON.stringify(body));
        console.log("Plain: " + JSON.stringify(plainData));
        console.log("Session: " + JSON.stringify(plainData));
        console.log("Token: " + JSON.stringify(accessToken));
        super.send(res, accessToken);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map