
export class JWTSession {

    uid: String
    AESIV: String
    AESKey: String
    AESSalt: String
    created: number

    constructor(clientAESData : any) {
        this.uid = clientAESData.uid
        this.AESIV = clientAESData.AESIV
        this.AESKey = clientAESData.AESKey
        this.AESSalt = clientAESData.AESSalt
        this.created = Date.now()
    }
}