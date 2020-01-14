
import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { CryptoTools } from "../../security/CryptoTools";
import { PublicKey } from "../../security/RSA/model/PublicKey";
import { JWTSession } from "../../security/JWT/model/JWTSession";
import { JWTModel } from "../../security/JWT/model/JWTModel";

export class AuthController extends BaseController {   

    public getPublicKey(req: Request, res: Response) {
        let publicKey = new PublicKey(CryptoTools.RSA().publicKey())
        super.send(res, publicKey)
    }

    public decrypt(req: Request, res: Response) {
        let data = JSON.parse(JSON.stringify(req.body))
        super.send(res, CryptoTools.RSA().decrypt(data.teste, "utf8"))
    }

    public generateToken(req: Request, res: Response){
        let plainData = CryptoTools.RSA().decrypt(req.body)
        console.log(JSON.stringify(plainData))
        let clientData = new JWTModel(CryptoTools.JWT().encode(new JWTSession(plainData)))
        console.log(JSON.stringify(clientData))
        super.send(res, clientData)
    }
}