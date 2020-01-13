
import { Response } from "express";

export class BaseController {

    public send(res: Response, data: any) {
        res.send(data)
    }

}