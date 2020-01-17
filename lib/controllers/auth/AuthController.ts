
import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { CryptoTools } from "../../security/CryptoTools";
import { PublicKey } from "../../security/RSA/model/PublicKey";
import { JWTSession } from "../../security/JWT/model/JWTSession";
import { JWTModel } from "../../security/JWT/model/JWTModel";
import { JWTType } from "../../security/JWT/model/JWTType"

export class AuthController extends BaseController {

    public getPublicKey(req: Request, res: Response) {
        let publicKey = new PublicKey(CryptoTools.RSA().publicKey())
        super.send(res, publicKey)
    }

    public decrypt(req: Request, res: Response) {
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(JSON.stringify(data))
        super.send(res, CryptoTools.RSA().decrypt(data.teste, "utf8"))
    }

    public generateAccessToken(req: Request, res: Response) {

        let body = JSON.parse(JSON.stringify(req.body))
        let plainData = CryptoTools.RSA().decrypt(req.body.data, "json")
        let session = new JWTSession(plainData, JWTType.ACCESS)
        let encrypted = CryptoTools.JWT().signAccessToken(session)
        let accessToken = JSON.parse(JSON.stringify(new JWTModel(undefined, encrypted)))

        console.log("Body: " + JSON.stringify(body))
        console.log("Plain: " + JSON.stringify(plainData))
        console.log("Session: " + JSON.stringify(plainData))
        console.log("Token: " + JSON.stringify(accessToken))

        super.send(res, accessToken)
    }
}