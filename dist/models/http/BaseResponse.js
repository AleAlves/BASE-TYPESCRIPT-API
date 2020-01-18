"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponse {
    constructor(status, code) {
        this.code = 200;
        this.status = "SUCCESS";
        if (code) {
            this.code = code;
        }
        if (status) {
            this.status = status;
        }
    }
}
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=BaseResponse.js.map