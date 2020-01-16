
import { Response } from "express";
import { HTTPResponse } from "../models/http/HTTPResponse";

export class BaseController {

    public send(res: Response, data?: any, status?: String, code?: number, message? : String) {
        console.log(JSON.stringify(data))
        res.send(new HTTPResponse(data, status, code, message))
    }

}