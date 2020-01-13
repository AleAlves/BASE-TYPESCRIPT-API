"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeRSA = require('node-rsa');
const generator = require('generate-password');
const ALGORITHM = 'pkcs1';
const PUBLIC_KEY_FORMT = 'pkcs8-public-pem';
const STANDAR_ENCODE = 'base64';
const RSAKey = new NodeRSA({
    b: 1024
});
RSAKey.setOptions({ encryptionScheme: ALGORITHM });
class RSATools {
    publicKey() {
        return RSAKey.exportKey(PUBLIC_KEY_FORMT);
    }
    encrypt(data) {
        return RSAKey.encrypt(data, STANDAR_ENCODE);
    }
    decrypt(data, format) {
        return RSAKey.decrypt(data, format);
    }
}
exports.RSATools = RSATools;
//# sourceMappingURL=RSATools.js.map