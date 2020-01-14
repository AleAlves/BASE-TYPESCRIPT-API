"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResponse_1 = require("./BaseResponse");
class HTTPResponse {
    constructor(data, status, code, message) {
        this.data = JSON.parse(JSON.stringify(data));
        this.response = new BaseResponse_1.BaseResponse(status, code, message);
    }
}
exports.HTTPResponse = HTTPResponse;
//# sourceMappingURL=HTTPResponse.js.map