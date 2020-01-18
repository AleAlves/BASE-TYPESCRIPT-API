"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JWTSession {
    constructor(clientAESData, type) {
        this.id = clientAESData.id;
        this.uid = clientAESData.uid;
        this.AESIV = clientAESData.AESIV;
        this.AESKey = clientAESData.AESKey;
        this.AESSalt = clientAESData.AESSalt;
        this.created = Date.now();
        this.type = type;
    }
}
exports.JWTSession = JWTSession;
//# sourceMappingURL=JWTSession.js.map