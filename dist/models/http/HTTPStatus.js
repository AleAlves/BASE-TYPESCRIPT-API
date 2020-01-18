"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
class HTTPStatus {
}
exports.HTTPStatus = HTTPStatus;
HTTPStatus.BUSINESS = (_a = class {
    },
    _a.DUPLICATED_REGISTER = class {
        code() {
            return 422;
        }
        status() {
            return "Duplicated Register";
        }
    },
    _a);
HTTPStatus.SUCESS = (_b = class {
    },
    _b.OK = class {
        code() {
            return 200;
        }
        status() {
            return "OK";
        }
    },
    _b.CREATED = class {
        code() {
            return 201;
        }
        status() {
            return "Created";
        }
    },
    _b.ACCEPTED = class {
        code() {
            return 202;
        }
        status() {
            return "Accepted";
        }
    },
    _b);
HTTPStatus.CLIENT_ERROR = (_c = class {
    },
    _c.BAD_REQUEST = class {
        code() {
            return 400;
        }
        status() {
            return "Bad Request";
        }
    },
    _c.UNAUTHORIZED = class {
        code() {
            return 401;
        }
        status() {
            return "Unauthorized";
        }
    },
    _c.FORBIDDEN = class {
        code() {
            return 403;
        }
        status() {
            return "Forbidden";
        }
    },
    _c);
//         "NOT_FOUND": {
//             "code": 404,
//             "status": "Not Found"
//         }
//     },
//     "SERVER_ERROR": {
//         "INTERNAL_SERVER_ERROR": {
//             "code": 500,
//             "status": "Internal Server Error"
//         },
//         "NOT_IMPLEMENTED": {
//             "code": 501,
//             "status": "Not Implemented"
//         },
//         "BAD_GATEWAY": {
//             "code": 502,
//             "status": "Bad Gateway"
//         },
//         "SERVICE_UNAVAILABLE": {
//             "code": 503,
//             "status": "Service Unavailable"
//         },
//         "GATEWAY_TIMEOUT": {
//             "code": 504,
//             "status": "Gateway Timeout"
//         },
//         "INSUFFICIENT_STORAGE": {
//             "code": 507,
//             "status": "Insufficient Storage"
//         }
//     }
// }
//# sourceMappingURL=HTTPStatus.js.map