
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

        console.log("Body: " + JSON.stringify(body))
        console.log("Plain: " + JSON.stringify(plainData))
        console.log("Session: " + JSON.stringify(plainData))
        console.log("Token: " + JSON.stringify(accessToken))

        super.send(res, accessToken)
    }

    public login(req: Request, res: Response) {

        console.log("\n\n\n\n ==================")

        let userModel = User(req.body)

        const token = JSON.parse(JSON.stringify(req.params.access));

        console.log("token: "+ token)

        let session = new JWTSession(token, JWTType.SESSION)

        console.log("session: "+ JSON.stringify(session))

        let sessionTokenEncrypted = CryptoTools.JWT().signSessionToken(session)

        console.log("encrypted session: "+ JSON.stringify(sessionTokenEncrypted))

        let sessionToken = JSON.parse(JSON.stringify(new SessionTokenModel(sessionTokenEncrypted)))

        console.log("User"+ JSON.stringify(userModel))

        console.log("\n\n\n\n ==================")

        if(userModel == null){
            super.send(undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
            return
        }

        User.findOne({ 'firebaseID': userModel.firebaseID }, (error, user) => {
            if (error) {
                super.send(res, new HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                return
            }
            if (user) {
                super.send(res,sessionToken)
            }
            else {
                userModel.save((error, user) => {
                    if (error) {
                        super.send(res, new HTTPStatus.BUSINESS.DUPLICATED_REGISTER);
                        return
                    }
                    super.send(res, sessionToken)
                });
            }
        });
    }
}