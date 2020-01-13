"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoTools_1 = require("../../security/CryptoTools");
const HTTPResponse_1 = require("../../models/http/HTTPResponse");
const PublicKey_1 = require("../../security/RSA/model/PublicKey");
class AuthController {
    getPublicKey(req, res) {
        let publicKey = new PublicKey_1.PublicKey(CryptoTools_1.CryptoTools.RSA().publicKey());
        res.send(new HTTPResponse_1.HTTPResponse(publicKey));
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map