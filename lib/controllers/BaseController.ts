
import { Response } from "express";
import { HTTPResponse } from "../models/http/HTTPResponse";
import { Status } from "../models/http/Status"
import { JWTSession } from "../security/JWT/model/JWTSession";

export class BaseController {

    public session(req){
        return new JWTSession(JSON.parse(JSON.stringify(req.params.session)))
    }

    public send(res: Response, data?: any, status?: Status, expiredToken?: String) {
        console.log("BaseController send() : "+JSON.stringify(data))
        res.send(new HTTPResponse(data, status))
        return
    }

}