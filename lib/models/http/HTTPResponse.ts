import { BaseResponse } from "./BaseResponse";

export class HTTPResponse {
    data: String
    token: String
    response: BaseResponse

    constructor(data?: any, status?: String, code?: number, message?: String, token?: String) {
        if (data) {
            this.data = JSON.parse(JSON.stringify(data));
        }
        if (data) {
            this.token = token
        }
        this.response = new BaseResponse(status, code, message)
    }
}