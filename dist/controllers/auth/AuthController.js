"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const BaseController_1 = require("../BaseController");
const CryptoTools_1 = require("../../security/CryptoTools");
const PublicKey_1 = require("../../security/RSA/model/PublicKey");
const JWTSession_1 = require("../../security/JWT/model/JWTSession");
const JWTStatusModel_1 = require("../../security/JWT/model/JWTStatusModel");
const SessionTokenModel_1 = require("../../security/JWT/model/SessionTokenModel");
const AccessTokenModel_1 = require("../../security/JWT/model/AccessTokenModel");
const JWTType_1 = require("../../security/JWT/model/JWTType");
const UserModel_1 = require("../../models/user/UserModel");
const HTTPStatus_1 = require("../../models/http/HTTPStatus");
const Logger_1 = require("../../tools/Logger");
const User = mongoose.model('User', UserModel_1.UserSchema);
class AuthController extends BaseController_1.BaseController {
    publicKey(req, res) {
        let publicKeyModel = new PublicKey_1.PublicKey(CryptoTools_1.CryptoTools.RSA().publicKey());
        Logger_1.Logger.log(publicKeyModel, AuthController.name, "publicKey");
        super.send(res, publicKeyModel);
    }
    validateToken(req, res) {
        try {
            var token = CryptoTools_1.CryptoTools.JWT().instance().verify(req.params.token);
            Logger_1.Logger.log("AuthController", "validateToken", token);
            if (token) {
                super.send(res, new JWTStatusModel_1.JWTStatusModel(true));
            }
            else {
                super.send(res, new JWTStatusModel_1.JWTStatusModel(false));
            }
            return;
        }
        catch (error) {
            Logger_1.Logger.log("AuthController", "validateToken", token);
            super.send(res, new JWTStatusModel_1.JWTStatusModel(false));
            return;
        }
    }
    accessToken(req, res) {
        let body = JSON.parse(JSON.stringify(req.body));
        let plainData = CryptoTools_1.CryptoTools.RSA().decrypt(req.body.data, "json");
        let session = new JWTSession_1.JWTSession(plainData, JWTType_1.JWTType.ACCESS);
        let encrypted = CryptoTools_1.CryptoTools.JWT().signAccessToken(session);
        let accessToken = JSON.parse(JSON.stringify(new AccessTokenModel_1.AccessTokenModel(encrypted)));
        Logger_1.Logger.log(body, AuthController.name, "accessToken", "body");
        Logger_1.Logger.log(plainData, AuthController.name, "accessToken", "plain");
        Logger_1.Logger.log(session, AuthController.name, "accessToken", "session");
        Logger_1.Logger.log(accessToken, AuthController.name, "accessToken", "accessToken");
        super.send(res, accessToken);
    }
    login(req, res) {
        const token = new JWTSession_1.JWTSession(req.params.access);
        let userData = CryptoTools_1.CryptoTools.AES().decrypt(req.body.data, token.AESKey, token.AESSalt, token.AESIV);
        let userModel = User(JSON.parse(userData));
        if (userModel == null) {
            super.send(res, undefined, undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            return;
        }
        User.findOne({ 'firebaseID': userModel.firebaseID }, (error, user) => {
            if (error) {
                super.send(res, undefined, undefined, new HTTPStatus_1.HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                return;
            }
            if (user) {
                let sessionToken = this.generateSessionToken(user, token);
                super.send(res, sessionToken);
                return;
            }
            else {
                userModel.save((error, user) => {
                    if (error) {
                        super.send(res, undefined, undefined, new HTTPStatus_1.HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                        return;
                    }
                    let sessionToken = this.generateSessionToken(user, token);
                    super.send(res, sessionToken);
                });
            }
        });
    }
    generateSessionToken(user, token) {
        token.userID = user._id;
        token.firebaseID = user.firebaseID;
        let session = new JWTSession_1.JWTSession(token, JWTType_1.JWTType.SESSION);
        let sessionTokenEncrypted = CryptoTools_1.CryptoTools.JWT().signSessionToken(session);
        return JSON.parse(JSON.stringify(new SessionTokenModel_1.SessionTokenModel(sessionTokenEncrypted)));
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map