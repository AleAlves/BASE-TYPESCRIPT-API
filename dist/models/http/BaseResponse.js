"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponse {
    constructor(status, code, message) {
        this.code = 200;
        this.status = "SUCESS";
        this.message = "";
        if (code) {
            this.code = code;
        }
        if (status) {
            this.status = status;
        }
        if (message) {
            this.message = message;
        }
    }
}
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=BaseResponse.js.map