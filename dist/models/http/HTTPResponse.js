"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResponse_1 = require("./BaseResponse");
class HTTPResponse {
    constructor(data, HTTPStatus, message) {
        if (data) {
            this.data = JSON.parse(JSON.stringify(data));
        }
        if (message) {
            this.message = message;
        }
        if (HTTPStatus) {
            this.response = new BaseResponse_1.BaseResponse(HTTPStatus.status(), HTTPStatus.code());
        }
        else {
            this.response = new BaseResponse_1.BaseResponse();
        }
    }
}
exports.HTTPResponse = HTTPResponse;
//# sourceMappingURL=HTTPResponse.js.map