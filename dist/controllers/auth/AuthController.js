"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const BaseController_1 = require("../BaseController");
const CryptoTools_1 = require("../../security/CryptoTools");
const PublicKey_1 = require("../../security/RSA/model/PublicKey");
const JWTSession_1 = require("../../security/JWT/model/JWTSession");
const SessionTokenModel_1 = require("../../security/JWT/model/SessionTokenModel");
const AccessTokenModel_1 = require("../../security/JWT/model/AccessTokenModel");
const JWTType_1 = require("../../security/JWT/model/JWTType");
const UserModel_1 = require("../../models/user/UserModel");
const HTTPStatus_1 = require("../../models/http/HTTPStatus");
const User = mongoose.model('User', UserModel_1.UserSchema);
class AuthController extends BaseController_1.BaseController {
    publicKey(req, res) {
        let publicKey = new PublicKey_1.PublicKey(CryptoTools_1.CryptoTools.RSA().publicKey());
        super.send(res, publicKey);
    }
    tokenStatus(req, res) {
    }
    accessToken(req, res) {
        let body = JSON.parse(JSON.stringify(req.body));
        let plainData = CryptoTools_1.CryptoTools.RSA().decrypt(req.body.data, "json");
        let session = new JWTSession_1.JWTSession(plainData, JWTType_1.JWTType.ACCESS);
        let encrypted = CryptoTools_1.CryptoTools.JWT().signAccessToken(session);
        let accessToken = JSON.parse(JSON.stringify(new AccessTokenModel_1.AccessTokenModel(encrypted)));
        console.log("\n\n\n\n ==================");
        console.log("\nBody: " + JSON.stringify(body));
        console.log("\nPlain: " + JSON.stringify(plainData));
        console.log("\nSession: " + JSON.stringify(plainData));
        console.log("\nToken: " + JSON.stringify(accessToken));
        console.log("==================\n\n\n\n ");
        super.send(res, accessToken);
    }
    login(req, res) {
        const token = new JWTSession_1.JWTSession(req.params.access);
        let userData = CryptoTools_1.CryptoTools.AES().decrypt(req.body.data, token.AESKey, token.AESSalt, token.AESIV);
        let userModel = User(JSON.parse(userData));
        if (userModel == null) {
            super.send(res, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            return;
        }
        User.findOne({ 'firebaseID': userModel.firebaseID }, (error, user) => {
            if (error) {
                super.send(res, new HTTPStatus_1.HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                return;
            }
            if (user) {
                token.id = user._id;
                token.firebaseID = user.firebaseID;
                let session = new JWTSession_1.JWTSession(token, JWTType_1.JWTType.SESSION);
                let sessionTokenEncrypted = CryptoTools_1.CryptoTools.JWT().signSessionToken(session);
                let sessionToken = JSON.parse(JSON.stringify(new SessionTokenModel_1.SessionTokenModel(sessionTokenEncrypted)));
                super.send(res, sessionToken);
                return;
            }
            else {
                userModel.save((error, user) => {
                    if (error) {
                        super.send(res, new HTTPStatus_1.HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                        return;
                    }
                    token.id = user._id;
                    token.firebaseID = user.firebaseID;
                    let session = new JWTSession_1.JWTSession(token, JWTType_1.JWTType.SESSION);
                    let sessionTokenEncrypted = CryptoTools_1.CryptoTools.JWT().signSessionToken(session);
                    let sessionToken = JSON.parse(JSON.stringify(new SessionTokenModel_1.SessionTokenModel(sessionTokenEncrypted)));
                    super.send(res, sessionToken);
                });
            }
        });
    }
    testAES() {
        const key = "aDoteTXz9c6POCI2";
        const salt = "apph5qEE";
        const iv = "Fki5DpYuYyV139iVBbkFHw==";
        const plain = "wow";
        const chiper = "bMnkjVuD0mKlxTVuhsGT/w==";
        console.log("\n\nPlain: " + plain);
        // let data = CryptoTools.AES().encrypt(plain, key, salt, iv)
        let safe = CryptoTools_1.CryptoTools.AES().decrypt(chiper, key, salt, iv);
        console.log("\n==============");
        // console.log("AES enc: " + data)
        console.log("AES dec: " + safe);
        console.log("==============");
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map