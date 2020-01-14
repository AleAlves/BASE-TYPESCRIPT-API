"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonWebToken = require('jwt-simple');
const generator = require('generate-password');
var JWTSecret = process.env.JSON_WEB_TOKEN_SECRET || generator.generate({
    length: 32,
    numbers: true
});
class JWTTools {
    encode(data) {
        try {
            return JsonWebToken.encode(data, JWTSecret);
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
    decode(data) {
        try {
            return JsonWebToken.decode(data, JWTSecret);
        }
        catch (e) {
            console.log("JWT e: " + e);
            return null;
        }
    }
    verify(data) {
    }
}
exports.JWTTools = JWTTools;
//# sourceMappingURL=JWTTools.js.map