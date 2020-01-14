"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeRSA = require('node-rsa');
const ALGORITHM = 'pkcs1';
const PUBLIC_KEY_FORMT = 'pkcs8-public-pem';
const STANDAR_ENCRYPT_ENCODE = 'base64';
const STANDARD_DECRYPT_FORMAT = 'json';
const RSAKey = new NodeRSA({
    b: 1024
});
RSAKey.setOptions({ encryptionScheme: ALGORITHM });
class RSATools {
    publicKey() {
        return RSAKey.exportKey(PUBLIC_KEY_FORMT);
    }
    encrypt(data) {
        return RSAKey.encrypt(data, STANDAR_ENCRYPT_ENCODE);
    }
    decrypt(data, format) {
        if (format) {
            format = STANDARD_DECRYPT_FORMAT;
        }
        return RSAKey.decrypt(data, format);
    }
}
exports.RSATools = RSATools;
//# sourceMappingURL=RSATools.js.map