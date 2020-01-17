"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonWebToken = require('jsonwebtoken');
const generator = require('generate-password');
var key = process.env.JSON_WEB_TOKEN_SECRET || generator.generate({
    length: 64,
    numbers: true
});
const sessionTokenLife = 84600; // 24h
const accessTokenLife = 120; //2min
class JWTTools {
    instance() {
        console.log(key);
        return jsonWebToken;
    }
    key() {
        console.log(key);
        return key;
    }
    signAccessToken(data) {
        try {
            console.log(key);
            return jsonWebToken.sign(JSON.parse(JSON.stringify(data)), key, { expiresIn: accessTokenLife });
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
    signSessionToken(data) {
        try {
            console.log(key);
            return jsonWebToken.sign(JSON.parse(JSON.stringify(data)), key, { expiresIn: sessionTokenLife });
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
    verify(jwt) {
        try {
            console.log(key);
            return jwt.verify(key, key);
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
}
exports.JWTTools = JWTTools;
//# sourceMappingURL=JWTTools.js.map