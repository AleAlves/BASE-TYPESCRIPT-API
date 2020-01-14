
import { Response } from "express";
import { HTTPResponse } from "../models/http/HTTPResponse";

export class BaseController {

    public send(res: Response, data: any) {
        res.send(new HTTPResponse(data))
    }

}