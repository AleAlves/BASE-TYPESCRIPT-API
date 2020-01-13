"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AESTools_1 = require("./AES/AESTools");
const RSATools_1 = require("./RSA/RSATools");
class CryptoTools {
    static AES() {
        return this.aes;
    }
    static RSA() {
        return this.rsa;
    }
}
exports.CryptoTools = CryptoTools;
CryptoTools.aes = new AESTools_1.AESTools();
CryptoTools.rsa = new RSATools_1.RSATools();
//# sourceMappingURL=CryptoTools.js.map