import { BaseResponse } from "./BaseResponse";

export class HTTPResponse {
    data: String
    response: BaseResponse

    constructor(data: any, status?: String, code?: number, message? : String){ 
        this.data = JSON.parse(JSON.stringify(data)); 
        this.response = new BaseResponse(status, code, message)
    }
}