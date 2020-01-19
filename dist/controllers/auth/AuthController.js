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
        console.log("Body: " + JSON.stringify(body));
        console.log("Plain: " + JSON.stringify(plainData));
        console.log("Session: " + JSON.stringify(plainData));
        console.log("Token: " + JSON.stringify(accessToken));
        super.send(res, accessToken);
    }
    login(req, res) {
        let userModel = User(req.body);
        const token = req.headers['accesstoken'].toString();
        let accessToken = JSON.parse(JSON.stringify(CryptoTools_1.CryptoTools.JWT().decodeToken(token)));
        let session = new JWTSession_1.JWTSession(accessToken, JWTType_1.JWTType.SESSION);
        let sessionTokenEncrypted = CryptoTools_1.CryptoTools.JWT().signSessionToken(session);
        let sessionToken = JSON.parse(JSON.stringify(new SessionTokenModel_1.SessionTokenModel(sessionTokenEncrypted)));
        console.log("User" + JSON.stringify(userModel));
        if (userModel == null) {
            super.send(undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            return;
        }
        User.findOne({ 'firebaseID': userModel.firebaseID }, (error, user) => {
            if (error) {
                super.send(res, new HTTPStatus_1.HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                return;
            }
            if (user) {
                super.send(res, sessionToken);
            }
            else {
                userModel.save((error, user) => {
                    if (error) {
                        super.send(res, new HTTPStatus_1.HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                        return;
                    }
                    super.send(res, sessionToken);
                });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map