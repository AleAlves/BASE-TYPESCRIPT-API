
import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { CryptoTools } from "../../security/CryptoTools";
import { PublicKey } from "../../security/RSA/model/PublicKey";
import { JWTSession } from "../../security/JWT/model/JWTSession";
import { SessionTokenModel } from "../../security/JWT/model/SessionTokenModel";
import { AccessTokenModel } from "../../security/JWT/model/AccessTokenModel";
import { JWTType } from "../../security/JWT/model/JWTType"
import { UserSchema } from '../../models/user/UserModel';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const User = mongoose.model('User', UserSchema);

export class AuthController extends BaseController {

    public publicKey(req: Request, res: Response) {
        let publicKey = new PublicKey(CryptoTools.RSA().publicKey())
        super.send(res, publicKey)
    }

    public tokenStatus(req: Request, res: Response) {

    }

    public accessToken(req: Request, res: Response) {

        let body = JSON.parse(JSON.stringify(req.body))
        let plainData = CryptoTools.RSA().decrypt(req.body.data, "json")
        let session = new JWTSession(plainData, JWTType.ACCESS)
        let encrypted = CryptoTools.JWT().signAccessToken(session)
        let accessToken = JSON.parse(JSON.stringify(new AccessTokenModel(encrypted)))

        console.log("\n\n\n\n ==================")
        console.log("\nBody: " + JSON.stringify(body))
        console.log("\nPlain: " + JSON.stringify(plainData))
        console.log("\nSession: " + JSON.stringify(plainData))
        console.log("\nToken: " + JSON.stringify(accessToken))
        console.log("==================\n\n\n\n ")

        super.send(res, accessToken)
    }

    public login(req: Request, res: Response) {

        const token = new JWTSession(req.params.access);

        let userData = CryptoTools.AES().decrypt(req.body.data, token.AESKey, token.AESSalt, token.AESIV)

        let userModel = User(JSON.parse(userData))

        if (userModel == null) {
            super.send(res, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
            return
        }

        User.findOne({ 'firebaseID': userModel.firebaseID }, (error, user) => {
            if (error) {
                super.send(res, new HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                return
            }
            if (user) {
                
                token.id = user._id

                token.firebaseID = user.firebaseID

                let session = new JWTSession(token, JWTType.SESSION)

                let sessionTokenEncrypted = CryptoTools.JWT().signSessionToken(session)
        
                let sessionToken = JSON.parse(JSON.stringify(new SessionTokenModel(sessionTokenEncrypted)))
        
                super.send(res, sessionToken)
                return
            }
            else {
                userModel.save((error, user) => {
                    if (error) {
                        super.send(res, new HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                        return
                    }

                    token.id = user._id

                    token.firebaseID = user.firebaseID

                    let session = new JWTSession(token, JWTType.SESSION)

                    let sessionTokenEncrypted = CryptoTools.JWT().signSessionToken(session)
            
                    let sessionToken = JSON.parse(JSON.stringify(new SessionTokenModel(sessionTokenEncrypted)))
            
                    super.send(res, sessionToken)
                });
            }
        });
    }

    public testAES() {
        const key = "aDoteTXz9c6POCI2"
        const salt = "apph5qEE"
        const iv = "Fki5DpYuYyV139iVBbkFHw=="
        const plain = "wow"
        const chiper = "bMnkjVuD0mKlxTVuhsGT/w=="
        console.log("\n\nPlain: " + plain)
        // let data = CryptoTools.AES().encrypt(plain, key, salt, iv)
        let safe = CryptoTools.AES().decrypt(chiper, key, salt, iv)
        console.log("\n==============")
        // console.log("AES enc: " + data)
        console.log("AES dec: " + safe)
        console.log("==============")
    }
}