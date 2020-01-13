
import { Response } from "express";

export interface BaseController {

    send(res: Response, data: any)

}