
import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { CryptoTools } from "../../security/CryptoTools";
import { HTTPResponse } from "../../models/http/HTTPResponse";
import { PublicKey } from "../../security/RSA/model/PublicKey";

export class AuthController {

    public getPublicKey(req: Request, res: Response) {
        let publicKey = new PublicKey(CryptoTools.RSA().publicKey())
        res.send(new HTTPResponse(publicKey))
    }

}