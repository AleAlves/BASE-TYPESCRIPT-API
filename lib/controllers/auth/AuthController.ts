
import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { CryptoTools } from "../../security/CryptoTools";
import { HTTPResponse } from "../../models/http/HTTPResponse";
import { PublicKey } from "../../security/RSA/model/PublicKey";

export class AuthController extends BaseController{

    public getPublicKey(req: Request, res: Response) {
        let publicKey = new PublicKey(CryptoTools.RSA().publicKey())
        super.send(res, new HTTPResponse(publicKey))
    }

}