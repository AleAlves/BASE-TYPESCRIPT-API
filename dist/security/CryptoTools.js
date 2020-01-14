"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AESTools_1 = require("./AES/AESTools");
const RSATools_1 = require("./RSA/RSATools");
const JWTTools_1 = require("./JWT/JWTTools");
class CryptoTools {
    static AES() {
        return this.aes;
    }
    static RSA() {
        return this.rsa;
    }
    static JWT() {
        return this.jwt;
    }
}
exports.CryptoTools = CryptoTools;
CryptoTools.aes = new AESTools_1.AESTools();
CryptoTools.rsa = new RSATools_1.RSATools();
CryptoTools.jwt = new JWTTools_1.JWTTools();
//# sourceMappingURL=CryptoTools.js.map