"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonWebToken = require('jsonwebtoken');
const generator = require('generate-password');
const tokenKey = process.env.JSON_WEB_TOKEN_SECRET || generator.generate({
    length: 64,
    numbers: true
});
const tokenLife = "24h";
class JWTTools {
    sign(data) {
        try {
            return jsonWebToken.sign(data, tokenKey, { expiresIn: tokenLife });
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
    verify(jwt) {
        try {
            return jwt.verify(tokenKey, 'wrong-secret');
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
}
exports.JWTTools = JWTTools;
//# sourceMappingURL=JWTTools.js.map