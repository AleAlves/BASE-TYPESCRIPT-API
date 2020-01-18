import { JWTType } from "../model/JWTType"
import { JWTStatus } from "./JWTStatus"
const uuid = require('uuid/v4');

export class JWTSession {

    tokenId: String
    uid: String
    id: String
    AESIV: String
    AESKey: String
    AESSalt: String
    created: number
    type: JWTType
    status: JWTStatus

    constructor(clientAESData: any, type: JWTType) {
        this.tokenId = uuid.uuidv4()
        this.id = clientAESData.id
        this.uid = clientAESData.uid
        this.AESIV = clientAESData.AESIV
        this.AESKey = clientAESData.AESKey
        this.AESSalt = clientAESData.AESSalt
        this.created = Date.now()
        this.type = type
        this.status = JWTStatus.VALID
    }
}