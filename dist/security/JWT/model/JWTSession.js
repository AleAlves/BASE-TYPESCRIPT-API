"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JWTSession {
    constructor(clientAESData, type) {
        this.id = clientAESData.id;
        this.firebaseID = clientAESData.firebaseID;
        this.AESIV = clientAESData.AESIV.replace(/(\r\n|\n|\r)/gm, "");
        this.AESKey = clientAESData.AESKey.replace(/(\r\n|\n|\r)/gm, "");
        this.AESSalt = clientAESData.AESSalt.replace(/(\r\n|\n|\r)/gm, "");
        this.created = Date.now();
        this.type = type;
    }
}
exports.JWTSession = JWTSession;
//# sourceMappingURL=JWTSession.js.map