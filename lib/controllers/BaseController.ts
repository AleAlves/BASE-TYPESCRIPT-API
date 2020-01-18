
import { Response } from "express";
import { HTTPResponse } from "../models/http/HTTPResponse";
import { CryptoTools } from "../security/CryptoTools";
import { Status } from "../models/http/Status"

export class BaseController {

    public send(res: Response, data?: any, status?: Status, expiredToken?: String) {
        console.log("BaseController send() : "+JSON.stringify(data))
        res.send(new HTTPResponse(data, status))
    }

}