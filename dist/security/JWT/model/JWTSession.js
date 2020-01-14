"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JWTSession {
    constructor(clientAESData) {
        this.uid = clientAESData.uid;
        this.AESIV = clientAESData.AESIV;
        this.AESKey = clientAESData.AESKey;
        this.AESSalt = clientAESData.AESSalt;
        this.created = Date.now();
    }
}
exports.JWTSession = JWTSession;
//# sourceMappingURL=JWTSession.js.map