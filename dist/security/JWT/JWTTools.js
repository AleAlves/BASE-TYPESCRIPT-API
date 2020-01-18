"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require('jsonwebtoken');
const generator = require('generate-password');
const JWTSession_1 = require("../JWT/model/JWTSession");
const JWTType_1 = require("../JWT/model/JWTType");
var key = process.env.JSON_WEB_TOKEN_SECRET || generator.generate({
    length: 64,
    numbers: true
});
const sessionTokenLife = 43200; // 3min
const accessTokenLife = 60; // 1min
class JWTTools {
    instance() {
        console.log(key);
        return JWT;
    }
    key() {
        console.log(key);
        return key;
    }
    signAccessToken(data) {
        try {
            console.log(key);
            return JWT.sign(JSON.parse(JSON.stringify(data)), key, { expiresIn: accessTokenLife });
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
    signSessionToken(data) {
        try {
            console.log(key);
            return JWT.sign(JSON.parse(JSON.stringify(data)), key, { expiresIn: sessionTokenLife });
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
    renewSessionToken(expiredToken) {
        let decodedToken = this.decodeToken(expiredToken);
        let newToken = new JWTSession_1.JWTSession(decodedToken, JWTType_1.JWTType.SESSION);
        return this.signSessionToken(newToken);
    }
    decodeToken(token) {
        JWT.verify(token, function (error, decodedToken) {
            if (error) {
                return undefined;
            }
            return decodedToken;
        });
    }
    verify(token) {
        JWT.verify(token, function (error, decodedToken) {
            if (error) {
                return false;
            }
            return true;
        });
    }
}
exports.JWTTools = JWTTools;
//# sourceMappingURL=JWTTools.js.map