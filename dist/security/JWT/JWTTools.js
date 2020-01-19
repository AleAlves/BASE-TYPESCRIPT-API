"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require('jsonwebtoken');
const generator = require('generate-password');
const JWTSession_1 = require("../JWT/model/JWTSession");
const JWTType_1 = require("../JWT/model/JWTType");
var key = generator.generate({
    length: 128,
    numbers: true
});
const sessionTokenLife = 43200; // 12 min
const accessTokenLife = 30; // 1min
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
        return __awaiter(this, void 0, void 0, function* () {
            return JWT.verify(token, key);
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