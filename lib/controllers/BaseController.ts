
import { Response } from "express";
import { HTTPResponse } from "../models/http/HTTPResponse";
import { CryptoTools } from "../security/CryptoTools";

export class BaseController {

    public send(res: Response, data?: any, status?: String, code?: number, message?: String, expiredToken?: String) {
        console.log(JSON.stringify(data))
        if (expiredToken) {
            res.send(new HTTPResponse(data, status, code, message, CryptoTools.JWT().renewSessionToken(expiredToken)))
            return
        }
        res.send(new HTTPResponse(data, status, code, message))
    }

}