import { BaseResponse } from "./BaseResponse";
import { Status } from "./Status";

export class HTTPResponse {
    data: String
    token: String
    response: BaseResponse

    constructor(data?: any, HTTPStatus?: Status, token?: String) {
        if (data) {
            this.data = JSON.parse(JSON.stringify(data));
        }
        if (token) {
            this.token = token
        }
        if (HTTPStatus) {
            this.response = new BaseResponse(HTTPStatus.status(), HTTPStatus.code())
        }
        else{
            this.response = new BaseResponse()
        }
    }
}